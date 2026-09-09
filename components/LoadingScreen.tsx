"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Award } from "lucide-react";
import { useLoading } from "./LoadingContext";

export function LoadingScreen() {
  const { isLoaded, isFirstVisit, enterSite } = useLoading();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoaded || !isFirstVisit) return;

    const duration = 1500;
    const interval = 16;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isLoaded, isFirstVisit]);

  const handleEnter = () => {
    enterSite();
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#09090d" }}
        >
          {/* Campus Photo Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <Image
              src="/1.jpg"
              alt="The Almighty's School Campus"
              fill
              priority
              fetchPriority="high"
              className="object-cover opacity-100"
              style={{ filter: "brightness(1.0)" }}
            />
          </div>

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

          {!isFirstVisit ? (
            /* ══ QUICK GLASS LOADER FOR RELOADS / ROUTE TRANSITIONS ══ */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center gap-5 p-8 rounded-3xl liquid-glass-card shadow-[0_0_50px_rgba(0, 163, 224,0.25)] border border-sky-400/30 backdrop-blur-2xl"
            >
              <div className="relative w-16 h-16 rounded-2xl p-2 flex items-center justify-center bg-sky-400/15 border border-sky-400/40 shadow-[0_0_25px_rgba(0, 163, 224,0.3)]">
                <Image
                  src="/logo.png"
                  alt="The Almighty's Logo"
                  width={48}
                  height={48}
                  priority
                  className="object-contain"
                />
              </div>

              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-sky-400/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00A3E0] border-r-[#00A3E0] animate-spin" />
                <Sparkles className="w-4 h-4 text-[#00A3E0] animate-pulse" />
              </div>

              <span className="luxury-overline text-xs font-bold tracking-[0.25em] text-[#00A3E0]">
                Entering Campus...
              </span>
            </motion.div>
          ) : (
            /* ══ FIRST-VISIT WELCOME SPLASH ══ */
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center px-6 py-10 sm:px-12 sm:py-12 max-w-xl mx-4 rounded-3xl sm:rounded-[2.5rem] liquid-glass-card shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(0, 163, 224,0.25)] border border-white/30 dark:border-sky-400/35 backdrop-blur-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(25, 25, 38, 0.65) 0%, rgba(12, 12, 20, 0.85) 100%)",
              }}
            >
              {/* Specular Light Bar */}
              <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent opacity-80" />

              {/* Certified Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[0.62rem] sm:text-xs font-bold tracking-widest uppercase mb-5 border border-sky-400/40 bg-sky-400/10 text-[#00A3E0] shadow-[0_0_20px_rgba(0, 163, 224,0.2)] backdrop-blur-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>State Board Certified • Est. 1999</span>
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 230, damping: 18, delay: 0.1 }}
                className="relative mb-5 group"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-2.5 flex items-center justify-center border border-sky-400/40 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[0_0_35px_rgba(0, 163, 224,0.35)] backdrop-blur-md">
                  <Image
                    src="/logo.png"
                    alt="The Almighty's Matriculation School"
                    fill
                    priority
                    className="object-contain p-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#00A3E0] text-black shadow-md">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Heading */}
              <span className="luxury-overline text-[0.68rem] sm:text-xs font-bold tracking-[0.25em] text-[#00A3E0] mb-1.5">
                Welcome To
              </span>
              <h1
                className="editorial-heading text-white mb-2 leading-tight"
                style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
              >
                The Almighty&apos;s
                <br />
                <em className="text-[#00A3E0] italic">Matriculation School</em>
              </h1>

              <div className="gold-line w-28 sm:w-36 mx-auto my-3" />

              <p className="luxury-text-readable font-editorial italic text-stone-200 text-xs sm:text-sm max-w-md leading-relaxed">
                Nurturing moral virtue, STEM brilliance, and academic distinction across Kindergarten through Grade 12.
              </p>

              {/* Progress Bar / Enter Button */}
              <div className="mt-7 w-full flex flex-col items-center">
                {!isReady ? (
                  <div className="w-full max-w-[280px]">
                    <div className="flex items-center justify-between text-xs mb-2 font-mono font-bold text-[#00A3E0]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Igniting Campus...</span>
                      </span>
                      <span>{Math.floor(progress)}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden p-0.5 border border-sky-400/30 bg-black/40 backdrop-blur-md">
                      <motion.div
                        className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-sky-600 via-[#00A3E0] to-sky-300 shadow-[0_0_15px_rgba(0, 163, 224,0.6)]"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    className="w-full flex justify-center"
                  >
                    <button
                      onClick={handleEnter}
                      id="enter-site-btn"
                      className="liquid-glass-button group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-white border border-sky-300/60 bg-gradient-to-r from-[#00A3E0]/30 via-sky-400/25 to-sky-600/30 shadow-[0_0_30px_rgba(0, 163, 224,0.4)] backdrop-blur-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Enter The Almighty&apos;s</span>
                      <ArrowRight className="w-4 h-4 text-[#00A3E0] group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
