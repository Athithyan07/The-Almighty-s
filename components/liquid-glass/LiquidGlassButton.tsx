"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "pill" | "rounded" | "circle";
  variant?: "primary" | "secondary" | "gold" | "nested";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  shape = "pill",
  variant = "primary",
  size = "md",
  children,
  className = "",
  glow = true,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  const shapeClasses =
    shape === "circle"
      ? "aspect-square rounded-full p-0 flex items-center justify-center"
      : shape === "pill"
      ? "rounded-full"
      : "rounded-2xl";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-bold tracking-wide",
    md: "px-6 py-3 text-sm font-bold tracking-wider",
    lg: "px-8 py-4 text-base font-extrabold tracking-widest",
    icon: "w-11 h-11 p-0 flex items-center justify-center text-sm",
  }[size];

  const variantClasses = {
    primary:
      "bg-sky-400/25 dark:bg-sky-300/20 text-neutral-900 dark:text-sky-100 border-sky-400/50 dark:border-sky-300/50 hover:bg-sky-400/35 dark:hover:bg-sky-300/30 backdrop-blur-[5px]",
    secondary:
      "bg-white/60 dark:bg-white/10 text-neutral-900 dark:text-neutral-100 border-neutral-300/80 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 backdrop-blur-[5px] shadow-sm",
    gold: "bg-gradient-to-r from-[#00A3E0]/30 via-sky-400/20 to-sky-600/30 text-neutral-900 dark:text-sky-100 border-sky-300/60 shadow-[0_0_20px_rgba(0, 163, 224,0.3)] backdrop-blur-[5px]",
    nested: "liquid-glass-nested text-neutral-900 dark:text-neutral-100",
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className={`liquid-glass-button liquid-glass-rim group relative inline-flex items-center justify-center gap-2 cursor-pointer font-sans transition-all duration-300 uppercase select-none ${shapeClasses} ${sizeClasses} ${variantClasses} ${
        glow ? "hover:shadow-[0_0_25px_rgba(0, 163, 224,0.35)]" : ""
      } ${className}`}
      {...(props as any)}
    >
      {/* Click Liquid Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/40 dark:bg-sky-300/40 animate-ping duration-700"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}

      {/* Surface Gleam */}
      <span className="liquid-glass-sheen absolute inset-0 pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
