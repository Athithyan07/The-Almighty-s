"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LucideIcon, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { LiquidGlassBadge } from "./liquid-glass/LiquidGlassBadge";

export interface FacilityData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  stats: string;
  className?: string;
}

export function FacilityBento({ facility }: { facility: FacilityData }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = facility.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`liquid-glass-card liquid-glass-rim group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 min-h-[260px] sm:min-h-[340px] flex flex-col justify-end p-4 sm:p-8 cursor-pointer ${
        facility.className || "col-span-1"
      } ${
        isHovered
          ? "border-amber-500/60 shadow-2xl -translate-y-1.5"
          : "border-amber-600/20 dark:border-amber-400/25"
      }`}
    >
      {/* Background Image: Crisp vs Diffused */}
      <div className="absolute inset-0 z-0">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered
              ? "scale-105 filter-none brightness-75 contrast-105"
              : "scale-100 filter brightness-50 contrast-90"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Dynamic Gradient Tint Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isHovered
              ? "bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent dark:from-[#09090d] dark:via-[#09090d]/60 opacity-90"
              : "bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40 dark:from-[#09090d] dark:via-[#09090d]/80 dark:to-[#09090d]/40 opacity-95"
          }`}
        />
      </div>

      {/* Top Floating Glass Badges */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex items-center justify-between gap-2">
        <LiquidGlassBadge
          variant="gold"
          size="sm"
          icon={<Icon className="w-3.5 h-3.5" />}
        >
          {facility.category}
        </LiquidGlassBadge>

        <LiquidGlassBadge variant="neutral" size="sm">
          {facility.stats}
        </LiquidGlassBadge>
      </div>

      {/* Glass Content Pane at bottom */}
      <div className="relative z-10 transition-all duration-500">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block text-[#C9A84C]">
              {facility.subtitle}
            </span>
            <h3 className="text-xl sm:text-3xl font-bold mt-1 transition-colors font-editorial text-neutral-100 dark:text-amber-100 group-hover:text-amber-300">
              {facility.title}
            </h3>
          </div>

          <div
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl backdrop-blur-[5px] border transition-all duration-300 shrink-0 mt-1 bg-amber-500/10 dark:bg-amber-400/15 border-amber-500/30 dark:border-amber-400/40 text-amber-300 group-hover:bg-amber-400 group-hover:text-neutral-950"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
          </div>
        </div>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed max-w-xl font-editorial italic text-neutral-300 dark:text-neutral-300">
          {facility.description}
        </p>

        {/* Dynamic Expanded Feature Badges revealed on hover */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isHovered ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-500/20 dark:border-amber-400/25">
            {facility.features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg backdrop-blur-[5px] font-medium bg-neutral-900/80 dark:bg-[#09090d]/80 border border-amber-500/30 dark:border-amber-400/40 text-neutral-200"
              >
                <CheckCircle2 className="w-3 h-3 text-amber-400" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

