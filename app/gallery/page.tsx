"use client";

import Image from "next/image";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import { GallerySpotlight } from "@/components/GallerySpotlight";
import { ExternalLink } from "lucide-react";
import {
  LiquidGlassCard,
  LiquidGlassBadge,
  LiquidGlassButton,
} from "@/components/liquid-glass";

export default function GalleryPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-24 px-3 sm:px-8 lg:px-12 text-center overflow-hidden">
        <Image
          src="/3.webp"
          alt="Life & Moments at The Almighty's"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(1.0) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <Scroll3DReveal direction="up" className="max-w-4xl mx-auto">
          <LiquidGlassCard
            enableTilt={false}
            className="p-5 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-[5px] inline-block max-w-full"
          >
            <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
              Life & Moments
            </LiquidGlassBadge>

            <h1 className="editorial-heading-lg" style={{ fontSize: "clamp(2rem, 6.5vw, 6.5rem)" }}>
              Cherished Memories
              <br />
              <em className="text-[#00A3E0] italic">Joy & Triumphs</em>
            </h1>

            <div className="gold-line max-w-xs mx-auto my-3 sm:my-6" />

            <p
              className="luxury-text-readable font-editorial italic text-neutral-900 dark:text-neutral-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Explore daily school life, science exhibitions, sports day finals, and cultural events at
              The Almighty&apos;s Matriculation School through our interactive photo gallery.
            </p>
          </LiquidGlassCard>
        </Scroll3DReveal>
      </section>

      {/* ══ GALLERY MASONRY SPOTLIGHT ══ */}
      <section
        className="relative py-10 sm:py-20 px-3 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-sky-500/15 dark:border-sky-300/15"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <GallerySpotlight />
        </div>
      </section>

      {/* ══ SASC PORTAL BANNER (PRE-FOOTER SEGMENT WITH BG IMAGE) ══ */}
      <section
        className="relative py-10 sm:py-24 px-3 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-sky-500/15 dark:border-sky-300/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/2.webp"
          alt="School Gallery and Moments at The Almighty's School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(1.0) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Scroll3DReveal direction="scale">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-sky-500/20 dark:border-sky-300/25 relative overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
                  Annual Day & Sports Meet Albums
                </LiquidGlassBadge>
                <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                  Download Event <em className="text-[#00A3E0]">Photo Albums</em>
                </h2>

                <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

                <p
                  className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed mb-6"
                >
                  Parents can log in to the SASC Portal to view and download full high-resolution photo albums from Annual Day, Sports Day, and Science Exhibitions.
                </p>

                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                    Photo Portal Login
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


