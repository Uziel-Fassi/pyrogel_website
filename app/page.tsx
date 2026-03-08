"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Droplets,
  Shield,
  Layers,
  Flame,
  LineChart,
  ArrowRight,
  Mail,
  Users,
} from "lucide-react";

const sectionVariants: any = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

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

function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/70 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <motion.a href="#" whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
          <div className="relative h-9 w-36 sm:h-10 sm:w-48">
            <Image
              src="/images/logoPyrogelFInal.png"
              alt="PyroGel logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.45)] scale-200 sm:scale-215"
              priority
            />
          </div>
        </motion.a>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-slate-200 md:flex">
          <motion.a
            href="#science"
            whileHover={{ y: -1, color: "#fca030" }}
            className="transition hover:text-orange-300"
          >
            Our Science
          </motion.a>
          <motion.a
            href="#validation"
            whileHover={{ y: -1, color: "#fca030" }}
            className="transition hover:text-orange-300"
          >
            FDS Validation
          </motion.a>
          <motion.a
            href="#impact"
            whileHover={{ y: -1, color: "#fca030" }}
            className="transition hover:text-orange-300"
          >
            Impact
          </motion.a>
          <motion.a
            href="#team"
            whileHover={{ y: -1, color: "#fca030" }}
            className="transition hover:text-orange-300"
          >
            Team
          </motion.a>
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_40px_rgba(249,115,22,0.6)] transition hover:bg-orange-300"
        >
          Partner with Us
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-slate-50">
      {/* Fondo Hero */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video
          className="h-full w-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/background_video (1).mp4" type="video/mp4" />
        </video>

        {/* Overlays (Gradientes y Luces) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950" />
        <div className="pointer-events-none absolute -left-32 top-40 z-10 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-[-6rem] top-10 z-10 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      {/* 2. Contenido Principal*/}
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 text-center"
        >
          <motion.div variants={fadeInItem} className="max-w-4xl space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Engineering{" "}
              <span className="block text-4xl font-semibold italic text-orange-100 sm:text-6xl md:text-7xl" style={{fontFamily: 'var(--font-playfair)'}}>
                the future of wildfire defense.
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-balance text-sm text-slate-200 sm:text-lg">
              An advanced, bio-based hydrogel engineered to defend natural
              capital and industry from mega-fires. 100% eco-friendly, designed
              to work with ecosystems instead of against them.
            </p>
          </motion.div>

          <motion.div variants={fadeInItem} className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#science"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_30px_rgba(249,115,22,0.4)] transition hover:bg-orange-300"
              >
                Explore the Science
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <a
                href="#validation"
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/50 bg-slate-900/40 px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-100 backdrop-blur-md transition hover:border-orange-300/70 hover:text-orange-200"
              >
                View FDS Simulations
                <LineChart className="h-4 w-4" />
              </a>
            </div>
            
            <p className="text-[10px] uppercase tracking-widest text-slate-400">
              Computational Validation (TRL 2/3) • Moving to physical prototyping
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
<section className="relative min-h-[600px] w-full overflow-hidden flex items-center justify-center py-24">
  {/* Video */}
  <div className="absolute inset-0 z-0 bg-slate-950">
    <video
      className="h-full w-full object-cover opacity-40"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/videos/wildfire_video (1).mp4" type="video/mp4" />
    </video>
    {/* Overlay para legibilidad */}
    <div className="absolute inset-0 z-10 bg-slate-950/60" />
  </div>

      <Section
        id="impact"
        className="relative z-10 bg-transparent"
      >
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeInItem} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
              The Problem
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wildfires are outpacing our current tools.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              We are fighting tomorrow&apos;s mega-fires with yesterday&apos;s
              tools. Legacy chemicals are toxic to our ecosystems, and water
              evaporates in minutes. Fire lines fail when ecosystems can least
              afford it.
            </p>
            <p className="mx-auto max-w-xl text-xs text-slate-400 sm:text-sm">
              PyroGel is designed as a systems-level material upgrade for
              firefighters, utilities, forestry managers, and industrial
              operators.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 md:max-w-3xl md:mx-auto"
        >
          <motion.div
            variants={fadeInItem}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950/95 shadow-[0_22px_70px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-400/80 hover:shadow-[0_0_70px_rgba(249,115,22,0.8)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-orange-500/18 via-transparent to-transparent blur-2xl" />
            <div className="relative z-10 space-y-2 p-6 text-center transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
                Annual Losses
              </p>
              <p className="text-4xl font-semibold text-slate-50 sm:text-5xl">
                $250B
              </p>
              <p className="text-xs font-medium text-slate-300">
                Annual wildfire-related economic losses.
              </p>
            </div>
            <p className="pointer-events-none absolute inset-x-6 inset-y-6 flex items-center text-center text-sm text-slate-200 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              In economic value wiped out in the US in a single year — a growing
              macro risk as climate extremes intensify.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInItem}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-orange-500/10 via-slate-900/95 to-slate-950/95 shadow-[0_22px_70px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-400/80 hover:shadow-[0_0_70px_rgba(249,115,22,0.85)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-orange-400/22 via-transparent to-transparent blur-2xl" />
            <div className="relative z-10 space-y-2 p-6 text-center transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
                Firing Line Failure
              </p>
              <p className="text-4xl font-semibold text-slate-50 sm:text-5xl">
                67%
              </p>
              <p className="text-xs font-medium text-slate-300">
                Conventional firing lines that fail.
              </p>
            </div>
            <p className="pointer-events-none absolute inset-x-6 inset-y-6 flex items-center text-center text-sm text-slate-200 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Of traditional firing lines fail under extreme wind, fuel load, or
              topography — leaving critical assets exposed.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      </Section>
    </section>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeInItem}
      className="group relative flex flex-row items-center gap-5 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-300/80 hover:shadow-[0_0_60px_rgba(249,115,22,0.8)]"
    >
      <div className="relative z-10 flex flex-shrink-0 transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-300 shadow-[0_0_35px_rgba(249,115,22,0.7)]" style={{ fontSize: "2.5rem" }}>
          {icon}
        </div>
      </div>
      <div className="relative z-10 flex flex-1 flex-col justify-center transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
        <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
          {title}
        </h3>
      </div>
      <p className="pointer-events-none absolute inset-x-6 inset-y-6 flex items-center text-center text-sm text-slate-200 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {description}
      </p>
    </motion.div>
  );
}

function ScienceSection() {
  return (
    <section id="science" className="relative min-h-[600px] w-full overflow-hidden py-24 flex items-center justify-center">
      {/*Lab vidéo de fondo */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/lab_vid.mp4" type="video/mp4" />
        </video>
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeInItem} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
              The Science
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A new hydrogel architecture for wildfire defense.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
             PyroGel is a conceptual breakthrough in chemical architecture,
            combining advanced biopolymers with earth-abundant minerals. The result
            is a proprietary, bio-based hydrogel that cools, insulates, and physically
            isolates fuel from ignition sources.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            <FeatureCard
              icon={<Droplets className="h-5 w-5" />}
              title="Cooling"
              description="Massive water retention capacity gradually drops surface temperature, holding moisture in place where traditional water-based approaches evaporate within minutes."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Thermal Barrier"
              description="Advanced nanocomposite architecture designed to reflect radiant heat and decouple conductive transfer, shielding the fuel's surface during high-flux thermal events."
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="Intumescence"
              description="Dynamic thermo-responsive expansion that creates a dense, carbonaceous insulating layer, effectively severing the oxygen supply to the combustion zone."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PerformanceSection() {
  const metrics = [
    {
      value: "+335%",
      title: "Ignition Delay",
      description: "Time to ignition vs. untreated substrate.",
    },
    {
      value: "75%",
      title: "Reduction in Heat Transfer",
      description: "Lower heat flux reaching underlying fuel.",
    },
    {
      value: "2 mm",
      title: "Layer Thickness",
      description: "Massive modeled protection with minimal applied layer.",
    },
    {
      value: "5×",
      title: "Water Efficiency Multiplier",
      description: "More protection per liter of water deployed.",
    },
  ];

  return (
    <section id="validation" className="relative min-h-[600px] w-full overflow-hidden py-24 flex items-center justify-center">
      {/* Tech video de fondo */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/tech.webm" type="video/webm" />
        </video>
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          className="space-y-10 rounded-[32px] border border-slate-800 bg-slate-950/80 px-6 py-10 shadow-[0_30px_100px_rgba(15,23,42,0.9)] sm:px-10 sm:py-14"
        >
          <motion.div variants={fadeInItem} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
              Computational Validation
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Computational Validation (FDS Modeling)
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              All performance metrics shown here are derived from Fire Dynamics
              Simulator (FDS) simulations, representing{" "}
              <span className="font-semibold text-slate-50">
                Computational Validation at TRL 2/3
              </span>{" "}
              rather than physical field trials.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-5 md:grid-cols-4"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.title}
                variants={fadeInItem}
                className="group relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-orange-500/15 via-slate-900/95 to-slate-950/95 shadow-[0_22px_70px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-400/80 hover:shadow-[0_0_70px_rgba(249,115,22,0.85)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-orange-400/24 via-transparent to-transparent blur-2xl" />
                <div className="relative z-10 space-y-3 p-5 text-center transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                  <p className="text-5xl font-semibold text-slate-50 sm:text-6xl">
                    {metric.value}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
                    {metric.title}
                  </p>
                </div>
                <p className="pointer-events-none absolute inset-x-5 inset-y-5 flex items-center text-center text-sm text-slate-200 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInItem}
            className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row"
          >
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-semibold text-slate-100">
                Current Stage: TRL 2/3
              </p>
              <p>
                Transitioning from computational design and validation to physical
                prototyping and TRL 4 field-aligned experiments.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
              <LineChart className="h-3.5 w-3.5" />
              FDS Simulations · Pre-prototype
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TractionSection() {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden py-24 flex items-center justify-center">
      {/*Network vidéo de fondo */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/network.mp4" type="video/mp4" />
        </video>
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 z-10 bg-slate-950/60" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeInItem} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Traction &amp; Roadmap
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Supported by global institutions to reach TRL 4.
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
              PyroGel is building scientific traction with partners who understand
              the urgency of resilient wildfire infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div
              variants={fadeInItem}
              className="space-y-5 rounded-3xl border border-orange-400/40 bg-orange-500/10 p-6 text-left shadow-[0_24px_80px_rgba(249,115,22,0.5)]"
            >
              <ul className="list-disc space-y-3 pl-5">
                <li className="text-sm text-orange-50">
                  <span className="font-semibold">€5,500 in seed funding</span>{" "}
                  from CAINCO &amp; the European Union to execute our physical
                  prototyping phase,{" "}
                  <span className="font-semibold">
                    transitioning from TRL 2/3 to TRL 4
                  </span>
                  .
                </li>
                <li className="text-sm text-orange-50">
                  Recognition as{" "}
                  <span className="font-semibold">
                    MIT Climate &amp; Energy Prize Global Semifinalists
                  </span>{" "}
                  underscores the global relevance of resilient, bio-based wildfire
                  defense.
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInItem}
              className="space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Institutional Partners
              </p>
              <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/mit_logo.png"
                    alt="MIT logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/startFellowship_logoo.png"
                    alt="START Fellowship logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/tks_logits.png"
                    alt="TKS logo"
                    fill
                    className="object-contain scale-135 sm:scale-150"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/INNOVA.png"
                    alt="INNOVA logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/global_gatewayy.png"
                    alt="Global Gateway logo"
                    fill
                    className="object-contain scale-135 sm:scale-150"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/climateKIC.png"
                    alt="Climate KIC logo"
                    fill
                    className="object-contain scale-115 sm:scale-130"
                  />
                </div>
                <div className="relative mx-auto h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/cainco.png"
                    alt="CAINCO logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative mx-7 h-16 w-40 sm:h-20 sm:w-48">
                  <Image
                    src="/images/upb_logoo.png"
                    alt="UPB logo"
                    fill
                    className="object-contain scale-205 sm:scale-220"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <Section
      id="team"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <motion.div variants={staggerContainer} className="space-y-8">
        <motion.div variants={fadeInItem} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            The Team
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            A Team Built for Harsh conditions
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={fadeInItem}
            className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-300/80 hover:shadow-[0_0_70px_rgba(249,115,22,0.9)]"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-orange-300/70 bg-slate-900">
                    <Image
                      src="/images/sofiapyrogel.jpg"
                      alt="Sofia Mendez Roca"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">
                      Sofia Mendez Roca
                    </p>
                    <p className="text-[11px] font-medium text-orange-200">
                      CEO · International Business &amp; Strategy
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Leads commercialization, partnerships, and go-to-market
                  strategy for utilities, municipalities, and industrial
                  operators navigating escalating wildfire risk.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image
                    src="/images/sofiaqr.png"
                    alt="QR code for Sofia&apos;s LinkedIn"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInItem}
            className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_22px_80px_rgba(15,23,42,0.9)] transition hover:-translate-y-1.5 hover:border-orange-300/80 hover:shadow-[0_0_70px_rgba(249,115,22,0.9)]"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-orange-300/70 bg-slate-900">
                    <Image
                      src="/images/uzielpyrogel.jpg"
                      alt="Uziel Fassi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-50 sm:text-base">
                      Uziel Fassi
                    </p>
                    <p className="text-[11px] font-medium text-orange-200">
                      CTO · Computer Science &amp; Material Science
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Oversees PyroGel&apos;s computational modeling, material
                  architecture design, and the translation of FDS Simulations
                  into lab-ready prototypes and testing protocols.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-center md:mt-0 md:w-40">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <Image
                    src="/images/uzielqr.png"
                    alt="QR code for Uziel&apos;s LinkedIn"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_KEY;

  try {
  // 2. You can put your own API endpoint here
  const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", inquiryType: "", message: "" });
        // Auto-hide success message after 5 seconds
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
    <Section
      id="contact"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-28"
    >
      <motion.div variants={staggerContainer} className="space-y-10">
        <motion.div variants={fadeInItem} className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Contact
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s protect our natural capital.
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            We&apos;re looking to collaborate with investors, utilities,
            industrial partners, and research institutions aligned with
            science-driven wildfire resilience.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInItem}
          className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-[0_24px_80px_rgba(15,23,42,0.9)] sm:p-8"
        >
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-xl border border-green-500/50 bg-green-500/10 p-4 text-sm text-green-200"
            >
              <p className="font-semibold">Success! 🎉</p>
              <p className="mt-1 text-xs">
                We&apos;ve received your message. We&apos;ll get back to you soon.
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200"
            >
              <p className="font-semibold">Error</p>
              <p className="mt-1 text-xs">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-200"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                  placeholder="you@organization.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inquiryType"
                className="text-xs font-medium text-slate-200"
              >
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
              >
                <option value="">Select an option</option>
                <option value="investment">Investment / Capital</option>
                <option value="utility">Utility / Grid Operator</option>
                <option value="industrial">Industrial / Infrastructure</option>
                <option value="research">Research Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-xs font-medium text-slate-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}                value={formData.message}
                onChange={handleChange}
                required                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                placeholder="Share context, timelines, and how you’d like to collaborate."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(249,115,22,0.8)] transition hover:bg-orange-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Message"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="mt-3 text-[11px] text-slate-400">
              This form is for initial contact only. We&apos;ll follow up with
              structured technical and investment materials.
            </p>
          </form>
        </motion.div>

        <footer className="mt-6 border-t border-slate-800 pt-5 text-[11px] text-slate-500">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} PyroGel. All rights reserved.</p>
            <p className="max-w-md text-center sm:text-right">
              All performance metrics labeled as FDS Simulations represent
              Computational Validation at TRL 2/3 and are derived from FDS
              Modeling, not physical field tests.
            </p>
          </div>
        </footer>
      </motion.div>
    </Section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <NavBar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ScienceSection />
        <PerformanceSection />
        <TractionSection />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
}