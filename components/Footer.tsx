"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-24 border-t border-amber-600/15 dark:border-amber-400/15 bg-[#FAF8F5] dark:bg-[#09090d] text-[var(--foreground)] overflow-hidden">
      {/* Top Gold Line */}
      <div className="gold-line w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column with Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-1 flex items-center justify-center flex-shrink-0 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30"
              >
                <Image
                  src="/logo.png"
                  alt="The Almighty's Matriculation School Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span
                  className="font-serif font-bold text-lg text-amber-950 dark:text-stone-100 italic block"
                >
                  The Almighty&apos;s
                </span>
                <span
                  className="text-[0.55rem] font-bold tracking-[0.22em] uppercase text-[#C9A84C]"
                >
                  Matriculation School
                </span>
              </div>
            </div>

            <p
              className="font-serif text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed max-w-[380px]"
            >
              Nurturing young minds to soar high with moral integrity, academic distinction,
              and boundless creative curiosity within our world-class campus.
            </p>

            <div
              className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full w-fit bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30 text-[#C9A84C]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Academic Session 2026–2027
            </div>

            {/* SASC Login Footer Card */}
            <div
              className="p-3.5 sm:p-4 rounded-2xl relative overflow-hidden liquid-glass-card"
            >
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div
                    className="text-[0.62rem] font-bold tracking-[0.16em] uppercase text-[#C9A84C]"
                  >
                    SASC Integrated Portal
                  </div>
                  <div className="text-[0.72rem] text-stone-600 dark:text-stone-300 mt-0.5">
                    Attendance, gradebooks, syllabus & notices
                  </div>
                </div>
                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-button inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3
              className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#C9A84C]"
            >
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              <li>
                <Link href="/" className="hover:text-[#C9A84C] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-[#C9A84C] transition-colors">
                  Honors & Milestones
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-[#C9A84C] transition-colors">
                  Campus Facilities
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-[#C9A84C] transition-colors">
                  Distinguished Faculty
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C9A84C] transition-colors">
                  Media & Life Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C9A84C] transition-colors">
                  Institutional Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Wings */}
          <div className="space-y-3">
            <h3
              className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#C9A84C]"
            >
              Academic Wings
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              <li>Primary & Kindergarten</li>
              <li>Middle School Explorers</li>
              <li>Higher Secondary Sciences</li>
              <li>Computer Science & AI Lab</li>
              <li>Robotics & STEM Innovations</li>
              <li>Athletics & Sports Complex</li>
            </ul>
          </div>

          {/* Connect / Admissions */}
          <div className="space-y-3">
            <h3
              className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#C9A84C]"
            >
              Admissions Desk
            </h3>
            <p className="text-[0.78rem] text-stone-600 dark:text-stone-300 leading-relaxed">
              Receive admission notifications, circular updates, and academic timetables directly.
            </p>
            <div
              className="flex items-center rounded-full p-1 mt-2 liquid-glass-container"
            >
              <input
                type="email"
                placeholder="Enter parent email..."
                className="bg-transparent px-3 py-1.5 text-xs text-[var(--foreground)] outline-none w-full placeholder:text-stone-400"
              />
              <button
                aria-label="Submit Email"
                className="p-2 rounded-full text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all shrink-0 shadow-md"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="mt-10 sm:mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs gap-3 sm:gap-4 text-center sm:text-left border-t border-[var(--liquid-glass-border)] text-stone-500 dark:text-stone-400"
        >
          <p>© {new Date().getFullYear()} The Almighty&apos;s Matriculation School. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="hover:text-[#C9A84C] cursor-pointer transition-colors">Admissions Charter</span>
            <span className="hover:text-[#C9A84C] cursor-pointer transition-colors">Student Code</span>
            <a
              href="https://sasc-f.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C9A84C] inline-flex items-center gap-1 transition-colors text-[#C9A84C] font-medium"
            >
              <span>SASC Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
