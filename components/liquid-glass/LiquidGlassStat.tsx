"use client";

import React from "react";
import { CountUpStat } from "../CountUpStat";
import { LiquidGlassCard } from "./LiquidGlassCard";

export interface LiquidGlassStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const LiquidGlassStat: React.FC<LiquidGlassStatProps> = ({
  value,
  suffix = "+",
  prefix = "",
  label,
  description,
  icon,
  className = "",
}) => {
  return (
    <LiquidGlassCard
      enableTilt={true}
      className={`flex flex-col justify-between min-h-[180px] sm:min-h-[200px] border border-amber-600/20 dark:border-amber-400/25 ${className}`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
          {label}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-full bg-amber-500/10 dark:bg-amber-400/15 flex items-center justify-center text-[#C9A84C]">
            {icon}
          </div>
        )}
      </div>

      <div className="my-auto">
        <div className="luxury-stat-num text-3xl sm:text-4xl md:text-5xl font-black text-[#C9A84C] flex items-baseline">
          {prefix && <span>{prefix}</span>}
          <CountUpStat value={value} duration={2.5} />
          {suffix && <span className="text-[#C9A84C]">{suffix}</span>}
        </div>
      </div>

      {description && (
        <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 mt-2 font-medium">
          {description}
        </p>
      )}
    </LiquidGlassCard>
  );
};
