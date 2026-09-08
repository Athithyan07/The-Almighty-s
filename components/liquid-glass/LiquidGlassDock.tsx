"use client";

import React from "react";
import { motion } from "framer-motion";

export interface LiquidGlassDockProps {
  children: React.ReactNode;
  className?: string;
  position?: "bottom" | "top" | "static";
}

export const LiquidGlassDock: React.FC<LiquidGlassDockProps> = ({
  children,
  className = "",
  position = "static",
}) => {
  const positionClasses = {
    bottom: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
    top: "fixed top-6 left-1/2 -translate-x-1/2 z-50",
    static: "relative",
  }[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "bottom" ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`liquid-glass-dock liquid-glass-rim px-4 py-2.5 flex items-center gap-2 sm:gap-3 shadow-2xl ${positionClasses} ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2 sm:gap-3">
        {children}
      </div>
    </motion.div>
  );
};
