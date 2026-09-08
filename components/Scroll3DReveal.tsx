"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const staggerDelay = isMobile ? 0 : Math.min((index % 4) * 0.08, 0.3);

  const getInitial = () => {
    if (isMobile) {
      return { opacity: 0, y: 12 };
    }
    switch (direction) {
      case "left":
        return { opacity: 0, scale: 0.96, x: -20, y: 8 };
      case "right":
        return { opacity: 0, scale: 0.96, x: 20, y: 8 };
      case "scale":
        return { opacity: 0, scale: 0.94, y: 14 };
      case "up":
      default:
        return { opacity: 0, scale: 0.96, y: 18 };
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
          duration: isMobile ? 0.4 : 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: staggerDelay,
        }}
        style={{ transform: "translateZ(0)" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
