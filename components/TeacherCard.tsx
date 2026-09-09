"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Mail, Award, Sparkles, BookOpen } from "lucide-react";
import { LiquidGlassCard } from "./liquid-glass/LiquidGlassCard";
import { LiquidGlassBadge } from "./liquid-glass/LiquidGlassBadge";

export interface TeacherData {
  id: string;
  name: string;
  role: string;
  department: string;
  subject: string;
  credentials: string;
  avatar: string;
  bio: string;
  stats: {
    publications: number;
    experienceYears: number;
  };
  specialties: string[];
}

export function TeacherCard({ teacher }: { teacher: TeacherData }) {
  return (
    <LiquidGlassCard
      enableTilt={true}
      className="p-5 sm:p-7 relative rounded-2xl sm:rounded-3xl border border-sky-500/20 dark:border-sky-300/25"
    >
      {/* Lanyard Glass Slot at Top */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1.5 sm:h-2 rounded-full bg-sky-500/20 dark:bg-sky-300/20 border border-sky-500/30 dark:border-sky-300/30" />

      {/* Holographic ID Badge Header */}
      <div className="flex items-center justify-between pt-2 pb-3 sm:pb-4 text-xs border-b border-sky-500/15 dark:border-sky-300/15">
        <div className="flex items-center gap-1.5 font-mono font-bold text-[11px] sm:text-xs text-[#00A3E0]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{teacher.id}</span>
        </div>
        <LiquidGlassBadge variant="gold" size="sm">
          {teacher.department}
        </LiquidGlassBadge>
      </div>

      {/* Avatar & Profile Hero */}
      <div className="mt-4 sm:mt-5 flex flex-col items-center text-center">
        <div className="relative mb-3 sm:mb-4">
          {/* Glowing Orbit Ring */}
          <div className="absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-300 bg-gradient-to-tr from-[#00A3E0] via-transparent to-sky-400" />
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-xl border-2 border-sky-400 dark:border-sky-300">
            <Image
              src={teacher.avatar}
              alt={teacher.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 80px, 112px"
            />
          </div>
          <div className="absolute bottom-0 right-0 p-1 sm:p-1.5 rounded-full text-black shadow-md bg-[#00A3E0]">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold font-editorial group-hover:text-[#00A3E0] transition-colors text-neutral-900 dark:text-sky-100">
          {teacher.name}
        </h3>
        <p className="text-[11px] sm:text-xs font-semibold mt-0.5 text-[#00A3E0]">
          {teacher.role}
        </p>
        <p className="text-[11px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-400">
          {teacher.subject} • {teacher.credentials}
        </p>
      </div>

      {/* Bio */}
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm line-clamp-3 text-center leading-relaxed text-neutral-800 dark:text-neutral-300">
        {teacher.bio}
      </p>

      {/* Specialties Tags */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {teacher.specialties.map((spec) => (
          <span
            key={spec}
            className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold border border-sky-500/30 dark:border-sky-300/20 text-neutral-800 dark:text-neutral-200 bg-sky-400/10 dark:bg-sky-300/10"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Stat Badge Footer & Socials */}
      <div className="mt-5 pt-4 flex items-center justify-between border-t border-sky-500/15 dark:border-sky-300/15">
        <div className="flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>{teacher.stats.publications} Papers</span>
          </span>
          <span>•</span>
          <span>{teacher.stats.experienceYears}+ Yrs</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${teacher.name.toLowerCase().replace(/\s+/g, ".")}@sasc.edu`}
            aria-label="Email"
            className="p-1.5 rounded-lg transition-colors border border-sky-500/30 dark:border-sky-300/30 text-[#00A3E0] bg-sky-400/10 dark:bg-sky-300/10 hover:bg-sky-400/20"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
