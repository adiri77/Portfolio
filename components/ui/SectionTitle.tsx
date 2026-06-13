"use client";

import { motion } from "framer-motion";

type SectionTitleProps = {
  children: React.ReactNode;
  number?: string;
};

export default function SectionTitle({ children, number }: SectionTitleProps) {
  return (
    <motion.div
      className="section-heading mb-8 flex items-center gap-4 sm:mb-10 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="section-title flex min-w-0 items-baseline gap-3">
        {number ? <span className="section-number">{number}.</span> : null}
        <span className="section-title-text">{children}</span>
      </h2>
      <span className="section-rule" aria-hidden="true" />
    </motion.div>
  );
}
