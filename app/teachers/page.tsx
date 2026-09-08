"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeacherCard, TeacherData } from "@/components/TeacherCard";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import { Users, ExternalLink } from "lucide-react";

const TEACHERS_DATA: TeacherData[] = [
  {
    id: "AMS-101",
    name: "Mrs. Meenakshi Sundaram",
    role: "Principal & Head of Mathematics",
    department: "Mathematics",
    subject: "Higher Secondary Pure Math",
    credentials: "M.Sc., M.Ed., Gold Medalist",
    avatar: "/1.jpg",
    bio: "22 years of dedicated leadership producing numerous state-rank holders. Specializes in making calculus and algebra intuitive and engaging.",
    stats: {
      publications: 24,
      experienceYears: 22,
    },
    specialties: ["Calculus", "Vedic Math", "Trigonometry"],
  },
  {
    id: "AMS-102",
    name: "Mr. Rajesh Chandran",
    role: "Senior Physics Master",
    department: "Science",
    subject: "Physics & Astronomy Club",
    credentials: "M.Sc. Physics, B.Ed.",
    avatar: "/2.webp",
    bio: "Passionate about experimental physics and astronomy. Mentors the school robotics team and coordinates the annual state science fair.",
    stats: {
      publications: 18,
      experienceYears: 16,
    },
    specialties: ["Electromagnetism", "Optics Lab", "Robotics"],
  },
  {
    id: "AMS-103",
    name: "Dr. Ananya Sharma",
    role: "Head of Chemistry & Biology",
    department: "Science",
    subject: "Organic Chemistry & Bio-Tech",
    credentials: "Ph.D. Bio-Chemistry, B.Ed.",
    avatar: "/3.webp",
    bio: "Inspires young minds through practical environmental science and chemical experiments. Lead mentor for the National Science Olympiad.",
    stats: {
      publications: 32,
      experienceYears: 14,
    },
    specialties: ["Organic Chemistry", "Genetics", "Eco-Club"],
  },
  {
    id: "AMS-104",
    name: "Mr. David Paul",
    role: "Head of Computer Science & AI",
    department: "Technology",
    subject: "Computer Science & Python",
    credentials: "M.C.A., B.Ed., Certified Educator",
    avatar: "/4.webp",
    bio: "Brings modern programming languages, web development, and robotic coding to classroom students from primary through higher secondary.",
    stats: {
      publications: 15,
      experienceYears: 12,
    },
    specialties: ["Python", "Web Technologies", "AI Literacy"],
  },
  {
    id: "AMS-105",
    name: "Mrs. Revathi Raman",
    role: "Senior English Lecturer",
    department: "Languages",
    subject: "English Literature & Oratory",
    credentials: "M.A. English Lit, M.Phil, B.Ed.",
    avatar: "/5.jpg",
    bio: "Champions communicative fluency, debate, and literary creative expression. Coordinates the school literary festival and Model UN delegation.",
    stats: {
      publications: 12,
      experienceYears: 19,
    },
    specialties: ["Shakespearean Drama", "Public Speaking", "Phonics"],
  },
  {
    id: "AMS-106",
    name: "Coach Senthil Kumar",
    role: "Director of Physical Education",
    department: "Sports",
    subject: "Athletics, Cricket & Yoga",
    credentials: "M.P.Ed., NIS Certified Coach",
    avatar: "/6.jpeg",
    bio: "Instilling discipline, stamina, and team spirit. Trained inter-school championship teams in cricket, volleyball, and 100m sprinting.",
    stats: {
      publications: 8,
      experienceYears: 15,
    },
    specialties: ["Athletic Training", "Cricket", "Yoga & Wellness"],
  },
];

import {
  LiquidGlassCard,
  LiquidGlassBadge,
  LiquidGlassButton,
} from "@/components/liquid-glass";

export default function TeachersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = ["All", "Science", "Mathematics", "Technology", "Languages", "Sports"];

  const filteredTeachers =
    selectedDept === "All"
      ? TEACHERS_DATA
      : TEACHERS_DATA.filter((t) => t.department === selectedDept);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden">
        <Image
          src="/1.jpg"
          alt="Distinguished Faculty at The Almighty's"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <Scroll3DReveal direction="up" className="max-w-4xl mx-auto">
          <LiquidGlassCard
            enableTilt={false}
            className="p-6 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-[5px] inline-block max-w-full"
          >
            <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
              Distinguished Faculty
            </LiquidGlassBadge>

            <h1 className="editorial-heading-lg" style={{ fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)" }}>
              Compassionate Mentors
              <br />
              <em className="text-[#C9A84C] italic">Inspiring Teachers</em>
            </h1>

            <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

            <p
              className="luxury-text-readable font-editorial italic text-neutral-900 dark:text-neutral-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Meet our devoted educators who guide every student toward academic distinction,
              moral leadership, and personal excellence at The Almighty&apos;s Matriculation School.
            </p>

            {/* Department Filter Chips */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {departments.map((dept) => {
                const isSelected = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-[5px] cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/25 dark:bg-amber-400/25 border border-amber-500/60 dark:border-amber-400/60 text-neutral-900 dark:text-amber-100 shadow-[0_0_15px_rgba(201,168,76,0.3)] font-black"
                        : "bg-white/40 dark:bg-black/30 border border-neutral-300/60 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-white/60 dark:hover:bg-white/15"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </LiquidGlassCard>
        </Scroll3DReveal>
      </section>

      {/* ══ TEACHERS GRID ══ */}
      <section
        className="relative py-14 sm:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 relative z-10">
          {filteredTeachers.map((teacher, idx) => (
            <Scroll3DReveal key={teacher.id} index={idx} direction="up">
              <TeacherCard teacher={teacher} />
            </Scroll3DReveal>
          ))}
        </div>
      </section>

      {/* ══ SASC PORTAL BANNER (PRE-FOOTER SEGMENT WITH BG IMAGE) ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-amber-600/15 dark:border-amber-400/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/4.webp"
          alt="Faculty and Mentorship at The Almighty's School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Scroll3DReveal direction="scale">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-amber-600/20 dark:border-amber-400/25 relative overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
                  Parent-Teacher Communication
                </LiquidGlassBadge>
                <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                  Connect via <em className="text-[#C9A84C]">SASC Portal</em>
                </h2>

                <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

                <p
                  className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed mb-6"
                >
                  Parents can book meeting slots, view subject feedback, and download progress reports via the SASC Portal.
                </p>

                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                    Connect via SASC Portal
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </LiquidGlassButton>
                </a>
              </div>
            </LiquidGlassCard>
          </Scroll3DReveal>
        </div>
      </section>

    </div>
  );
}

