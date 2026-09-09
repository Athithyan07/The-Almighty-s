"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X, Camera, MapPin, Tag } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus Life" | "Innovation Labs" | "Athletics" | "Exhibitions" | "Hackathons";
  location: string;
  date: string;
  photographer: string;
  image: string;
  aspect: "tall" | "square" | "wide";
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Science & Innovation Fair",
    category: "Innovation Labs",
    location: "Physics & CS Wing",
    date: "Spring 2026",
    photographer: "The Almighty's Media Team",
    image: "/2.webp",
    aspect: "tall",
    description: "Scholars collaborating on state science fair exhibits, software projects, and robotics setups.",
  },
  {
    id: "gal-2",
    title: "Central Library Reading Sanctuary",
    category: "Campus Life",
    location: "Main Academic Block",
    date: "Autumn 2025",
    photographer: "The Almighty's Media Team",
    image: "/3.webp",
    aspect: "wide",
    description: "Sunlight streams through expansive glass windows onto quiet study spaces and reference book stacks.",
  },
  {
    id: "gal-3",
    title: "Robotics & STEM Workshop",
    category: "Innovation Labs",
    location: "Computer Lab 1",
    date: "Summer 2025",
    photographer: "The Almighty's Media Team",
    image: "/4.webp",
    aspect: "square",
    description: "Students building and programming autonomous sensors and Scratch micro-controllers.",
  },
  {
    id: "gal-4",
    title: "Annual Sports Meet & Athletic Finals",
    category: "Athletics",
    location: "Main Sports Grounds",
    date: "Winter 2025",
    photographer: "The Almighty's Media Team",
    image: "/5.jpg",
    aspect: "tall",
    description: "Intra-school athletic competition and relay races on our multi-sport campus grounds.",
  },
  {
    id: "gal-5",
    title: "Annual Day Cultural Extravaganza",
    category: "Exhibitions",
    location: "Main Auditorium",
    date: "February 2026",
    photographer: "The Almighty's Media Team",
    image: "/6.jpeg",
    aspect: "wide",
    description: "Students performing traditional music, drama, and classical dance during the annual cultural festival.",
  },
  {
    id: "gal-6",
    title: "Campus Morning Assembly",
    category: "Campus Life",
    location: "Central Assembly Grounds",
    date: "March 2026",
    photographer: "The Almighty's Media Team",
    image: "/1.jpg",
    aspect: "square",
    description: "Students gathering for morning prayer, value talks, and student merit distribution.",
  },
];

export function GallerySpotlight() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Campus Life", "Innovation Labs", "Athletics", "Exhibitions", "Hackathons"];

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-[#00A3E0] to-[#33B8E8] text-black shadow-lg shadow-[#00A3E0]/30 scale-105"
                  : "bg-white/60 dark:bg-white/5 border border-neutral-300/80 dark:border-white/10 text-neutral-800 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-white/15 shadow-sm"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Spotlight Masonry Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]"
        onMouseLeave={() => setHoveredId(null)}
      >
        {filteredItems.map((item) => {
          const isThisHovered = hoveredId === item.id;
          const isAnyHovered = hoveredId !== null;
          const isDimmed = isAnyHovered && !isThisHovered;

          // Configure row spans based on aspect
          const rowSpanClass =
            item.aspect === "tall"
              ? "row-span-2"
              : item.aspect === "wide"
              ? "row-span-1"
              : "row-span-1";

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() => setActiveModalItem(item)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 dark:border-white/15 cursor-pointer transition-all duration-500 shadow-lg ${rowSpanClass} ${
                isThisHovered
                  ? "scale-[1.02] sm:scale-[1.03] z-20 shadow-2xl shadow-[#00A3E0]/30 border-[#00A3E0]"
                  : isDimmed
                  ? "opacity-40 scale-[0.98] filter blur-[0.5px]"
                  : "opacity-100 scale-100"
              }`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Liquid Glass Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Top Glass Category Tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/30 dark:bg-black/40 backdrop-blur-[5px] text-white dark:text-sky-200 border border-white/40 dark:border-white/20 shadow-sm flex items-center gap-1 sm:gap-1.5">
                  <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00A3E0]" />
                  {item.category}
                </span>
              </div>

              {/* Top Right Maximize Icon */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-xl bg-white/30 dark:bg-black/40 backdrop-blur-[5px] text-white dark:text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30 dark:border-white/15">
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Bottom Liquid Glass Card Details */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent backdrop-blur-[5px] transition-transform duration-300">
                <h4 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-[#00A3E0] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-neutral-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00A3E0]" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-[5px] animate-in fade-in duration-300"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/40 dark:border-white/20 bg-black/80 backdrop-blur-[5px] shadow-2xl p-4 sm:p-8 max-h-[92vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close Lightbox"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="relative w-full h-[240px] sm:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b border-sky-500/25 dark:border-white/15 pb-3 sm:pb-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
                  {activeModalItem.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-heading text-white mt-0.5">
                  {activeModalItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-stone-300 dark:text-neutral-300">
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3E0]" />
                <span>Captured by {activeModalItem.photographer}</span>
              </div>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-stone-200 dark:text-neutral-300 leading-relaxed">
              {activeModalItem.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
