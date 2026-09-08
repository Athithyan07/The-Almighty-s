"use client";

import React, { useState } from "react";

export interface LiquidGlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rounded" | "circle" | "pill";
  borderRadius?: number;
  interactiveGleam?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const LiquidGlassContainer: React.FC<LiquidGlassContainerProps> = ({
  shape = "rounded",
  borderRadius = 32,
  interactiveGleam = true,
  children,
  className = "",
  style = {},
  ...props
}) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveGleam) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const shapeClass =
    shape === "circle"
      ? "liquid-glass-circle"
      : shape === "pill"
      ? "liquid-glass-pill"
      : "liquid-glass-rounded";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`liquid-glass-container group relative overflow-hidden transition-all duration-300 ${shapeClass} ${className}`}
      style={{
        borderRadius:
          shape === "circle"
            ? "50%"
            : shape === "pill"
            ? "9999px"
            : `${borderRadius}px`,
        ...style,
      }}
      {...props}
    >
      {/* Specular Mouse Highlight */}
      {interactiveGleam && mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 168, 76, 0.12), transparent 70%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

