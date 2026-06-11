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
      className={`section mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-24 xl:px-12 ${className}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
