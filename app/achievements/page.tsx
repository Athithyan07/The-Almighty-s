"use client";

import Image from "next/image";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import { AchievementTimeline } from "@/components/AchievementTimeline";
import { ExternalLink } from "lucide-react";
import {
  LiquidGlassCard,
  LiquidGlassBadge,
  LiquidGlassButton,
} from "@/components/liquid-glass";

export default function AchievementsPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO WITH AWARDS BACKGROUND ══ */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-24 px-3 sm:px-8 lg:px-12 text-center overflow-hidden">
        <Image
          src="/6.jpeg"
          alt="Honors and Awards at The Almighty's"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <Scroll3DReveal direction="up" className="max-w-4xl mx-auto">
          <LiquidGlassCard
            enableTilt={false}
            className="p-5 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-[5px] inline-block max-w-full"
          >
            <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
              Honors & Milestones
            </LiquidGlassBadge>

            <h1 className="editorial-heading-lg" style={{ fontSize: "clamp(2rem, 6.5vw, 6.5rem)" }}>
              A Tradition of
              <br />
              <em className="text-[#C9A84C] italic">Academic & Moral Glory</em>
            </h1>

            <div className="gold-line max-w-xs mx-auto my-3 sm:my-6" />

            <p
              className="luxury-text-readable font-editorial italic text-neutral-900 dark:text-neutral-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              From state-level matriculation board distinction ranks to national robotics cups and athletics trophies,
              The Almighty&apos;s Matriculation School celebrates every scholar&apos;s triumph.
            </p>

            {/* Stat metrics summary */}
            <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto">
              <div
                className="p-3 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-1 backdrop-blur-[5px] bg-white/40 dark:bg-black/30 border border-neutral-300/60 dark:border-white/15"
              >
                <div className="luxury-stat-num text-[#C9A84C]" style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>100%</div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 text-center">
                  Board Pass Rate
                </div>
              </div>

              <div
                className="p-3 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-1 backdrop-blur-[5px] bg-white/40 dark:bg-black/30 border border-neutral-300/60 dark:border-white/15"
              >
                <div className="luxury-stat-num text-[#C9A84C]" style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>48+</div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 text-center">
                  State Trophies
                </div>
              </div>

              <div
                className="p-3 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-1 backdrop-blur-[5px] bg-white/40 dark:bg-black/30 border border-neutral-300/60 dark:border-white/15"
              >
                <div className="luxury-stat-num text-[#C9A84C]" style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>22</div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 text-center">
                  Olympiad Golds
                </div>
              </div>

              <div
                className="p-3 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-1 backdrop-blur-[5px] bg-white/40 dark:bg-black/30 border border-neutral-300/60 dark:border-white/15"
              >
                <div className="luxury-stat-num text-[#C9A84C]" style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>#1</div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 text-center">
                  District Shield
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </Scroll3DReveal>
      </section>

      {/* ══ TIMELINE SECTION ══ */}
      <section
        className="relative py-10 sm:py-20 px-3 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <AchievementTimeline />
        </div>
      </section>

      {/* ══ SASC PORTAL BANNER (PRE-FOOTER SEGMENT WITH BG IMAGE) ══ */}
      <section
        className="relative py-10 sm:py-24 px-3 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-amber-600/15 dark:border-amber-400/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/1.jpg"
          alt="Honors and Academic Glory at The Almighty's School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Scroll3DReveal direction="scale">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-amber-600/20 dark:border-amber-400/25 relative overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
                  Centralized SASC Cloud Portal
                </LiquidGlassBadge>
                <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                  View Honor Roll & <em className="text-[#C9A84C]">Term Rankings</em>
                </h2>

                <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

                <p
                  className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed mb-6"
                >
                  Live scorecards, merit certificates, and competition updates are published on the SASC Portal.
                </p>

                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                    Portal Leaderboard
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </LiquidGlassButton>
                </a>
              </div>
            </LiquidGlassCard>
          </Scroll3DReveal>
        </div>
      </section>

    </div>
  );
}

