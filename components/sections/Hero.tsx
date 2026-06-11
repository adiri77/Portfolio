"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ActionLink } from "@/components/ui/ActionButton";

const PortfolioSpeaker = dynamic(() => import("@/components/avatar/PortfolioSpeaker"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full animate-pulse rounded-3xl border border-aqua/20 bg-cream-deep/60 sm:h-96" />
  ),
});

const heroItem = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function Hero() {
  return (
    <section
      className="hero relative flex w-full scroll-mt-24 items-center justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 lg:px-10 xl:px-12"
      id="home"
    >
      <div className="hero-layout flex w-full flex-col items-center justify-center gap-7 text-center sm:gap-8 md:gap-10">
        <motion.div
          className="hero-badge inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-aqua/10 px-4 py-2 text-sm font-semibold text-aqua-dark"
          initial="hidden"
          animate="show"
          variants={heroItem(0.15)}
        >
          <i className="fas fa-user-circle" />
          Interactive Portfolio Guide
        </motion.div>

        <motion.h1
          className="w-full bg-gradient-to-r from-aqua-dark via-aqua to-[#023e8a] bg-clip-text px-2 text-4xl font-extrabold leading-tight text-transparent sm:text-5xl lg:text-[3.2rem]"
          initial="hidden"
          animate="show"
          variants={heroItem(0.27)}
        >
          Aditya Singh
        </motion.h1>

        <motion.p
          className="subtitle max-w-2xl px-2 text-base leading-relaxed text-text-secondary sm:text-lg"
          initial="hidden"
          animate="show"
          variants={heroItem(0.39)}
        >
          Software Development Engineer | Agentic AI &amp; LLM Orchestration | Distributed Backend Systems
        </motion.p>

        <motion.div
          className="speaker-wrap w-full"
          initial="hidden"
          animate="show"
          variants={heroItem(0.45)}
        >
          <PortfolioSpeaker />
        </motion.div>

        <motion.div
          className="cta-buttons w-full"
          initial="hidden"
          animate="show"
          variants={heroItem(0.57)}
        >
          <ActionLink variant="primary" size="md" href="#projects" icon="fas fa-code" className="cta-btn">
            View Projects
          </ActionLink>
          <ActionLink variant="secondary" size="md" href="#contact" icon="fas fa-envelope" className="cta-btn">
            Get In Touch
          </ActionLink>
        </motion.div>
      </div>
    </section>
  );
}
