"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = "",
  enableTilt = true,
  glowColor,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches);
  }, []);

  // 3D Parallax Tilt Values (Active only on fine pointer desktop)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 280 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const canTilt = enableTilt && isDesktop;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });

    const normalizedX = clientX / rect.width - 0.5;
    const normalizedY = clientY / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    if (isDesktop) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (canTilt) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
        transformStyle: canTilt ? "preserve-3d" : "flat",
        perspective: canTilt ? 1000 : undefined,
        transform: "translateZ(0)",
        ...style,
      }}
      whileHover={isDesktop ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`liquid-glass-card group relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Specular Mouse Highlight on Desktop */}
      {isHovered && isDesktop && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
              glowColor || "rgba(201, 168, 76, 0.14)"
            }, transparent 70%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};

