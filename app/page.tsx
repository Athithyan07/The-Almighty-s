"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLoading } from "@/components/LoadingContext";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  BookOpen,
  Award,
  Heart,
  Star,
  Zap,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
  Sliders,
  Layers,
} from "lucide-react";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import {
  LiquidGlassContainer,
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassBadge,
  LiquidGlassStat,
  LiquidGlassDock,
} from "@/components/liquid-glass";

/* --- Contact Us Widget --- */
function ContactWidget() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    grade: "KG - Primary",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setSubmitted(true);
  };

  return (
    <LiquidGlassCard
      enableTilt={false}
      className="w-full text-left rounded-3xl p-6 sm:p-10 lg:p-12 border border-amber-600/20 dark:border-amber-400/25"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full">
        {/* Left 5 cols: Contact Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div>
            <span className="luxury-overline block mb-2">Get in Touch</span>
            <h3 className="editorial-subheading mb-3 text-neutral-900 dark:text-amber-100" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}>
              Admissions Desk
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
              Our admissions team is available Monday through Saturday to answer questions about enrollment, campus visits, and academic programs.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-amber-600/20 dark:border-amber-400/20 bg-amber-500/10 dark:bg-white/5 backdrop-blur-[5px]">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-amber-100">Campus Address</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">The Almighty&apos;s School Campus, Main Road, Tamil Nadu</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-amber-600/20 dark:border-amber-400/20 bg-amber-500/10 dark:bg-white/5 backdrop-blur-[5px]">
              <Phone className="w-5 h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-amber-100">Call Admissions</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">+91 (044) 2345-6789 / +91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-amber-600/20 dark:border-amber-400/20 bg-amber-500/10 dark:bg-white/5 backdrop-blur-[5px]">
              <Mail className="w-5 h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-amber-100">Email Us</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">admissions@almightyschool.edu.in</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-amber-600/20 dark:border-amber-400/20 bg-amber-500/10 dark:bg-white/5 backdrop-blur-[5px]">
              <Clock className="w-5 h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-amber-100">Working Hours</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Mon – Sat: 8:30 AM – 5:00 PM</div>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <a
              href="https://sasc-f.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <LiquidGlassButton variant="primary" className="w-full justify-center">
                Direct SASC Portal Registration
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </LiquidGlassButton>
            </a>
          </div>
        </div>

        {/* Right 7 cols: Form */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full">
          {submitted ? (
            <div
              className="p-8 sm:p-12 rounded-2xl text-center flex flex-col items-center justify-center gap-4 bg-white/40 dark:bg-black/30 border border-amber-600/20 dark:border-amber-400/25 backdrop-blur-[5px] h-full"
            >
              <CheckCircle className="w-12 h-12 text-[#C9A84C]" />
              <h4 className="editorial-subheading text-neutral-900 dark:text-neutral-100">
                Inquiry Received!
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm max-w-[400px] leading-relaxed">
                Thank you, {formData.name}. Our admissions desk has received your details and will get in touch with you shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", contact: "", grade: "KG - Primary", message: "" }); }}
                className="minimal-btn mt-4 text-xs font-bold uppercase tracking-wider px-4 py-2"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl space-y-4 bg-white/30 dark:bg-black/25 border border-amber-600/20 dark:border-white/15 backdrop-blur-[5px] h-full flex flex-col justify-between"
            >
              <div>
                <label className="text-neutral-800 dark:text-neutral-200 text-xs font-bold tracking-wider uppercase block mb-1.5">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mr. S. Ramanathan"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all bg-white/90 dark:bg-black/50 border border-neutral-300/80 dark:border-white/20 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 text-sm focus:border-amber-500 dark:focus:border-amber-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-800 dark:text-neutral-200 text-xs font-bold tracking-wider uppercase block mb-1.5">
                    Phone or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Phone / Email ID"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all bg-white/90 dark:bg-black/50 border border-neutral-300/80 dark:border-white/20 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 text-sm focus:border-amber-500 dark:focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="text-neutral-800 dark:text-neutral-200 text-xs font-bold tracking-wider uppercase block mb-1.5">
                    Grade / Admission Class
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all cursor-pointer bg-white/90 dark:bg-black/50 border border-neutral-300/80 dark:border-white/20 text-neutral-900 dark:text-neutral-100 text-sm focus:border-amber-500 dark:focus:border-amber-400 font-medium"
                  >
                    <option value="KG - Primary" className="text-neutral-900 bg-white dark:bg-neutral-900 dark:text-neutral-100">Kindergarten & Primary (KG – Grade 5)</option>
                    <option value="Middle School" className="text-neutral-900 bg-white dark:bg-neutral-900 dark:text-neutral-100">Middle School (Grades 6 – 8)</option>
                    <option value="High School" className="text-neutral-900 bg-white dark:bg-neutral-900 dark:text-neutral-100">High School (Grades 9 & 10)</option>
                    <option value="Higher Secondary" className="text-neutral-900 bg-white dark:bg-neutral-900 dark:text-neutral-100">Higher Secondary (Grades 11 & 12)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-800 dark:text-neutral-200 text-xs font-bold tracking-wider uppercase block mb-1.5">
                  Message or Specific Inquiry
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about admission process, fees, or request a campus tour..."
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none bg-white/90 dark:bg-black/50 border border-neutral-300/80 dark:border-white/20 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 text-sm focus:border-amber-500 dark:focus:border-amber-400 font-medium"
                />
              </div>

              <LiquidGlassButton
                type="submit"
                variant="primary"
                className="w-full justify-center mt-2"
              >
                <Send className="w-3.5 h-3.5 text-[#C9A84C]" />
                Submit Admission Inquiry
              </LiquidGlassButton>
            </form>
          )}
        </div>
      </div>
    </LiquidGlassCard>
  );
}

/* --- Animated Counter --- */
function AnimatedCount({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const step = end / (1800 / 16);
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, end);
      setCount(Math.floor(cur));
      if (cur >= end) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [isInView, end]);
  return <span ref={ref}>{count >= 1000 ? count.toLocaleString() : count}{suffix}</span>;
}

/* --- Data --- */
const STATS = [
  { num: "100%", label: "Board Pass Rate", sub: "Consecutive distinction track" },
  { num: "3,200+", label: "Active Scholars", sub: "From KG through Grade 12" },
  { num: "35+", label: "Smart Classrooms", sub: "Physics, Chemistry, CS Labs" },
  { num: "25+", label: "Years of Excellence", sub: "Serving families since 2003" },
];

const PILLARS = [
  {
    num: "01",
    Icon: BookOpen,
    title: "Academic Rigor & Science",
    desc: "Robust matriculation curriculum with hands-on physics, chemistry, biology, and computer science labs that spark deep understanding and board distinction.",
    href: "/facilities",
    cta: "Explore Labs",
  },
  {
    num: "02",
    Icon: Award,
    title: "State Laurels & Olympiads",
    desc: "Top honours in state science fairs, national mathematics olympiads, debate tournaments, and inter-school athletic meets across Tamil Nadu.",
    href: "/achievements",
    cta: "View Achievements",
  },
  {
    num: "03",
    Icon: Heart,
    title: "Values & Character",
    desc: "Instilling empathy, moral courage, humility, and environmental responsibility so every child matures into a compassionate global citizen.",
    href: "/teachers",
    cta: "Meet Our Faculty",
  },
];

const FUN_FACTS = [
  { emoji: "🧪", text: "35+ science & computer labs" },
  { emoji: "🎭", text: "Annual festival with 20+ events" },
  { emoji: "🌱", text: "Eco-certified green campus" },
  { emoji: "🤖", text: "Robotics & AI innovation club" },
];

/* --- Page --- */
export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -50]);
  const { isLoaded } = useLoading();

  return (
    <motion.div
      className="w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >

      {/* ══ HERO WITH BACKGROUND CAMPUS IMAGE ══ */}
      <section
        className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-8 sm:pt-28 sm:pb-16 overflow-hidden"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/1.jpg"
          alt="The Almighty's Matriculation School Campus"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <motion.div
          style={{ y: heroY }}
          className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 text-center flex flex-col items-center justify-center"
        >
          {/* Admissions badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-7 inline-block"
          >
            <LiquidGlassBadge
              variant="gold"
              size="md"
              icon={
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]" />
                </span>
              }
            >
              Admissions Open 2026 – 2027
            </LiquidGlassBadge>
          </motion.div>

          {/* Giant editorial headline in a luxury liquid glass plaque */}
          <LiquidGlassCard
            enableTilt={true}
            className="p-5 sm:p-10 md:p-12 inline-block max-w-full rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-heading-lg"
              style={{ fontSize: "clamp(1.9rem, 6.5vw, 6rem)" }}
            >
              Shaping Futures
              <br />
              <em className="text-[#C9A84C] italic">Since 2003</em>
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="gold-line max-w-xs mx-auto my-3 sm:my-5"
            />

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="luxury-text-readable max-w-lg mx-auto font-editorial italic text-xs sm:text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200"
            >
              The Almighty&apos;s Matriculation School — where moral virtue,
              STEM excellence and world-class academics converge.
            </motion.p>
          </LiquidGlassCard>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            <a
              href="https://sasc-f.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-sasc-portal-btn"
              className="w-full sm:w-auto"
            >
              <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                Login to SASC Portal
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </LiquidGlassButton>
            </a>
            <Link href="/facilities" className="w-full sm:w-auto">
              <LiquidGlassButton variant="secondary" size="md" className="w-full sm:w-auto justify-center">
                Explore Campus
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </LiquidGlassButton>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 sm:mt-7 mx-auto w-fit max-w-full px-2"
          >
            <LiquidGlassContainer
              shape="pill"
              className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-8 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                State Board Certified
              </span>
              <span className="opacity-30 hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#C9A84C]" />
                100% Distinction Track
              </span>
              <span className="opacity-30 hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C9A84C]" />
                3,200+ Scholars
              </span>
            </LiquidGlassContainer>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ MARQUEE STRIP ══ */}
      <MarqueeStrip />

      {/* ══ STATS SECTION WITH LIQUID GLASS STATS ══ */}
      <section
        className="relative py-10 sm:py-24 px-3 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <Scroll3DReveal direction="up">
            <div className="flex items-center gap-2.5 sm:gap-4 mb-6 sm:mb-16 w-fit">
              <LiquidGlassBadge variant="gold" size="md">
                By the Numbers
              </LiquidGlassBadge>
              <div className="gold-line w-12 sm:w-24" />
            </div>
          </Scroll3DReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <Scroll3DReveal index={0} direction="up">
              <LiquidGlassStat
                value={100}
                suffix="%"
                label="Board Pass Rate"
                description="Consecutive distinction track across matriculation examinations"
                icon={<Award className="w-4 h-4" />}
              />
            </Scroll3DReveal>

            <Scroll3DReveal index={1} direction="up">
              <LiquidGlassStat
                value={3200}
                suffix="+"
                label="Active Scholars"
                description="From Kindergarten all the way through Grade 12"
                icon={<Users className="w-4 h-4" />}
              />
            </Scroll3DReveal>

            <Scroll3DReveal index={2} direction="up">
              <LiquidGlassStat
                value={35}
                suffix="+"
                label="Smart Classrooms"
                description="Modern Physics, Chemistry, Robotics and CS Labs"
                icon={<Zap className="w-4 h-4" />}
              />
            </Scroll3DReveal>

            <Scroll3DReveal index={3} direction="up">
              <LiquidGlassStat
                value={25}
                suffix="+"
                label="Years of Excellence"
                description="Serving families and fostering leadership since 2003"
                icon={<Sparkles className="w-4 h-4" />}
              />
            </Scroll3DReveal>
          </div>
        </div>
      </section>

      {/* ══ CINEMATIC IMAGE WITH LIBRARY BACKGROUND ══ */}
      <section className="relative overflow-hidden py-14 sm:py-24" style={{ minHeight: "420px" }}>
        <Image
          src="/3.webp"
          alt="Campus Life at The Almighty's Matriculation School"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="cinematic-overlay-tint absolute inset-0 transition-all duration-300" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
          <Scroll3DReveal direction="left">
            <LiquidGlassCard enableTilt={false} className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl max-w-xl border border-amber-600/20 dark:border-amber-400/25">
              <span className="luxury-overline block mb-2 sm:mb-3">Campus Life</span>
              <h2 className="editorial-heading text-neutral-900 dark:text-amber-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                Life at<br />
                <em className="text-[#C9A84C]">The Almighty&apos;s</em>
              </h2>
              <p
                className="mt-3 sm:mt-4 luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed"
              >
                A vibrant campus buzzing with energy, creativity, and discovery
                every single day — designed to inspire curiosity and nurture
                the leader within each child.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                {FUN_FACTS.map((f, i) => (
                  <LiquidGlassBadge
                    key={i}
                    variant="neutral"
                    size="sm"
                  >
                    <span>{f.emoji}</span> {f.text}
                  </LiquidGlassBadge>
                ))}
              </div>
            </LiquidGlassCard>
          </Scroll3DReveal>
        </div>
      </section>

      {/* ══ GROWTH PILLARS ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <Scroll3DReveal direction="up">
            <LiquidGlassCard enableTilt={false} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 max-w-3xl border border-amber-600/20 dark:border-amber-400/25">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <LiquidGlassBadge variant="gold" size="sm">Our Growth Pillars</LiquidGlassBadge>
                <div className="gold-line flex-1" />
              </div>
              <h2 className="editorial-heading text-neutral-900 dark:text-amber-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                Nurturing Mind,{" "}
                <em className="text-[#C9A84C]">Heart and Character</em>
              </h2>
            </LiquidGlassCard>
          </Scroll3DReveal>

          <div className="space-y-3 sm:space-y-4">
            {PILLARS.map((p, i) => (
              <Scroll3DReveal key={i} index={i} direction="up">
                <LiquidGlassCard
                  enableTilt={true}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 p-5 sm:p-8 rounded-2xl border border-amber-600/20 dark:border-amber-400/25"
                >
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <span className="counter-label shrink-0 sm:w-12 pt-0.5">{p.num}</span>
                    <div
                      className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-amber-600/30 dark:border-amber-400/35 bg-amber-500/10 dark:bg-amber-400/10"
                    >
                      <p.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A84C]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="editorial-subheading mb-2 sm:mb-3 text-neutral-900 dark:text-amber-100" style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}>
                      {p.title}
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed max-w-xl">
                      {p.desc}
                    </p>
                  </div>
                  <Link
                    href={p.href}
                    className="shrink-0 flex items-center gap-1.5 self-start sm:self-center hover:opacity-100 transition-opacity mt-2 sm:mt-0 text-[#C9A84C] font-bold uppercase text-xs tracking-wider"
                  >
                    {p.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </LiquidGlassCard>
              </Scroll3DReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENROLL AT THE ALMIGHTY'S & CONTACT US WIDGET ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-amber-600/15 dark:border-amber-400/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/5.jpg"
          alt="Admissions at The Almighty's Matriculation School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Scroll3DReveal direction="up">
            <LiquidGlassCard enableTilt={false} className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 inline-block max-w-2xl mx-auto border border-amber-600/20 dark:border-amber-400/25">
              <LiquidGlassBadge variant="gold" size="sm" className="mb-2 sm:mb-3">Admissions & Inquiries</LiquidGlassBadge>
              <h2 className="editorial-heading mb-2 sm:mb-3 text-neutral-900 dark:text-amber-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                Enroll at <em className="text-[#C9A84C]">The Almighty&apos;s</em>
              </h2>
              <div className="gold-line max-w-xs mx-auto my-3 sm:my-4" />
              <p
                className="mx-auto luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed"
              >
                Get in touch with our admissions desk or send an inquiry.
                We look forward to welcoming your child to our school family.
              </p>
            </LiquidGlassCard>
          </Scroll3DReveal>

          <Scroll3DReveal direction="up">
            <ContactWidget />
          </Scroll3DReveal>
        </div>
      </section>

    </motion.div>
  );
}
