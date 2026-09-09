import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LoadingProvider } from "@/components/LoadingContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://sasc-f.onrender.com"),
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
      <head>
        {/*
          Inline blocking script — runs before ANY CSS or React renders.
          Ensures dark theme is set immediately, preventing white flash.
          Falls back to dark if no preference is saved.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var t = localStorage.getItem('sasc-theme');
    var theme = (t === 'light') ? 'light' : 'dark';
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme','dark');
  }
})();
            `,
          }}
        />
        {/* Google Fonts preconnect for smooth font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical fonts */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Merienda:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700;1,900&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative transition-colors duration-300">
        {/* Global Total Page Background Image - 95% Visibility */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <Image
            src="/1.jpg"
            alt="School Campus Background"
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-100"
            style={{ filter: "brightness(1.0) saturate(1.0)" }}
          />
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

