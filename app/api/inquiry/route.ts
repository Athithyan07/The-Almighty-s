import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper to detect if a contact string is an email or phone number
function parseContact(contact: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(contact.trim());
  const phoneDigits = contact.replace(/\D/g, "");
  const isPhone = phoneDigits.length >= 10;
  return { isEmail, isPhone, phoneDigits, email: isEmail ? contact.trim() : null };
}

// Helper to send email with Resend HTTP API + automatic Gmail SMTP fallback
async function sendEmailNotification({
  resendApiKey,
  transporter,
  gmailUser,
  to,
  replyTo,
  subject,
  html,
}: {
  resendApiKey?: string;
  transporter?: any;
  gmailUser: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  let sent = false;

  // 1. Try Resend HTTP API
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [to],
          subject,
          html,
          reply_to: replyTo,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[Resend SUCCESS] Email sent to ${to}:`, data.id);
        sent = true;
      } else {
        console.error(`[Resend FAILED] Status ${res.status}:`, data);
      }
    } catch (err) {
      console.error("[Resend Error]:", err);
    }
  }

  // 2. Fallback to Gmail SMTP if Resend was not configured or failed
  if (!sent && transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"The Almighty's School" <${gmailUser}>`,
        to,
        replyTo,
        subject,
        html,
      });
      console.log(`[Gmail SMTP SUCCESS] Email sent to ${to}:`, info.messageId);
      sent = true;
    } catch (err) {
      console.error("[Gmail SMTP Error]:", err);
    }
  }

  return sent;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, grade, message } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { success: false, error: "Name and Contact details are required." },
        { status: 400 }
      );
    }

    const { isEmail, isPhone, phoneDigits, email } = parseContact(contact);
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Environment variables
    const gmailUser = process.env.GMAIL_USER || "godalmightyschool03@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Create Nodemailer Transporter (Fallback SMTP)
    let transporter: any = null;
    if (gmailPass) {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });
    }

    /* ── 1. SCHOOL EMAIL HTML ── */
    const schoolEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090d; color: #F0ECE4; border: 1px solid #00A3E0; border-radius: 16px; padding: 30px;">
        <div style="text-align: center; border-bottom: 1px solid rgba(0,163,224,0.3); padding-bottom: 20px; margin-bottom: 20px;">
          <h2 style="color: #00A3E0; margin: 0; font-size: 24px;">The Almighty's Matriculation School</h2>
          <p style="color: #B8B0A4; font-size: 13px; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">New Admission Inquiry Received</p>
        </div>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #888899; width: 130px; font-weight: bold;">Parent Name:</td>
              <td style="padding: 8px 0; color: #FFFFFF; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888899; font-weight: bold;">Contact Info:</td>
              <td style="padding: 8px 0; color: #00A3E0; font-weight: bold;">${contact}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888899; font-weight: bold;">Grade Wing:</td>
              <td style="padding: 8px 0; color: #FFFFFF;">${grade || "Not Specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888899; font-weight: bold;">Submitted At:</td>
              <td style="padding: 8px 0; color: #B8B0A4;">${timestamp}</td>
            </tr>
          </table>
        </div>
        ${
          message
            ? `<div style="background: rgba(0,163,224,0.08); border-left: 3px solid #00A3E0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 5px 0; color: #00A3E0; font-size: 12px; font-weight: bold; text-transform: uppercase;">Message / Note:</p>
                <p style="margin: 0; color: #F0ECE4; font-style: italic; font-size: 14px;">"${message}"</p>
               </div>`
            : ""
        }
        <div style="text-align: center; font-size: 12px; color: #888899; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
          <p style="margin: 0;">This inquiry was submitted from the official school website portal.</p>
        </div>
      </div>
    `;

    /* ── 2. USER CONFIRMATION EMAIL HTML ── */
    const userConfirmationHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090d; color: #F0ECE4; border: 1px solid #00A3E0; border-radius: 16px; padding: 30px;">
        <div style="text-align: center; border-bottom: 1px solid rgba(0,163,224,0.3); padding-bottom: 20px; margin-bottom: 20px;">
          <h2 style="color: #00A3E0; margin: 0; font-size: 24px;">The Almighty's Matriculation School</h2>
          <p style="color: #B8B0A4; font-size: 13px; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">Admission Inquiry Confirmation</p>
        </div>
        <p style="font-size: 15px; color: #FFFFFF; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #B8B0A4; line-height: 1.6;">
          Thank you for contacting <strong>The Almighty's Matriculation School</strong> regarding admission for <strong>${grade || "your ward"}</strong>.
        </p>
        <p style="font-size: 14px; color: #B8B0A4; line-height: 1.6;">
          Our Admissions Desk has received your inquiry details. An admissions counsellor will contact you shortly via <strong>${contact}</strong> to assist with the admission procedure, fee details, and campus tour.
        </p>
        <div style="background: rgba(0,163,224,0.1); border-radius: 12px; padding: 18px; margin: 25px 0; border: 1px solid rgba(0,163,224,0.3);">
          <h4 style="margin: 0 0 10px 0; color: #00A3E0; font-size: 14px;">Direct Admissions Helpline:</h4>
          <p style="margin: 0; font-size: 14px; color: #FFFFFF;">📞 Phone: <strong>+91 80980 62321</strong></p>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #FFFFFF;">✉️ Email: <strong>godalmightyschool03@gmail.com</strong></p>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #FFFFFF;">📍 Address: The Almighty's School Campus, Main Road, Tamil Nadu</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #888899; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
          <p style="margin: 0;">With regards,<br/><strong style="color: #00A3E0;">Admissions Desk — The Almighty's Matriculation School</strong></p>
        </div>
      </div>
    `;

    // Dispatch School Notification Email
    const schoolEmailPromise = sendEmailNotification({
      resendApiKey,
      transporter,
      gmailUser,
      to: "godalmightyschool03@gmail.com",
      replyTo: isEmail ? email! : undefined,
      subject: `🔔 Admission Inquiry: ${name} (${grade || "General"})`,
      html: schoolEmailHtml,
    });

    // Dispatch Parent Confirmation Email (if parent provided an email)
    let parentEmailPromise: Promise<any> = Promise.resolve();
    if (isEmail && email) {
      parentEmailPromise = sendEmailNotification({
        resendApiKey,
        transporter,
        gmailUser,
        to: email,
        subject: `Confirmation: Admission Inquiry Received - The Almighty's School`,
        html: userConfirmationHtml,
      });
    }

    // Dispatch SMS Notification (if parent provided phone digits)
    let smsPromise: Promise<any> = Promise.resolve();
    if (isPhone && phoneDigits) {
      const fast2smsKey = process.env.FAST2SMS_API_KEY;
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
      const smsText = `Dear ${name}, thank you for inquiring about admission at The Almighty's Matriculation School (${grade}). Our team will call you shortly. Helpline: +91 8098062321`;

      if (fast2smsKey) {
        smsPromise = fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: fast2smsKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: "v3",
            sender_id: "TXTIND",
            message: smsText,
            language: "english",
            flash: 0,
            numbers: phoneDigits,
          }),
        }).catch((e) => console.error("Fast2SMS error:", e));
      } else if (twilioSid && twilioToken && twilioFrom) {
        const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
        const formattedPhone = phoneDigits.startsWith("91") ? `+${phoneDigits}` : `+91${phoneDigits}`;
        smsPromise = fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: formattedPhone,
            From: twilioFrom,
            Body: smsText,
          }),
        }).catch((e) => console.error("Twilio error:", e));
      }
    }

    // Execute dispatches
    Promise.allSettled([schoolEmailPromise, parentEmailPromise, smsPromise]).then((results) => {
      console.log("Inquiry notifications processing complete.");
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received. Notifications processing.",
    });
  } catch (error: any) {
    console.error("Inquiry Submission Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process inquiry.",
      },
      { status: 500 }
    );
  }
}
