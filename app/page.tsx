"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useInView, useAnimation } from "framer-motion";
import {
  Droplets,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ─────────────────────────── Animation Variants ─────────────────────────── */
const sectionVariants: any = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const fadeInItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ─────────────────────────── AnimatedCounter ─────────────────────────── */
function AnimatedCounter({ value, suffix = "", className = "", style = {} }: { value: number; suffix?: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {count === value ? value : count}{suffix}
    </span>
  );
}


/* ─────────────────────────── Section wrapper ─────────────────────────── */
type SectionProps = { id?: string; className?: string; children: React.ReactNode };
function Section({ id, className, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8 ${className ?? ""}`}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────── TiltCard component ─────────────────────────── */
type TiltCardProps = {
  children: React.ReactNode;
  glowColor: string;   // rgba — used for shimmer bar + inner glow
  borderGlow: string;  // rgba — used for box-shadow border glow
  bg: string;          // rgba — subtle card background tint
  style?: React.CSSProperties;
  className?: string;
};

function TiltCard({ children, glowColor, borderGlow, bg, style, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 35 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 35 });

  // Shimmer highlight follows cursor
  const shimmerX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const shimmerY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={fadeInItem}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: bg,
        boxShadow: `0 0 0 1px ${borderGlow}, 0 8px 32px rgba(0,0,0,0.5), 0 0 40px -8px ${glowColor}`,
        ...style,
      }}
      className={`relative overflow-hidden rounded-3xl p-6 select-none cursor-default ${className ?? ""}`}
    >
      {/* Persistent top shimmer bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${borderGlow} 40%, ${glowColor} 60%, transparent 100%)`,
          opacity: 0.9,
        }}
      />

      {/* Cursor-following inner highlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${shimmerX}% ${shimmerY}%, ${glowColor} 0%, transparent 65%)`,
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────── NavBar ─────────────────────────── */
function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/70 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
          <div className="relative h-9 w-36 sm:h-10 sm:w-48">
            <Image
              src="/images/logo_finally_pyrogel-removebg-preview.png"
              alt="PyroGel logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.45)] scale-200 sm:scale-215"
              priority
            />
          </div>
        </motion.a>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-slate-200 md:flex">
          <motion.a href="#science" whileHover={{ y: -1 }} className="transition hover:text-emerald-300">
            Our Science
          </motion.a>
          <motion.a href="#roi" whileHover={{ y: -1 }} className="transition hover:text-emerald-300">
            Impact
          </motion.a>
          <motion.a href="#traction" whileHover={{ y: -1 }} className="transition hover:text-emerald-300">
            Traction
          </motion.a>
          <motion.a href="#team" whileHover={{ y: -1 }} className="transition hover:text-emerald-300">
            Team
          </motion.a>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.5)] transition hover:bg-emerald-400"
        >
          Partner with Us
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────── HeroSection ─────────────────────────── */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-slate-50">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video className="h-full w-full object-cover opacity-50" autoPlay muted loop playsInline preload="none">
          <source src="/videos/background_video (1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950" />
        <div className="pointer-events-none absolute -left-32 top-40 z-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-[-6rem] top-10 z-10 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-8 text-center">
          <motion.div variants={fadeInItem} className="max-w-4xl space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Engineering{" "}
              <span className="block text-4xl font-semibold italic text-emerald-200 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
                the future of wildfire defense.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-200 sm:text-lg">
              An advanced, bio-based hydrogel engineered to defend natural capital and industry from mega-fires.
              100% eco-friendly, designed to work with ecosystems instead of against them.
            </p>
          </motion.div>

          <motion.div variants={fadeInItem} className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#science"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition hover:bg-emerald-400"
              >
                Explore the Science
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <a
                href="#roi"
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/50 bg-slate-900/40 px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-100 backdrop-blur-md transition hover:border-emerald-400/70 hover:text-emerald-200"
              >
                View Impact
                <TrendingUp className="h-4 w-4" />
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Physical Laboratory Prototyping (TRL 3) — Moving to performance evaluation
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ProblemSection ─────────────────────────── */
function ProblemSection() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden flex items-center justify-center py-24">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video className="h-full w-full object-cover opacity-40" autoPlay muted loop playsInline preload="none">
          <source src="/videos/wildfire_video (1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <Section id="problem" className="relative z-10 bg-transparent">
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeInItem} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-400">The Problem</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wildfires are outpacing our current tools.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              We are fighting tomorrow&apos;s mega-fires with yesterday&apos;s tools. The current system is purely
              reactive and extremely costly: water evaporates rapidly under extreme heat, constant aerial
              re-applications drain public budgets, and firefighters operate under dangerous thermal exposure.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-x-12 gap-y-10 sm:grid-cols-2 md:max-w-3xl md:mx-auto"
          >
            {/* Stat 1 — no box */}
            <motion.div variants={fadeInItem} className="flex flex-col items-center gap-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400/80">
                Annual Losses
              </p>
              <p
                className="text-[5.5rem] font-black italic leading-none text-orange-400 sm:text-[7rem]"
                style={{
                  fontStretch: "condensed",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 60px rgba(251,146,60,0.4), 0 0 120px rgba(251,146,60,0.15)",
                  letterSpacing: "-0.05em",
                  transform: "scaleX(0.72)",
                  transformOrigin: "center",
                  display: "inline-block",
                }}
              >
                $<AnimatedCounter value={50} suffix="B" className="" style={{}} />
              </p>
              <div className="h-px w-10 bg-orange-500/50" />
              <p className="text-sm text-slate-300 max-w-[22ch] leading-relaxed">
                In annual economic and environmental losses across Latin America.
              </p>
            </motion.div>

            {/* Stat 2 — no box */}
            <motion.div variants={fadeInItem} className="flex flex-col items-center gap-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400/80">
                Firing Line Failure
              </p>
              <p
                className="text-[5.5rem] font-black italic leading-none text-orange-400 sm:text-[7rem]"
                style={{
                  fontStretch: "condensed",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 60px rgba(251,146,60,0.4), 0 0 120px rgba(251,146,60,0.15)",
                  letterSpacing: "-0.05em",
                  transform: "scaleX(0.72)",
                  transformOrigin: "center",
                  display: "inline-block",
                }}
              >
                <AnimatedCounter value={67} suffix="%" className="" style={{}} />
              </p>
              <div className="h-px w-10 bg-orange-500/50" />
              <p className="text-sm text-slate-300 max-w-[22ch] leading-relaxed">
                Of conventional firing lines fail under extreme wind, fuel load, or topography, leaving critical assets exposed.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </section>
  );
}

/* ─────────────────────────── ScienceSection ─────────────────────────── */
function ScienceSection() {
  const phases = [
    {
      id: 1,
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M6.5 6.5l11 11M6.5 17.5l11-11" />
          <path d="M12 7l-1.5-1.5M12 7l1.5-1.5M7 12l-1.5-1.5M7 12l-1.5 1.5M12 17l-1.5 1.5M12 17l1.5 1.5M17 12l1.5-1.5M17 12l1.5 1.5" strokeWidth="1.5" />
        </svg>
      ),
      label: "IMMEDIATE COOLING",
      shortDesc: "Retains 5x more water, lowering surface temperature before the fire arrives.",
      tooltip: "Massive water retention capacity gradually drops surface temperature, holding moisture in place where traditional water-based approaches evaporate within minutes.",
      color: "from-emerald-500/20 to-teal-500/15",
      border: "border-emerald-500/35",
      glow: "rgba(16,185,129,0.35)",
    },
    {
      id: 2,
      icon: <Shield className="h-8 w-8" />,
      label: "THERMAL BARRIER",
      shortDesc: "Forms a silica shield that stops heat transfer and delays ignition.",
      tooltip: "Advanced nanocomposite architecture designed to reflect radiant heat and decouple conductive transfer, shielding the fuel surface during high-flux thermal events.",
      color: "from-emerald-500/20 to-teal-500/15",
      border: "border-emerald-500/35",
      glow: "rgba(16,185,129,0.35)",
    },
    {
      id: 3,
      icon: <Layers className="h-8 w-8" />,
      label: "INTUMESCENCE",
      shortDesc: "Expands under direct fire, creating an insulating crust that stops the fire's advance.",
      tooltip: "Dynamic thermo-responsive expansion creates a dense, carbonaceous insulating layer, effectively severing the oxygen supply to the combustion zone.",
      color: "from-emerald-500/20 to-teal-500/15",
      border: "border-emerald-500/35",
      glow: "rgba(16,185,129,0.35)",
    },
  ];

  return (
    <section id="science" className="relative min-h-[680px] w-full overflow-hidden py-24 flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video className="h-full w-full object-cover opacity-40" autoPlay muted loop playsInline preload="none">
          <source src="/videos/lab_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: title + description */}
          <motion.div variants={fadeInItem} className="space-y-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">The Science</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A new hydrogel architecture for wildfire defense.
            </h2>
            <p className="text-sm text-slate-300 sm:text-base leading-relaxed">
              PyroGel is a bio-polymeric hydrogel engineered around three synergistic mechanisms.
              Together, they shift firefighting from reactive suppression to proactive protection,
              working before, during, and against direct fire contact.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Three-phase defense</span>
              <div className="h-px flex-1 bg-gradient-to-l from-emerald-500/50 to-transparent" />
            </div>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 pt-4">
              {[1, 2, 3].map((phase) => (
                <div key={phase} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500/40" />
                    <span className="text-[10px] font-medium text-slate-500">Phase {phase}</span>
                  </div>
                  {phase < 3 && <div className="h-px w-4 bg-emerald-500/30" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3-phase diagram */}
          <motion.div variants={staggerContainer} className="space-y-4">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                variants={fadeInItem}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-r ${phase.color} ${phase.border} p-5 transition-all duration-300 hover:scale-[1.02] cursor-default`}
                style={{ boxShadow: `0 4px 30px ${phase.glow}` }}
              >
                {/* Phase number connector line */}
                {i < phases.length - 1 && (
                  <div className="absolute -bottom-4 left-9 z-20 h-4 w-px bg-gradient-to-b from-slate-600 to-transparent" />
                )}
                <div className="flex items-start gap-4">
                  {/* Icon directly - no box */}
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0 text-emerald-300">
                    {phase.icon}
                    <span className="text-[10px] font-bold text-slate-500">0{phase.id}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 space-y-1 min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">{phase.label}</h3>
                    <p className="text-sm text-slate-300 group-hover:hidden transition-all">{phase.shortDesc}</p>
                    <p className="hidden text-sm text-slate-200 group-hover:block transition-all leading-relaxed">{phase.tooltip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Operational Impact Section ─────────────────── */
const roiMetrics = [
  {
    value: "5x",
    label: "Water Retention",
    description:
      "Hydrogel formulation retains moisture 5 times longer than traditional methods, drastically reducing evaporation before the fire arrives.",
    glow: "rgba(16,185,129,0.28)",
    borderGlow: "rgba(16,185,129,0.60)",
    bg: "rgba(16,185,129,0.06)",
    valueColor: "#6ee7b7",
  },
  {
    value: "65%",
    label: "Cost Reduction",
    description:
      "Projected decrease in logistical firefighting costs per incident by minimizing aerial re-applications and extending operational windows.",
    glow: "rgba(16,185,129,0.22)",
    borderGlow: "rgba(16,185,129,0.50)",
    bg: "rgba(16,185,129,0.05)",
    valueColor: "#6ee7b7",
  },
  {
    value: "250x",
    label: "Asset Protection",
    description:
      "A $4,000 preventive deployment is modeled to protect $1,000,000 in critical infrastructure and community perimeters.",
    glow: "rgba(16,185,129,0.18)",
    borderGlow: "rgba(16,185,129,0.42)",
    bg: "rgba(16,185,129,0.04)",
    valueColor: "#6ee7b7",
  },
];

function ROISection() {
  return (
    <section id="roi" className="relative min-h-[600px] w-full overflow-hidden py-24 flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video className="h-full w-full object-cover opacity-40" autoPlay muted loop playsInline preload="none">
          <source src="/videos/asset-protection.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div variants={fadeInItem} className="text-center space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Operational Impact</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Operational Impact &amp; Economics
            </h2>
            <p className="mx-auto max-w-xl text-sm font-medium text-emerald-300/80">
              Preventive containment without new capital expenditure.
            </p>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              While our core bio-polymeric formulation is currently undergoing physical laboratory prototyping
              (TRL 3), PyroGel is designed to deliver massive systemic efficiency. It integrates directly into
              the equipment municipalities already own, shifting wildfire management from reactive suppression
              to proactive defense.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
            {roiMetrics.map((m) => (
              <TiltCard
                key={m.label}
                glowColor={m.glow}
                borderGlow={m.borderGlow}
                bg={m.bg}
                className="flex flex-col text-center select-none cursor-default"
              >
                <p
                  className="text-5xl font-black leading-none tracking-tight sm:text-6xl"
                  style={{
                    color: m.valueColor,
                    textShadow: `0 0 40px ${m.glow}`,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </p>
                <div className="h-px w-8 mx-auto" style={{ background: m.borderGlow }} />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200">
                  {m.label}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.description}
                </p>
              </TiltCard>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInItem}
            className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row"
          >
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-semibold text-slate-100">Current Stage: TRL 3 (Laboratory Prototyping)</p>
              <p>Transitioning to physical performance evaluation and field-aligned testing.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <Zap className="h-3.5 w-3.5" />
              Projected Impact · Pre-field validation
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTABanner ─────────────────────────── */
function CTABanner() {
  return (
    <section className="relative w-full overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
      >
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-950/80 to-slate-950/80 p-10 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to protect your infrastructure?
            </h3>
            <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
              Join municipalities, utilities, and industrial operators building resilience against mega-fires.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.4)] transition hover:bg-emerald-400"
              >
                Schedule a Demo
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <a
                href="#traction"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
              >
                View our traction
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── TractionSection ─────────────────────────── */
function TractionSection() {
  return (
    <section id="traction" className="relative min-h-[600px] w-full overflow-hidden py-24 flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video className="h-full w-full object-cover opacity-40" autoPlay muted loop playsInline preload="none">
          <source src="/videos/network.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          <motion.div variants={fadeInItem} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Traction &amp; Roadmap</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Supported by global institutions to reach TRL 4.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              PyroGel is building scientific traction with partners who understand the urgency of resilient wildfire infrastructure.
            </p>
          </motion.div>

          {/* Two-column layout: Funding left, Logos right */}
          <motion.div variants={fadeInItem} className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: Funding highlight */}
            <div className="text-center space-y-4 py-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-emerald-500/40" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400">Seed Funding Secured</p>
                <div className="h-px w-12 bg-emerald-500/40" />
              </div>
              <p className="text-6xl font-bold text-emerald-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">€6,875</p>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                From <span className="font-semibold text-slate-100">CAINCO &amp; the European Union</span> to execute
                our physical prototyping phase, transitioning from TRL 2 to TRL 3.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  MIT Climate &amp; Energy Prize — Global Semifinalists
                </span>
                <span className="rounded-full bg-slate-800/60 border border-slate-700/50 px-3 py-1 text-[11px] font-medium text-slate-300">
                  TRL 2 → TRL 3 Roadmap
                </span>
              </div>
            </div>

            {/* Right: Institutional Partners */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400 text-center">Institutional Partners</p>
              {/* Top tier — 3 larger logos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <motion.div whileHover={{ scale: 1.05 }} className="group relative mx-auto h-16 w-40 sm:h-18 sm:w-44">
                  <Image src="/images/mit_logo.png" alt="MIT logo" fill className="object-contain" />
                  <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                    MIT Climate Prize Semifinalists
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="group relative mx-auto h-16 w-40 sm:h-18 sm:w-44">
                  <Image src="/images/cainco.png" alt="CAINCO logo" fill className="object-contain" />
                  <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                    Seed Funding Partner
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="group relative mx-auto h-16 w-40 sm:h-18 sm:w-44">
                  <Image src="/images/INNOVA.png" alt="INNOVA logo" fill className="object-contain" />
                  <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-3 py-1.5 text-xs text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                    INNOVA Santa Cruz Program
                  </div>
                </motion.div>
              </div>
              {/* Supporting partners — 5 smaller */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {[
                  { src: "/images/startFellowship_logoo.png", alt: "START Fellowship logo", scale: "", tooltip: "START Fellowship Program" },
                  { src: "/images/tks_logits.png", alt: "TKS logo", scale: "scale-125", tooltip: "The Knowledge Society" },
                  { src: "/images/global_gatewayy.png", alt: "Global Gateway logo", scale: "scale-125", tooltip: "Global Gateway Initiative" },
                  { src: "/images/climateKIC.png", alt: "Climate KIC logo", scale: "scale-110", tooltip: "EIT Climate-KIC" },
                  { src: "/images/upb_logoo.png", alt: "UPB logo", scale: "scale-160", tooltip: "Universidad Privada Boliviana" },
                ].map((logo) => (
                  <motion.div
                    key={logo.alt}
                    whileHover={{ scale: 1.08 }}
                    className="group relative mx-auto h-12 w-32"
                  >
                    <Image src={logo.src} alt={logo.alt} fill className={`object-contain ${logo.scale}`} />
                    <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-[10px] text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                      {logo.tooltip}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TeamSection ─────────────────────────── */
function TeamSection() {
  return (
    <Section id="team" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <motion.div variants={staggerContainer} className="space-y-8">
        <motion.div variants={fadeInItem} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">The Team</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            A Team Built for Harsh Conditions
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2">
          {/* Sofia */}
          <motion.div
            variants={fadeInItem}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition-all hover:border-emerald-400/60 hover:shadow-[0_0_70px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            {/* Dot pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-emerald-400/70 bg-slate-900 transition-transform group-hover:scale-110">
                    <Image src="/images/sofiapyrogel.jpg" alt="Sofia Mendez Roca" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">Sofia Mendez Roca</p>
                    <p className="text-[11px] font-medium text-emerald-300">CEO &amp; Head of Innovation</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Leads R&amp;D strategy, commercialization, and partnerships. Drives the go-to-market execution for utilities, municipalities, and industrial operators navigating escalating wildfire risk.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image src="/images/qr-sofia-actualizado.png" alt="QR code for Sofia's LinkedIn" fill className="object-contain p-1.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Uziel */}
          <motion.div
            variants={fadeInItem}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition-all hover:border-emerald-400/60 hover:shadow-[0_0_70px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            {/* Dot pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-emerald-400/70 bg-slate-900 transition-transform group-hover:scale-110">
                    <Image src="/images/uzielpyrogel.jpg" alt="Uziel Fassi" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">Uziel Fassi</p>
                    <p className="text-[11px] font-medium text-emerald-300">COO · Computer Science &amp; Operations</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Oversees PyroGel&apos;s core operations, financial strategy, and computational modeling. Ensures seamless execution across business workflows, resource allocation, and technical milestones.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image src="/images/qr-uziel-actualizado.png" alt="QR code for Uziel's LinkedIn" fill className="object-contain p-1.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Angélica Bejarano */}
          <motion.div
            variants={fadeInItem}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition-all hover:border-emerald-400/60 hover:shadow-[0_0_70px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            {/* Dot pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-emerald-400/70 bg-slate-900 transition-transform group-hover:scale-110">
                    <Image src="/images/angelica-pyrogel.jpeg" alt="Angélica Bejarano" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">Angélica Bejarano</p>
                    <p className="text-[11px] font-medium text-emerald-300">Laboratory Researcher · BSc Biotechnology Engineering</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Leads the physical execution of experiments and the translation of technical research into scalable lab protocols. Manages daily laboratory operations, testing procedures, and data collection.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image src="/images/qr-angelica-pyrogel.png" alt="QR code for Angélica's LinkedIn" fill className="object-contain p-1.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Luis Adolfo Mercado Roca */}
          <motion.div
            variants={fadeInItem}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition-all hover:border-emerald-400/60 hover:shadow-[0_0_70px_rgba(16,185,129,0.3)] overflow-hidden"
          >
            {/* Dot pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-emerald-400/70 bg-slate-900 transition-transform group-hover:scale-110">
                    <Image src="/images/dr-mercado-pyrogel.jpeg" alt="Luis Adolfo Mercado Roca, PhD" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">Luis Adolfo Mercado Roca, PhD</p>
                    <p className="text-[11px] font-medium text-emerald-300">Scientific Advisor · PhD in Chemistry</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Facilitates institutional partnerships and critical laboratory access. Provides expert guidance on formulation ideation and the strategic planning required to transition chemical architectures from theory into physical reality.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image src="/images/qr-dr-mercado.png" alt="QR code for Dr. Mercado's LinkedIn" fill className="object-contain p-1.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ─────────────────────────── ContactSection ─────────────────────────── */
function ContactSection() {
  const [formData, setFormData] = React.useState({ name: "", email: "", inquiryType: "", message: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_KEY;
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", inquiryType: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="contact" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-28">
      <motion.div variants={staggerContainer} className="space-y-10">
        <motion.div variants={fadeInItem} className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Join the Waitlist</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s protect our natural capital.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            We&apos;re looking to collaborate with investors, utilities, industrial partners, and research
            institutions aligned with science-driven wildfire resilience.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInItem}
          className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_24px_80px_rgba(15,23,42,0.9)] sm:p-8"
        >
          {isSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              <p className="font-semibold">Message sent successfully.</p>
              <p className="mt-1 text-xs">We&apos;ve received your message. We&apos;ll get back to you soon.</p>
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
              <p className="font-semibold">Error</p>
              <p className="mt-1 text-xs">{error}</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-slate-200">Name</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-slate-200">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="you@organization.com" />
              </div>
            </div>
            <div>
              <label htmlFor="inquiryType" className="text-xs font-medium text-slate-200">Inquiry Type</label>
              <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange} required
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30">
                <option value="">Select an option</option>
                <option value="investment">Investment / Capital</option>
                <option value="utility">Utility / Grid Operator</option>
                <option value="industrial">Industrial / Infrastructure</option>
                <option value="research">Research Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-medium text-slate-200">Message</label>
              <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                placeholder="Share context, timelines, and how you'd like to collaborate." />
            </div>
            <button type="submit" disabled={isLoading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(16,185,129,0.5)] transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? "Sending..." : "Send Message"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="mt-3 text-[11px] text-slate-400">
              This form is for initial contact only. We&apos;ll follow up with structured technical and investment materials.
            </p>
          </form>
        </motion.div>

        <footer className="mt-6 border-t border-slate-800 pt-5 text-[11px] text-slate-500">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} PyroGel. All rights reserved.</p>
            <p className="max-w-md text-center sm:text-right">
              All impact projections represent modeled estimates at TRL 3 and have not been validated through physical field trials.
            </p>
          </div>
        </footer>
      </motion.div>
    </Section>
  );
}

/* ─────────────────────────── Root Page ─────────────────────────── */
export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <NavBar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ScienceSection />
        <ROISection />
        <CTABanner />
        <TractionSection />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
}
