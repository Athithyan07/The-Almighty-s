import Image from "next/image";
import { Scroll3DReveal } from "@/components/Scroll3DReveal";
import { CountUpStat } from "@/components/CountUpStat";
import {
  LiquidGlassCard,
  LiquidGlassBadge,
  LiquidGlassButton,
} from "@/components/liquid-glass";
import {
  ExternalLink,
  Target,
  CheckCircle2,
  Lightbulb,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ══ HERO WITH CAMPUS IMAGE ══ */}
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden">
        <Image
          src="/1.jpg"
          alt="School Campus Grounds"
          fill
          priority
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <Scroll3DReveal direction="up" className="max-w-4xl mx-auto">
          {/* Emblem */}
          <div className="flex justify-center mb-5 sm:mb-8">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 backdrop-blur-[5px] bg-white/40 dark:bg-black/40 border border-amber-600/30 dark:border-amber-400/35 shadow-xl">
              <Image
                src="/logo.png"
                alt="The Almighty's Matriculation School Logo"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>

          <LiquidGlassCard
            enableTilt={false}
            className="p-6 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-[5px] inline-block max-w-full"
          >
            <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
              Our Foundation & Vision
            </LiquidGlassBadge>

            <h1 className="editorial-heading-lg" style={{ fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)" }}>
              Nurturing Futures
              <br />
              <em className="text-[#C9A84C] italic">With Character & Virtue</em>
            </h1>

            <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

            <p
              className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Founded on the bedrock of moral virtue, scholastic rigor, and compassionate guidance,
              we empower every student to ignite their highest potential.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="https://sasc-f.onrender.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                  Apply via SASC Portal
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </LiquidGlassButton>
              </a>
            </div>
          </LiquidGlassCard>
        </Scroll3DReveal>
      </section>

      {/* ══ CHARTER & STATS SPLIT ══ */}
      <section
        className="relative py-14 sm:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#FAF8F5] dark:bg-[#09090d] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start relative z-10">
          {/* Left: School Charter */}
          <Scroll3DReveal direction="left" className="lg:col-span-7">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-10 rounded-3xl border border-amber-600/20 dark:border-amber-400/25"
            >
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-amber-600/30 dark:border-amber-400/35 bg-amber-500/10 dark:bg-amber-400/10"
                  >
                    <Target className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <span className="counter-label block text-[0.65rem] sm:text-[0.7rem]">Guiding Philosophy</span>
                    <h2 className="editorial-subheading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.4rem)" }}>
                      The School Charter
                    </h2>
                  </div>
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                  At The Almighty&apos;s Matriculation School, we believe education transcends rote learning.
                  Our holistic curriculum blends state board excellence with modern digital literacy,
                  scientific experimentation, creative arts, and foundational ethical values.
                </p>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  Every child is unique, endowed with inherent potential waiting to be ignited. Through our
                  dedicated faculty, modern science and computer laboratories, and sports coaching, we ensure that students
                  graduate with high self-esteem, deep intellect, and unwavering respect for fellow humanity.
                </p>

                {/* Pillars */}
                <div className="pt-5 sm:pt-6 space-y-3 sm:space-y-4 border-t border-amber-600/15 dark:border-white/15">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100 text-sm block">
                        Virtue & Integrity Above All
                      </strong>
                      <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                        Instilling truthful conduct, respect for parents and teachers, and civic responsibility.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100 text-sm block">
                        100% Board Pass Rate Culture
                      </strong>
                      <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                        Carefully tailored academic tracks ensuring mastery in Mathematics, Sciences, and Languages.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-[#C9A84C]" />
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100 text-sm block">
                        Modern Technology & Hands-on Labs
                      </strong>
                      <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                        Introducing computer programming, AI concepts, and scientific experiments from early grades.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature */}
                <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-t border-amber-600/15 dark:border-white/15">
                  <div>
                    <div className="font-editorial font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                      Management & Principal
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                      The Almighty&apos;s Matriculation School
                    </div>
                  </div>
                  <div className="font-editorial italic text-lg text-[#C9A84C] font-bold">
                    The Almighty&apos;s
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </Scroll3DReveal>

          {/* Right: Stats Grid */}
          <Scroll3DReveal direction="right" className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            <CountUpStat
              end={25}
              suffix="+"
              label="Years of Academic Tradition"
              description="Dedicated service to student empowerment with unbroken community trust."
            />
            <CountUpStat
              end={3200}
              suffix="+"
              label="Enrolled Scholars"
              description="From Kindergarten through Higher Secondary under caring personal mentorship."
            />
            <CountUpStat
              end={100}
              suffix="%"
              label="State Board Pass Rate"
              description="Centum scorers in Mathematics, Physics, Chemistry, and Computer Science."
            />
            <CountUpStat
              end={35}
              suffix="+"
              label="Modern Science & Tech Labs"
              description="Composite physics, chemistry, biology, and smart computer facilities."
            />
          </Scroll3DReveal>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#FFFFFF] dark:bg-[#111116] animated-line-pattern border-y border-amber-600/15 dark:border-amber-400/15"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <Scroll3DReveal direction="up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <LiquidGlassCard enableTilt={false} className="p-6 sm:p-8 rounded-3xl border border-amber-600/20 dark:border-amber-400/25">
              <LiquidGlassBadge variant="gold" size="sm" className="mb-2 sm:mb-3">Our Guiding Light</LiquidGlassBadge>
              <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}>
                Values That Anchor<br />
                <em className="text-[#C9A84C]">Every Student</em>
              </h2>
              <div className="gold-line max-w-xs mx-auto my-3 sm:my-4" />
            </LiquidGlassCard>
          </Scroll3DReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <Scroll3DReveal index={0} direction="up">
              <LiquidGlassCard
                enableTilt={true}
                className="p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between border border-amber-600/20 dark:border-amber-400/25"
              >
                <div>
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-amber-600/30 dark:border-amber-400/35 bg-amber-500/10 dark:bg-amber-400/10"
                  >
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="editorial-subheading mb-2 sm:mb-3 text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                    Curiosity & Diligence
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    Fostering an inquiring mind eager to discover the scientific principles and literature that shape our world.
                  </p>
                </div>
              </LiquidGlassCard>
            </Scroll3DReveal>

            <Scroll3DReveal index={1} direction="up">
              <LiquidGlassCard
                enableTilt={true}
                className="p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between border border-amber-600/20 dark:border-amber-400/25"
              >
                <div>
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-amber-600/30 dark:border-amber-400/35 bg-amber-500/10 dark:bg-amber-400/10"
                  >
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="editorial-subheading mb-2 sm:mb-3 text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                    Empathy & Social Respect
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    Treating all with dignity, caring for the environment, and helping fellow classmates thrive.
                  </p>
                </div>
              </LiquidGlassCard>
            </Scroll3DReveal>

            <Scroll3DReveal index={2} direction="up">
              <LiquidGlassCard
                enableTilt={true}
                className="p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between border border-amber-600/20 dark:border-amber-400/25"
              >
                <div>
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-amber-600/30 dark:border-amber-400/35 bg-amber-500/10 dark:bg-amber-400/10"
                  >
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="editorial-subheading mb-2 sm:mb-3 text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                    Excellence in Action
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    Encouraging students to put forward their best effort in both examinations and extracurricular sports.
                  </p>
                </div>
              </LiquidGlassCard>
            </Scroll3DReveal>
          </div>
        </div>
      </section>

      {/* ══ SASC PORTAL BANNER ══ */}
      <section
        className="relative py-14 sm:py-24 px-4 sm:px-8 lg:px-12 text-center overflow-hidden border-t border-amber-600/15 dark:border-amber-400/15"
      >
        {/* Layered Campus Photo Background - 95% Visibility */}
        <Image
          src="/6.jpeg"
          alt="Admissions at The Almighty's Matriculation School"
          fill
          className="object-cover -z-10"
          style={{ filter: "brightness(0.95) saturate(1.0)" }}
        />
        <div className="hero-overlay-tint absolute inset-0 -z-10 pointer-events-none transition-all duration-300" />

        <div className="max-w-4xl mx-auto">
          <Scroll3DReveal direction="scale">
            <LiquidGlassCard
              enableTilt={false}
              className="p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-amber-600/20 dark:border-amber-400/25 relative overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1 mb-4 sm:mb-6 border border-amber-600/30 dark:border-amber-400/35 bg-white/40 dark:bg-black/40 shadow-lg">
                  <Image
                    src="/logo.png"
                    alt="The Almighty's Matriculation School"
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <LiquidGlassBadge variant="gold" size="sm" className="mb-3 sm:mb-4">
                  Admissions Open 2026 – 2027
                </LiquidGlassBadge>
                <h2 className="editorial-heading text-neutral-900 dark:text-neutral-100" style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}>
                  Enroll at <em className="text-[#C9A84C]">The Almighty&apos;s</em>
                </h2>

                <div className="gold-line max-w-xs mx-auto my-4 sm:my-6" />

                <p
                  className="luxury-text-readable font-editorial italic text-neutral-800 dark:text-neutral-200 text-sm sm:text-base max-w-lg leading-relaxed mb-6"
                >
                  Admissions are open for Kindergarten through Grade 12.
                  Access online registration and fee portals securely through the unified SASC Portal.
                </p>

                <a
                  href="https://sasc-f.onrender.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <LiquidGlassButton variant="primary" size="md" className="w-full sm:w-auto justify-center">
                    Apply via SASC Portal
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

