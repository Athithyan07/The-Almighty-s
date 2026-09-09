"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(easeOutProgress * value);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="w-full">
      <LiquidGlassCard
        enableTilt={true}
        className={`flex flex-col justify-between min-h-[180px] sm:min-h-[200px] border border-sky-500/20 dark:border-sky-300/25 ${className}`}
      >
        <div className="flex items-center justify-between w-full mb-3">
          <span className="text-[0.68rem] sm:text-xs font-bold uppercase tracking-widest text-[#00A3E0]">
            {label}
          </span>
          {icon && (
            <div className="w-9 h-9 rounded-full bg-sky-400/10 dark:bg-sky-300/15 flex items-center justify-center text-[#00A3E0]">
              {icon}
            </div>
          )}
        </div>

        <div className="my-auto">
          <div className="luxury-stat-num text-3xl sm:text-4xl md:text-5xl font-black text-[#00A3E0] flex items-baseline">
            {prefix && <span>{prefix}</span>}
            <span>{Math.floor(count).toLocaleString()}</span>
            {suffix && <span className="text-[#00A3E0]">{suffix}</span>}
          </div>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 mt-2 font-medium">
            {description}
          </p>
        )}
      </LiquidGlassCard>
    </div>
  );
};
