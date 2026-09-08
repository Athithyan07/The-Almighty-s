"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLoading } from "./LoadingContext";
import {
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Layers,
  Award,
  Building2,
  Users,
  Image as ImageIcon,
  Info,
  ArrowRight,
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
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-5 pb-1 pointer-events-none"
      >
        <nav
          className="pointer-events-auto w-full max-w-7xl transition-all duration-500 rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between liquid-glass-dock shadow-2xl"
        >
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5 select-none flex-shrink-0">
            <div
              className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl p-1 bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md transition-transform group-hover:scale-105"
            >
              <Image src="/logo.png" alt="The Almighty's Logo" width={38} height={38} priority className="object-contain w-full h-full" />
            </div>
            <div>
              <span
                className="font-serif font-bold text-neutral-900 dark:text-white italic block leading-tight text-[clamp(0.82rem,3.5vw,0.95rem)]"
              >
                The Almighty&apos;s
              </span>
              <p
                className="text-[clamp(0.48rem,1.8vw,0.55rem)] font-bold tracking-[0.18em] uppercase text-[#C9A84C] mt-0.5 leading-none"
              >
                Matriculation School
              </p>
            </div>
          </Link>

          {/* Desktop Links with Clear Glass Rings */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-white/40 dark:border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.16em] uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-white/80 dark:bg-white/15 text-[#C9A84C] border border-white/90 dark:border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md font-extrabold"
                      : "text-neutral-800 dark:text-stone-200 hover:text-[#C9A84C] hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/15 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions with Clear Glass Rings */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 text-[#C9A84C] shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md"
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

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 sm:p-2 rounded-2xl transition-all hover:scale-105 active:scale-95 bg-white/70 dark:bg-white/10 border border-white/90 dark:border-white/25 text-neutral-900 dark:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-[5px]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed inset-x-3 sm:inset-x-4 top-[4.2rem] sm:top-[4.8rem] max-w-lg mx-auto z-50 rounded-3xl lg:hidden overflow-hidden liquid-glass-card shadow-2xl"
            >
              {/* Drawer Header */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[var(--liquid-glass-border)]"
              >
                <div
                  className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30"
                >
                  <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
                </div>
                <div className="flex-1">
                  <div
                    className="font-serif font-bold text-sm text-neutral-900 dark:text-white italic"
                  >
                    The Almighty&apos;s
                  </div>
                  <div
                    className="text-[0.52rem] font-bold tracking-[0.2em] uppercase text-[#C9A84C]"
                  >
                    Matriculation School
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close"
                  className="p-1.5 rounded-lg transition-colors border border-[var(--liquid-glass-border)] text-neutral-800 dark:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="px-3 py-2.5 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 350 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 sm:py-3 rounded-2xl transition-all ${
                          isActive
                            ? "bg-amber-500/15 dark:bg-amber-400/15 border-l-4 border-[#C9A84C] text-[#C9A84C] font-bold"
                            : "text-neutral-800 dark:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 font-semibold"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A84C]" : "opacity-70"}`} />
                        <span
                          className="text-xs font-bold tracking-[0.12em] uppercase"
                        >
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                className="px-4 pt-2.5 pb-4 border-t border-[var(--liquid-glass-border)]"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-neutral-600 dark:text-stone-400">
                    {theme === "dark" ? "Dark Theme Active" : "Light Theme Active"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.62rem] font-bold border border-amber-500/30 dark:border-amber-400/30 text-[#C9A84C] bg-amber-500/10 dark:bg-amber-400/10 transition-all hover:scale-105 active:scale-95"
                  >
                    {theme === "dark" ? <><Sun className="w-3.5 h-3.5" /> Switch to Light</> : <><Moon className="w-3.5 h-3.5" /> Switch to Dark</>}
                  </button>
                </div>
                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="liquid-glass-button w-full justify-center text-xs py-2.5"
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
