"use client";

import { motion } from "framer-motion";

type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <motion.h2
      className="section-title mb-6 text-center text-3xl font-bold text-aqua-dark sm:mb-8 sm:text-4xl md:mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.h2>
  );
}
