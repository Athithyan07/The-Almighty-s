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
          className="object-cover opacity-80"
          style={{ filter: "brightness(0.75)" }}
        />
        <div className="absolute inset-0 bg-neutral-950/40 dark:bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative flex flex-col items-center gap-5 p-8 sm:p-10 rounded-3xl liquid-glass-card shadow-[0_0_60px_rgba(201,168,76,0.22)] border border-amber-500/30 backdrop-blur-2xl">
        <div className="relative w-16 h-16 rounded-2xl p-2 flex items-center justify-center bg-amber-500/15 border border-amber-500/40 shadow-[0_0_25px_rgba(201,168,76,0.3)]">
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
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#C9A84C] border-r-[#C9A84C] animate-spin" />
          <Sparkles className="w-4 h-4 text-[#C9A84C] animate-pulse" />
        </div>

        <div className="text-center">
          <span className="luxury-overline text-xs font-bold tracking-[0.25em] text-[#C9A84C] block">
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
