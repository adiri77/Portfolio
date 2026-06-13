"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/components/layout/useReveal";

type FadeInSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeInSection({
  id,
  children,
  className = "",
  delay = 0,
}: FadeInSectionProps) {
  const [ref, shown] = useReveal<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section w-full scroll-mt-24 py-12 sm:py-14 md:py-16 lg:py-20 ${className}`}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 40 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
