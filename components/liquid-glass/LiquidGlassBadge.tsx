"use client";

import React from "react";

export interface LiquidGlassBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "gold" | "sky" | "coral" | "mint" | "lavender" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LiquidGlassBadge: React.FC<LiquidGlassBadgeProps> = ({
  children,
  icon,
  variant = "gold",
  size = "md",
  className = "",
}) => {
  const variantStyles = {
    gold: "text-[#00A3E0] border-sky-400/40 dark:border-sky-300/40 bg-sky-400/10 dark:bg-sky-300/15 shadow-[0_2px_12px_rgba(0, 163, 224,0.18)]",
    sky: "text-sky-800 dark:text-sky-300 border-sky-400/40 dark:border-sky-300/40 bg-sky-400/15 dark:bg-sky-300/15",
    coral: "text-rose-700 dark:text-rose-300 border-rose-500/40 dark:border-rose-400/40 bg-rose-500/15 dark:bg-rose-400/15",
    mint: "text-emerald-700 dark:text-emerald-300 border-emerald-500/40 dark:border-emerald-400/40 bg-emerald-500/15 dark:bg-emerald-400/15",
    lavender: "text-indigo-700 dark:text-indigo-300 border-indigo-500/40 dark:border-indigo-400/40 bg-indigo-500/15 dark:bg-indigo-400/15",
    neutral: "text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-white/20 bg-white/60 dark:bg-white/10 shadow-sm",
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[0.65rem] tracking-wider",
    md: "px-3.5 py-1 text-xs tracking-wider",
    lg: "px-4.5 py-1.5 text-sm tracking-widest",
  }[size];

  return (
    <span
      className={`liquid-glass-rim group inline-flex items-center gap-1.5 rounded-full font-bold uppercase backdrop-blur-[5px] transition-all duration-300 hover:scale-105 ${variantStyles} ${sizeStyles} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </span>
  );
};
