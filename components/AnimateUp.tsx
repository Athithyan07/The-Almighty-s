"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLoading } from "./LoadingContext";

interface AnimateUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  enableHoverFloat?: boolean;
}

export function AnimateUp({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 50,
  className = "",
  enableHoverFloat = false,
}: AnimateUpProps) {
  const { isLoaded } = useLoading();

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={
        isLoaded
          ? {
              opacity: 1,
              y: 0,
            }
          : { opacity: 0, y: yOffset }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // fluid ease-out / ease-in entrance
      }}
      whileHover={
        enableHoverFloat
          ? {
              y: -8,
              transition: { duration: 0.35, ease: "easeOut" },
            }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
