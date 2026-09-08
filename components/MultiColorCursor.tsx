"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const RAINBOW_COLORS = ["#FF6B6B", "#FFD60A", "#51CF66", "#4ECDC4", "#845EF7", "#F06292"];

export function MultiColorCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer trailing ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable elements for magnetic expansion
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest('[role="button"]') ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Spawn colorful sparks on click
    const handleClick = (e: MouseEvent) => {
      const newSparkles: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX + (Math.random() * 30 - 15),
        y: e.clientY + (Math.random() * 30 - 15),
        color: RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)],
      }));

      setSparkles((prev) => [...prev.slice(-12), ...newSparkles]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("click", handleClick);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* ── Trailing Smooth Multi-Colored Ring ── */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          rotate: 360,
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 350, damping: 22 },
        }}
        className="w-10 h-10 rounded-full border-2 border-transparent"
        style-custom={{
          background:
            "linear-gradient(#00000000, #00000000) padding-box, linear-gradient(135deg, #FF6B6B, #FFD60A, #51CF66, #4ECDC4, #845EF7, #F06292) border-box",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "2px solid transparent",
            borderRadius: "9999px",
            background:
              "linear-gradient(#00000000, #00000000) padding-box, linear-gradient(135deg, #FF6B6B, #FFD60A, #51CF66, #4ECDC4, #845EF7, #F06292) border-box",
            boxShadow: isHovered
              ? "0 0 22px rgba(132, 94, 247, 0.6), 0 0 10px rgba(78, 205, 196, 0.5)"
              : "0 0 14px rgba(132, 94, 247, 0.35)",
          }}
        />
      </motion.div>

      {/* ── Center Multi-Colored Dot ── */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        className="w-3.5 h-3.5 rounded-full shadow-lg"
        style-custom={{
          background:
            "linear-gradient(135deg, #FF6B6B 0%, #FFD60A 35%, #4ECDC4 70%, #845EF7 100%)",
        }}
      >
        <div
          className="w-full h-full rounded-full animate-spin-slow"
          style={{
            background:
              "linear-gradient(135deg, #FF6B6B 0%, #FFD60A 35%, #4ECDC4 70%, #845EF7 100%)",
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          }}
        />
      </motion.div>

      {/* ── Click Sparkles ── */}
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            backgroundColor: s.color,
            boxShadow: `0 0 8px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}
