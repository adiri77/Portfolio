"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.section
      id={id}
      className={`section w-full scroll-mt-24 py-12 sm:py-14 md:py-16 lg:py-20 ${className}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
