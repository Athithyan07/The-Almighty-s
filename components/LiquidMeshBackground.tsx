"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const ROUTE_BACKGROUNDS: Record<string, { image: string; alt: string }> = {
  "/": {
    image: "/IMG_6389.jpg",
    alt: "The Almighty's Matriculation School Campus",
  },
  "/achievements": {
    image: "/1.jpg",
    alt: "The Almighty's Matriculation School Achievements",
  },
  "/facilities": {
    image: "/2.webp",
    alt: "The Almighty's Matriculation School Facilities",
  },
  "/teachers": {
    image: "/3.webp",
    alt: "The Almighty's Matriculation School Faculty",
  },
  "/gallery": {
    image: "/4.webp",
    alt: "The Almighty's Matriculation School Campus Gallery",
  },
  "/about": {
    image: "/5.jpg",
    alt: "About The Almighty's Matriculation School",
  },
};

export function LiquidMeshBackground() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isDark = theme === "dark";

  // Select background based on current route, default to root
  const currentBg = ROUTE_BACKGROUNDS[pathname] || ROUTE_BACKGROUNDS["/"];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">

      {/* Background image — no tint, full opacity */}
      <div className="absolute inset-0">
        <Image
          key={pathname}
          src={currentBg.image}
          alt={currentBg.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Floating Orb 1: Cyan */}
      <div
        className="absolute rounded-full filter blur-[110px] animate-blob-slow opacity-30"
        style={{ top: "10%", left: "12%", width: "48vw", height: "48vw", maxWidth: "650px", maxHeight: "650px",
          backgroundColor: isDark ? "rgba(6,182,212,0.5)" : "rgba(78,205,196,0.35)" }}
      />

      {/* Floating Orb 2: Purple */}
      <div
        className="absolute rounded-full filter blur-[120px] animate-blob-slower opacity-25"
        style={{ top: "42%", right: "8%", width: "52vw", height: "52vw", maxWidth: "700px", maxHeight: "700px",
          backgroundColor: isDark ? "rgba(168,85,247,0.5)" : "rgba(132,94,247,0.30)" }}
      />

      {/* Floating Orb 3: Pink */}
      <div
        className="absolute rounded-full filter blur-[105px] animate-blob-fast opacity-25"
        style={{ bottom: "5%", left: "22%", width: "45vw", height: "45vw", maxWidth: "600px", maxHeight: "600px",
          backgroundColor: isDark ? "rgba(236,72,153,0.45)" : "rgba(240,98,146,0.28)" }}
      />

      {/* Floating Orb 4: Amber */}
      <div
        className="absolute rounded-full filter blur-[115px] animate-pulse-glow opacity-20"
        style={{ top: "20%", left: "50%", width: "36vw", height: "36vw", maxWidth: "480px", maxHeight: "480px",
          backgroundColor: isDark ? "rgba(245,158,11,0.35)" : "rgba(255,214,10,0.30)" }}
      />

      {/* 7. Interactive cursor-responsive liquid ambient highlight */}
      <div
        className="absolute rounded-full filter blur-[80px] transition-transform duration-300 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          width: "350px",
          height: "350px",
          transform: "translate(-50%, -50%)",
          backgroundColor: isDark
            ? "rgba(168, 85, 247, 0.18)"
            : "rgba(216, 180, 254, 0.28)",
        }}
      />


    </div>
  );
}
