"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Sparkles,
  Rocket,
  Atom,
  Globe2,
  Calendar,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { LiquidGlassCard } from "./liquid-glass/LiquidGlassCard";
import { LiquidGlassBadge } from "./liquid-glass/LiquidGlassBadge";

export interface Milestone {
  id: string;
  year: string;
  date: string;
  title: string;
  category: string;
  rank: string;
  description: string;
  institution: string;
  impactMetric: string;
  iconName: "trophy" | "medal" | "award" | "crown" | "rocket" | "atom";
  glowColor: "amber" | "cyan" | "purple" | "pink" | "emerald";
  tags: string[];
}

export const MILESTONES_DATA: Milestone[] = [
  {
    id: "m-1",
    year: "2026",
    date: "May 2026",
    title: "1st Place - International Autonomous Robotics Cup",
    category: "Robotics & AI",
    rank: "World Champion",
    description:
      "SASC Advanced Robotics Team designed and programmed an autonomous planetary rover utilizing liquid-crystal perception sensors, outperforming 140 university teams across 38 nations in Zurich.",
    institution: "World Robotics Federation & ETH Zürich",
    impactMetric: "Zero navigation faults in simulated Mars terrain",
    iconName: "trophy",
    glowColor: "amber",
    tags: ["Autonomous Systems", "Computer Vision", "ROS 2", "Mechatronics"],
  },
  {
    id: "m-2",
    year: "2025",
    date: "November 2025",
    title: "Triple Gold Medals - International Physics Olympiad (IPhO)",
    category: "Quantum Physics",
    rank: "Global Triple Gold",
    description:
      "Three SASC research scholars captured individual Gold honors, with Elena Rostova setting the all-time highest score in theoretical quantum entanglement simulations.",
    institution: "International Physics Olympiad Council, Tokyo",
    impactMetric: "Top 0.01% among 420 global finalists",
    iconName: "atom",
    glowColor: "cyan",
    tags: ["Quantum Optics", "Statistical Mechanics", "Mathematical Physics"],
  },
  {
    id: "m-3",
    year: "2025",
    date: "April 2025",
    title: "NASA Human Exploration Rover Grand Laureate",
    category: "Aerospace Engineering",
    rank: "Overall 1st Prize",
    description:
      "Recognized by NASA engineers for developing a carbon-composite collapsible wheel suspension that withstood 40G shock stress tests at Marshall Space Flight Center.",
    institution: "NASA Marshall Space Flight Center, USA",
    impactMetric: "Awarded $500,000 collegiate research fellowship",
    iconName: "rocket",
    glowColor: "purple",
    tags: ["Aerospace Materials", "Pneumatics", "NASA Challenge"],
  },
  {
    id: "m-4",
    year: "2024",
    date: "October 2024",
    title: "MIT Global Climate Bio-Innovation Hackathon",
    category: "Clean Tech & Bio-Engineering",
    rank: "Grand Winner",
    description:
      "Engineered an engineered micro-algae bio-filter encased in liquid-glass photobioreactors that purifies industrial carbon dioxide with 84% greater efficiency than terrestrial plants.",
    institution: "MIT Media Lab & UN Environment Programme",
    impactMetric: "Provisional patent filed & field-tested",
    iconName: "medal",
    glowColor: "emerald",
    tags: ["Synthetic Biology", "Carbon Capture", "Clean Energy"],
  },
  {
    id: "m-5",
    year: "2024",
    date: "February 2024",
    title: "Grand Prix - International Youth Math Olympiad",
    category: "Pure Mathematics",
    rank: "Diamond Laurel",
    description:
      "Demonstrated novel topological invariants resolving a 15-year open conjecture in algorithmic knot theory, receiving publication in the Young Mathematics Journal.",
    institution: "International Mathematical Union",
    impactMetric: "Perfect 100/100 team score across all phases",
    iconName: "crown",
    glowColor: "pink",
    tags: ["Topology", "Combinatorics", "Number Theory"],
  },
  {
    id: "m-6",
    year: "2023",
    date: "August 2023",
    title: "UN Global Humanitarian Tech Innovation Fellowship",
    category: "Societal Impact",
    rank: "Excellence Citation",
    description:
      "Deployed an open-source decentralized emergency communication mesh network adopted by disaster response agencies across 5 coastal provinces.",
    institution: "United Nations Youth Assembly, Geneva",
    impactMetric: "Benefited 35,000+ citizens during cyclone season",
    iconName: "award",
    glowColor: "cyan",
    tags: ["Satellite Comms", "Humanitarian IoT", "Disaster Resilience"],
  },
];

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  crown: Crown,
  rocket: Rocket,
  atom: Atom,
};

const glowColorClasses = {
  amber: "from-amber-400 to-yellow-500 shadow-amber-500/40 text-amber-300",
  cyan: "from-cyan-400 to-blue-500 shadow-cyan-500/40 text-cyan-300",
  purple: "from-purple-400 to-indigo-500 shadow-purple-500/40 text-purple-300",
  pink: "from-pink-400 to-rose-500 shadow-pink-500/40 text-pink-300",
  emerald: "from-emerald-400 to-teal-500 shadow-emerald-500/40 text-emerald-300",
};

export function AchievementTimeline() {
  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 40,
      spread: 60,
      colors: ["#06b6d4", "#a855f7", "#ec4899", "#fbbf24"],
    });
  };

  return (
    <div className="relative py-8 sm:py-12 max-w-5xl mx-auto px-2 sm:px-4">
      {/* Central Liquid Glowing Spine */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] sm:w-[3px] bg-gradient-to-b from-[#C9A84C] via-[#E2C376] to-[#A37D28] shadow-[0_0_15px_rgba(201,168,76,0.5)] rounded-full" />

      <div className="space-y-8 sm:space-y-16">
        {MILESTONES_DATA.map((item, index) => {
          const isEven = index % 2 === 0;
          const IconComponent = iconMap[item.iconName] || Trophy;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } gap-4 md:gap-8`}
            >
              {/* Content Card */}
              <div
                onClick={triggerConfetti}
                className="w-full md:w-[calc(50%-40px)] pl-9 sm:pl-12 md:pl-0 cursor-pointer group"
              >
                <LiquidGlassCard
                  enableTilt={true}
                  className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-amber-600/20 dark:border-amber-400/25"
                >
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-600/15 dark:border-amber-400/15">
                    <div className="flex items-center gap-2">
                      <LiquidGlassBadge variant="gold" size="sm">
                        {item.category}
                      </LiquidGlassBadge>
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <LiquidGlassBadge variant="coral" size="sm">
                      {item.rank}
                    </LiquidGlassBadge>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base sm:text-xl font-bold mt-3 group-hover:text-[#C9A84C] transition-colors font-editorial text-neutral-900 dark:text-amber-100"
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm mt-2 leading-relaxed text-neutral-800 dark:text-neutral-300">
                    {item.description}
                  </p>

                  {/* Impact Metric Callout */}
                  <div
                    className="mt-3 sm:mt-4 p-3 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/25"
                  >
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold block text-[#C9A84C]">
                        Verified Outcome
                      </span>
                      <span className="font-semibold text-[11px] sm:text-xs text-neutral-900 dark:text-amber-100">
                        {item.impactMetric}
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 shrink-0 text-[#C9A84C]" />
                  </div>

                  {/* Tags & Institution */}
                  <div className="mt-3 sm:mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-amber-600/15 dark:border-amber-400/15">
                    <span className="font-semibold italic text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-400">
                      {item.institution}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-amber-600/30 dark:border-amber-400/20 text-neutral-800 dark:text-neutral-200 bg-amber-500/10 dark:bg-amber-400/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>

              {/* Glowing Center Node Icon */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                <div
                  className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl p-0.5 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #E2C376)",
                    boxShadow: "0 0 15px rgba(201,168,76,0.4)",
                  }}
                >
                  <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-[#09090d] flex items-center justify-center">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#C9A84C" }} />
                  </div>
                </div>
              </div>

              {/* Empty placeholder spacer for alternating side on desktop */}
              <div className="hidden md:block md:w-[calc(50%-40px)]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
