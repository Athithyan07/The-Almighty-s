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
    const { name, contact, phone, email, grade, message } = body;

    const rawContact = contact || `${phone || ""} | ${email || ""}`.trim();

    if (!name || !rawContact) {
      return NextResponse.json(
        { success: false, error: "Name and Contact details are required." },
        { status: 400 }
      );
    }

    const parsed = parseContact(rawContact);
    const parentEmail = (email && email.includes("@")) ? email.trim() : parsed.email;
    const parentPhoneDigits = phone ? phone.replace(/\D/g, "") : parsed.phoneDigits;
    const isPhone = parentPhoneDigits.length >= 10;
    const isEmail = !!parentEmail;
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

    const logoUrl = "https://sasc-f.onrender.com/logo.png";

    /* ── 1. SCHOOL EMAIL HTML WITH MERIENDA FONT & LOGO ── */
    const schoolEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
          .school-heading {
            font-family: 'Merienda', 'Playfair Display', Georgia, serif !important;
            color: #00A3E0 !important;
            margin: 10px 0 0 0 !important;
            font-size: 24px !important;
            font-weight: 700 !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #050508; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090d; color: #F0ECE4; border: 1px solid #00A3E0; border-radius: 20px; padding: 32px; box-shadow: 0 10px 30px rgba(0,163,224,0.15);">
          <!-- Header with Logo and Merienda Font -->
          <div style="text-align: center; border-bottom: 1px solid rgba(0,163,224,0.25); padding-bottom: 24px; margin-bottom: 24px;">
            <img src="${logoUrl}" alt="The Almighty's School Logo" style="width: 76px; height: 76px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,163,224,0.4));" />
            <h2 className="school-heading" style="font-family: 'Merienda', 'Playfair Display', Georgia, serif; color: #00A3E0; margin: 10px 0 0 0; font-size: 24px; font-weight: 700;">The Almighty's Matriculation School</h2>
            <p style="color: #B8B0A4; font-size: 12px; margin-top: 6px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">New Admission Inquiry Received</p>
          </div>

          <!-- Inquiry Details Card -->
          <div style="background: rgba(255,255,255,0.04); border-radius: 14px; padding: 22px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #888899; width: 130px; font-weight: 600;">Parent Name:</td>
                <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888899; font-weight: 600;">Contact Info:</td>
                <td style="padding: 10px 0; color: #00A3E0; font-weight: 700; font-size: 15px;">${contact}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888899; font-weight: 600;">Grade Wing:</td>
                <td style="padding: 10px 0; color: #FFFFFF; font-weight: 600;">${grade || "Not Specified"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888899; font-weight: 600;">Submitted At:</td>
                <td style="padding: 10px 0; color: #B8B0A4;">${timestamp}</td>
              </tr>
            </table>
          </div>

          ${
            message
              ? `<div style="background: rgba(0,163,224,0.08); border-left: 4px solid #00A3E0; padding: 16px; border-radius: 10px; margin-bottom: 24px;">
                  <p style="margin: 0 0 6px 0; color: #00A3E0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Message / Note from Parent:</p>
                  <p style="margin: 0; color: #F0ECE4; font-style: italic; font-size: 14px; line-height: 1.5;">"${message}"</p>
                 </div>`
              : ""
          }

          <div style="text-align: center; font-size: 12px; color: #888899; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px;">
            <p style="margin: 0;">This inquiry was submitted from the official school web portal.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    /* ── 2. USER CONFIRMATION EMAIL HTML WITH MERIENDA FONT & LOGO ── */
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@700;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
          .school-heading {
            font-family: 'Merienda', 'Playfair Display', Georgia, serif !important;
            color: #00A3E0 !important;
            margin: 10px 0 0 0 !important;
            font-size: 24px !important;
            font-weight: 700 !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #050508; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #09090d; color: #F0ECE4; border: 1px solid #00A3E0; border-radius: 20px; padding: 32px; box-shadow: 0 10px 30px rgba(0,163,224,0.15);">
          <!-- Header with Logo and Merienda Font -->
          <div style="text-align: center; border-bottom: 1px solid rgba(0,163,224,0.25); padding-bottom: 24px; margin-bottom: 24px;">
            <img src="${logoUrl}" alt="The Almighty's School Logo" style="width: 76px; height: 76px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,163,224,0.4));" />
            <h2 className="school-heading" style="font-family: 'Merienda', 'Playfair Display', Georgia, serif; color: #00A3E0; margin: 10px 0 0 0; font-size: 24px; font-weight: 700;">The Almighty's Matriculation School</h2>
            <p style="color: #B8B0A4; font-size: 12px; margin-top: 6px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Admission Inquiry Confirmation</p>
          </div>

          <p style="font-size: 15px; color: #FFFFFF; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
          <p style="font-size: 14px; color: #B8B0A4; line-height: 1.6;">
            Thank you for contacting <strong>The Almighty's Matriculation School</strong> regarding admission for <strong>${grade || "your ward"}</strong>.
          </p>
          <p style="font-size: 14px; color: #B8B0A4; line-height: 1.6;">
            Our Admissions Desk has received your inquiry. An admissions counsellor will contact you shortly via <strong>${contact}</strong> to assist with the admission procedure, fee details, and campus visit.
          </p>

          <div style="background: rgba(0,163,224,0.08); border-radius: 14px; padding: 20px; margin: 24px 0; border: 1px solid rgba(0,163,224,0.3);">
            <h4 style="margin: 0 0 12px 0; color: #00A3E0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Direct Admissions Helpline:</h4>
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #FFFFFF;">📞 Phone: <strong>+91 80980 62321</strong></p>
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #FFFFFF;">✉️ Email: <strong>godalmightyschool03@gmail.com</strong></p>
            <p style="margin: 0; font-size: 14px; color: #FFFFFF;">📍 Address: The Almighty's School Campus, Main Road, Tamil Nadu</p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #888899; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px;">
            <p style="margin: 0;">With warm regards,<br/><strong style="color: #00A3E0; font-family: 'Merienda', Georgia, serif; font-size: 14px;">Admissions Desk — The Almighty's Matriculation School</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch School Notification Email
    const schoolEmailPromise = sendEmailNotification({
      resendApiKey,
      transporter,
      gmailUser,
      to: "godalmightyschool03@gmail.com",
      replyTo: parentEmail || undefined,
      subject: `🔔 Admission Inquiry: ${name} (${grade || "General"})`,
      html: schoolEmailHtml,
    });

    // Dispatch Parent Confirmation Email (if parent provided an email)
    let parentEmailPromise: Promise<any> = Promise.resolve();
    if (parentEmail) {
      parentEmailPromise = sendEmailNotification({
        resendApiKey,
        transporter,
        gmailUser,
        to: parentEmail,
        subject: `Confirmation: Admission Inquiry Received - The Almighty's School`,
        html: userConfirmationHtml,
      });
    }

    // Dispatch SMS Notification (if parent provided phone digits)
    let smsPromise: Promise<any> = Promise.resolve();
    if (isPhone && parentPhoneDigits) {
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
            numbers: parentPhoneDigits,
          }),
        }).catch((e) => console.error("Fast2SMS error:", e));
      } else if (twilioSid && twilioToken && twilioFrom) {
        const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
        const formattedPhone = parentPhoneDigits.startsWith("91") ? `+${parentPhoneDigits}` : `+91${parentPhoneDigits}`;
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
