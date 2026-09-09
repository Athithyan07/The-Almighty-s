"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLoading } from "./LoadingContext";
import {
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X,
  Layers,
  Award,
  Building2,
  Users,
  Image as ImageIcon,
  Info,
} from "lucide-react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoaded } = useLoading();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Set initial state in case page is loaded mid-scroll
    setIsScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", icon: Layers },
    { name: "Achievements", href: "/achievements", icon: Award },
    { name: "Facilities", href: "/facilities", icon: Building2 },
    { name: "Teachers", href: "/teachers", icon: Users },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <>
      {/* ── Navbar ── always fixed, always on top, always pointer-events-auto */}
      <header
        className="fixed top-0 left-0 right-0 z-[200] flex justify-center px-2.5 sm:px-6 pt-2 sm:pt-4 pb-1"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(-25px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          willChange: "opacity, transform",
        }}
      >
        <nav
          className={`w-full max-w-7xl transition-all duration-300 rounded-full px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between liquid-glass-dock shadow-2xl ${
            isScrolled
              ? "bg-white/95 dark:bg-[#0e0e14]/95 backdrop-blur-xl shadow-black/30 border border-white/50 dark:border-white/20"
              : "backdrop-blur-md"
          }`}
        >
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5 select-none flex-shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl p-1 bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="The Almighty's Logo" width={38} height={38} priority className="object-contain w-full h-full" />
            </div>
            <div>
              <span className="font-serif font-bold text-neutral-900 dark:text-white italic block leading-tight text-[clamp(0.82rem,3.5vw,0.95rem)]">
                The Almighty&apos;s
              </span>
              <p className="text-[clamp(0.48rem,1.8vw,0.55rem)] font-bold tracking-[0.18em] uppercase text-[#00A3E0] mt-0.5 leading-none">
                Matriculation School
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-white/40 dark:border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.16em] uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-white/80 dark:bg-white/15 text-[#00A3E0] border border-white/90 dark:border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md font-extrabold"
                      : "text-neutral-800 dark:text-stone-200 hover:text-[#00A3E0] hover:bg-black/5 dark:hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-1.5 sm:p-2 rounded-full transition-colors bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 text-[#00A3E0] shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md active:scale-95"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Desktop SASC Button */}
            <a
              href="https://sasc-f.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-sasc-login-btn"
              className="liquid-glass-button hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.62rem] font-bold border border-white/90 dark:border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_4px_14px_rgba(0,0,0,0.08)] text-neutral-900 dark:text-white"
            >
              <span>SASC Portal</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 sm:p-2 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 text-neutral-900 dark:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[205] lg:hidden bg-black/55"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-2.5 sm:inset-x-4 top-[3.6rem] sm:top-[4.4rem] max-w-lg mx-auto z-[210] rounded-3xl lg:hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto shadow-2xl border border-sky-500/30 dark:border-sky-300/30"
              style={{
                background: "rgba(12, 12, 18, 0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-sky-400/10 border border-sky-400/30">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
                </div>
                <div className="flex-1">
                  <div className="font-serif font-bold text-sm text-white italic">The Almighty&apos;s</div>
                  <div className="text-[0.52rem] font-bold tracking-[0.2em] uppercase text-[#00A3E0]">Matriculation School</div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close"
                  className="p-1.5 rounded-lg border border-white/15 text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links — no motion stagger on mobile (perf) */}
              <div className="px-3 py-2.5 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-colors ${
                        isActive
                          ? "bg-sky-400/15 border-l-4 border-[#00A3E0] text-[#00A3E0] font-bold"
                          : "text-stone-200 hover:bg-white/5 font-semibold"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#00A3E0]" : "opacity-60"}`} />
                      <span className="text-xs font-bold tracking-[0.12em] uppercase">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="px-4 pt-2.5 pb-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-stone-400">
                    {theme === "dark" ? "Dark Theme Active" : "Light Theme Active"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.62rem] font-bold border border-sky-400/30 text-[#00A3E0] bg-sky-400/10 active:scale-95"
                  >
                    {theme === "dark" ? <><Sun className="w-3.5 h-3.5" /> Light</> : <><Moon className="w-3.5 h-3.5" /> Dark</>}
                  </button>
                </div>
                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-bold border border-sky-400/40 bg-sky-400/10 text-[#00A3E0]"
                >
                  <span>Login to SASC Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
