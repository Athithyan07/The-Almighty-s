"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  label: string;
  description?: string;
}

export function CountUpStat({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0,
  label,
  description,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutProgress * end;
            setCount(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="p-6 rounded-3xl liquid-glass-card group flex flex-col justify-between"
    >
      <div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white flex items-baseline">
          <span className="text-[#C9A84C] mr-1">{prefix}</span>
          <span className="bg-gradient-to-r from-slate-900 via-amber-700 to-slate-900 dark:from-white dark:via-amber-100 dark:to-yellow-200 bg-clip-text text-transparent">
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
          </span>
          <span className="text-[#C9A84C] ml-1">{suffix}</span>
        </div>
        <h4 className="mt-2 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#C9A84C] dark:group-hover:text-[#E2C376] transition-colors">
          {label}
        </h4>
      </div>
      {description && (
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-white/10 pt-3">
          {description}
        </p>
      )}
    </div>
  );
}
