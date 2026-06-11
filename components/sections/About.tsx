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
      <div className="about-content grid grid-cols-1 items-center gap-8 rounded-3xl p-6 sm:p-8 md:grid-cols-[minmax(220px,280px)_1fr] md:gap-10 lg:p-10">
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
          <h3 className="mb-4 text-2xl font-bold text-aqua-dark sm:text-3xl">Hello! I&apos;m Aditya Singh</h3>
          {aboutParagraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph.slice(0, 48)}
              className="mb-4 text-base leading-relaxed text-text-secondary last:mb-0 sm:text-lg"
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
