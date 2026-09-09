"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative min-h-[75vh] w-full flex items-center justify-center p-4 overflow-hidden">
      {/* Background Campus Image with Glass Overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/1.jpg"
          alt="The Almighty's School Campus"
          fill
          priority
          className="object-cover opacity-100"
          style={{ filter: "brightness(1.0)" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl liquid-glass-card shadow-[0_0_60px_rgba(0, 163, 224,0.22)] border border-sky-400/30 backdrop-blur-2xl">
        <div className="relative w-16 h-16 rounded-2xl p-2 flex items-center justify-center bg-sky-400/15 border border-sky-400/40 shadow-[0_0_25px_rgba(0, 163, 224,0.3)]">
          <Image
            src="/logo.png"
            alt="The Almighty's Logo"
            width={48}
            height={48}
            priority
            className="object-contain"
          />
        </div>

        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-sky-400/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00A3E0] border-r-[#00A3E0] animate-spin" />
          <Sparkles className="w-4 h-4 text-[#00A3E0] animate-pulse" />
        </div>

        <div className="text-center">
          <span className="luxury-overline text-xs font-bold tracking-[0.25em] text-[#00A3E0] block">
            Loading Page
          </span>
          <span className="text-[11px] font-semibold text-neutral-200 block mt-0.5">
            The Almighty&apos;s Matriculation School
          </span>
        </div>
      </div>
    </div>
  );
}

