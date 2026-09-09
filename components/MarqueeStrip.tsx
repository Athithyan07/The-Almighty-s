"use client";

import React from "react";

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "Academic Excellence",
  "3,200+ Scholars",
  "25 Years of Legacy",
  "100% Board Pass Rate",
  "State Board Certified",
  "35+ Smart Labs",
  "Moral Education",
  "National Olympiad Champions",
];

export function MarqueeStrip({
  items = DEFAULT_ITEMS,
  speed = 28,
  className = "",
}: MarqueeStripProps) {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden bg-white dark:bg-[#09090d] border-y border-sky-500/20 dark:border-sky-300/20 shadow-sm transition-colors duration-300 ${className}`}
    >
      <div
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          display: "inline-flex",
          whiteSpace: "nowrap",
          alignItems: "center",
          padding: "0.9rem 0",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0", padding: "0 2rem" }}>
            <span
              className="font-serif font-bold tracking-[0.22em] uppercase text-xs text-[#00A3E0] dark:text-[#33B8E8]"
            >
              {item}
            </span>
            <span className="text-[#00A3E0]/60 dark:text-[#00A3E0]/45 text-[0.65rem] ml-8">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
