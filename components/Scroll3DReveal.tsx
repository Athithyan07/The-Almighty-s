"use client";

import React from "react";
import { motion } from "framer-motion";

interface Scroll3DRevealProps {
  children: React.ReactNode;
  index?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
  intensity?: number;
}

export function Scroll3DReveal({
  children,
  index = 0,
  direction = "up",
  className = "",
}: Scroll3DRevealProps) {
  // Stagger calculation: elements enter gently in sequence
  const staggerDelay = Math.min((index % 6) * 0.1, 0.5);

  // Smooth Zoom-Slide entrance positions
  const getInitial = () => {
    switch (direction) {
      case "left":
        return {
          opacity: 0,
          scale: 0.95,
          x: -28,
          y: 12,
        };
      case "right":
        return {
          opacity: 0,
          scale: 0.95,
          x: 28,
          y: 12,
        };
      case "scale":
        return {
          opacity: 0,
          scale: 0.92,
          y: 20,
        };
      case "up":
      default:
        return {
          opacity: 0,
          scale: 0.95,
          y: 28,
        };
    }
  };

  return (
    <div className={className}>
      <motion.div
        initial={getInitial()}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true, margin: "0px" }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: staggerDelay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
