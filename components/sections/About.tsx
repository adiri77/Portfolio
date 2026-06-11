"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "@/components/layout/FadeInSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { aboutParagraphs } from "@/data/portfolio";

export default function About() {
  return (
    <FadeInSection id="about">
      <SectionTitle>About Me</SectionTitle>
      <div className="about-content grid grid-cols-1 items-center gap-8 rounded-2xl p-6 sm:p-7 md:grid-cols-[minmax(200px,240px)_1fr] md:gap-8 lg:p-8">
        <motion.div
          className="profile-img mx-auto h-52 w-52 sm:h-56 sm:w-56 md:mx-0"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Image
            alt="Aditya Singh - Software Development Engineer"
            src="/Aditya.jpeg"
            width={250}
            height={250}
            loading="lazy"
            className="h-full w-full rounded-full object-cover object-[50%_20%]"
          />
        </motion.div>
        <div className="about-text text-center md:text-left">
          <h3 className="about-name mb-3 text-xl font-bold text-indigo-dark sm:text-2xl">Aditya Singh</h3>
          <p className="about-role mb-5 text-sm font-medium text-text-muted sm:text-base">Software Development Engineer</p>
          {aboutParagraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph.slice(0, 48)}
              className="about-paragraph mb-3.5 text-[0.9375rem] leading-[1.75] text-text-secondary last:mb-0 sm:text-base"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
