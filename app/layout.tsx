import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LoadingProvider } from "@/components/LoadingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "The Almighty's Matriculation School | Nurturing Future Minds",
  description:
    "The Almighty's Matriculation School - A premier educational institution fostering academic excellence, moral integrity, modern STEM literacy, and holistic student growth.",
  keywords: [
    "The Almighty's Matriculation School",
    "The Almighty's School",
    "SASC Portal",
    "Matriculation School",
    "Smart School",
    "Higher Secondary",
    "Education",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  authors: [{ name: "The Almighty's Matriculation School Administration" }],
  openGraph: {
    title: "The Almighty's Matriculation School",
    description:
      "Nurturing young minds to soar with moral virtue, scholastic brilliance, and creative curiosity.",
    url: "https://sasc-f.onrender.com",
    siteName: "The Almighty's Matriculation School",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "The Almighty's Matriculation School Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body className="antialiased min-h-screen flex flex-col relative transition-colors duration-300">
        {/* Global Total Page Background Image - 95% Visibility */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <Image
            src="/1.jpg"
            alt="School Campus Background"
            fill
            priority
            className="object-cover"
            style={{ filter: "brightness(0.95) saturate(1.0)" }}
          />
          {/* Subtle translucent tint to maintain high text contrast in dark & light themes */}
          <div className="absolute inset-0 global-overlay-tint transition-all duration-300" />
        </div>

        <ThemeProvider>
          <LoadingProvider>
            {/* Fullscreen Intro Loading Animation */}
            <LoadingScreen />

            {/* Sticky Floating Glassmorphic Top Navbar with School Logo and SASC Login Link */}
            <Navbar />

            {/* Main Page Content */}
            <main className="flex-1 relative z-10">{children}</main>

            {/* Liquid Glass Global Footer with School Logo */}
            <Footer />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
