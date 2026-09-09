"use client";

import React from "react";
import Image from "next/image";
import { FacilityBento, FacilityData } from "@/components/FacilityBento";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import {
  Building2,
  Cpu,
  BookOpen,
  Dna,
  Layers,
  ExternalLink,
  Gamepad2,
  Activity
} from "lucide-react";

const FACILITIES_DATA: FacilityData[] = [
  {
    id: "fac-1",
    title: "Advanced STEM & Computer Science Lab",
    subtitle: "Digital Learning Wing",
    category: "High-Tech Computer Lab",
    description:
      "Equipped with 120+ high-speed modern workstations, coding terminals, robotics kits, and high-speed fiber internet for AI and software literacy.",
    image: "/2.webp",
    icon: Cpu,
    features: ["120+ All-in-One Terminals", "Python & Scratch Robotics Kits", "Smart Interactive Projection"],
    stats: "120+ PCs",
    className: "col-span-1 lg:col-span-2",
  },
  {
    id: "fac-2",
    title: "The Central Library & Knowledge Pods",
    subtitle: "Learning Sanctuary",
    category: "Modern Library",
    description:
      "A serene glass-lined library holding over 40,000 academic titles, reference encyclopedias, children's story collections, and digital e-readers.",
    image: "/3.webp",
    icon: BookOpen,
    features: ["40K+ Books & Periodicals", "Acoustic Quiet Cubicles", "Digital Audio-Book Stations"],
    stats: "40K+ Titles",
    className: "col-span-1",
  },
  {
    id: "fac-3",
    title: "Integrated Physics, Chemistry & Bio Labs",
    subtitle: "Experimental Sciences",
    category: "Composite Science Wing",
    description:
      "Full-scale laboratory facilities exceeding matriculation standards with digital spectrometers, chemical hoods, and biological specimen micro-stations.",
    image: "/4.webp",
    icon: Dna,
    features: ["Safety Fume Hoods", "Digital Binocular Microscopes", "Individual Student Workbenches"],
    stats: "Safety Grade A",
    className: "col-span-1",
  },
  {
    id: "fac-4",
    title: "Sports Complex & Athletic Grounds",
    subtitle: "Physical Fitness & Character",
    category: "Athletics & Games",
    description:
      "Expansive 4-acre athletic grounds featuring standard cricket pitches, football turf, synthetic basketball court, and athletic 200m track.",
    image: "/5.jpg",
    icon: Activity,
    features: ["Synthetic Basketball Court", "Cricket & Football Field", "Indoor Badminton & Chess"],
    stats: "4-Acre Grounds",
    className: "col-span-1 lg:col-span-2",
  },
  {
    id: "fac-5",
    title: "Kindergarten Wonderland Playzone",
    subtitle: "Early Childhood Development",
    category: "Primary Activity Park",
    description:
      "Specially designed safe rubberized activity arena with sensory learning puzzles, soft-play structures, and creative sandbox stations.",
    image: "/6.jpeg",
    icon: Gamepad2,
    features: ["Anti-Skid Foam Flooring", "Montessori Sensory Stations", "Storytelling Dome"],
    stats: "Child-Safe",
    className: "col-span-1",
  },
  {
    id: "fac-6",
    title: "Air-Conditioned Multi-Purpose Auditorium",
    subtitle: "Cultural & Academic Symposia",
    category: "Auditorium Hall",
    description:
      "A grand 1,200-seat acoustic amphitheatre with dynamic stage lighting, LED video backdrop, and sound engineering for school festivals and seminars.",
    image: "/1.jpg",
    icon: Layers,
    features: ["1,200-Seat Capacity", "4K Ultra-HD Stage Wall", "Dolby Sound Rig"],
    stats: "1,200 Seats",
    className: "col-span-1 lg:col-span-2",
  },
];

import {
  LiquidGlassCard,
  LiquidGlassBadge,
  LiquidGlassButton,
} from "@/components/liquid-glass";

export default function FacilitiesPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO WITH BACKGROUND IMAGE ══ */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-24 px-3 sm:px-8 lg:px-12 text-center overflow-hidden">
        <Image
          src="/2.webp"
          alt="Facilities at The Almighty's"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(1.0) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <Scroll3DReveal direction="up" className="max-w-4xl mx-auto">
          <LiquidGlassCard
            enableTilt={false}
            className="p-5 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-[5px] inline-block max-w-full"
          >
            <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
              Campus Infrastructure
            </LiquidGlassBadge>

            <h1 className="editorial-heading-lg" style={{ fontSize: "clamp(2rem, 6.5vw, 6.5rem)" }}>
              World-Class
              <br />
              <em className="text-[#00A3E0] italic">Learning Facilities</em>
            </h1>

            <div className="gold-line max-w-xs mx-auto my-3 sm:my-6" />

            <p
              className="luxury-text-readable font-editorial italic text-neutral-900 dark:text-neutral-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Explore our state-of-the-art science laboratories, high-speed computer labs,
              expansive central library, and 4-acre sports complex at The Almighty&apos;s Matriculation School.
            </p>
          </LiquidGlassCard>
        </Scroll3DReveal>
      </section>

      {/* ══ BENTO GRID ══ */}
      <section
        className="relative py-10 sm:py-20 px-3 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-sky-500/15 dark:border-sky-300/15"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 relative z-10">
          {FACILITIES_DATA.map((fac, idx) => (
            <Scroll3DReveal
              key={fac.id}
              index={idx}
              direction="up"
              className={fac.className || "col-span-1"}
            >
              <FacilityBento facility={fac} />
            </Scroll3DReveal>
          ))}
        </div>
      </section>

      {/* ══ SASC PORTAL BANNER (PRE-FOOTER SEGMENT WITH BG IMAGE) ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-sky-500/15 dark:border-sky-300/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/3.webp"
          alt="Facilities at The Almighty's School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(1.0) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Scroll3DReveal direction="scale">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-sky-500/20 dark:border-sky-300/25 relative overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
                  Facility Schedules & Timetables
                </LiquidGlassBadge>
                <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                  Lab Slots & <em className="text-[#00A3E0]">Sports Timetables</em>
                </h2>

                <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

                <p
                  className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed mb-6"
                >
                  Students and parents can view weekly science lab schedules, library bookings, and after-school sports club allotments on the SASC Portal.
                </p>

                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                    Access SASC Portal
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


