"use client";

import { motion } from "framer-motion";
import FadeInSection from "@/components/layout/FadeInSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { ActionLink } from "@/components/ui/ActionButton";
import { contactLinks } from "@/data/portfolio";

export default function Contact() {
  return (
    <FadeInSection id="contact">
      <SectionTitle>Let&apos;s Connect</SectionTitle>
      <motion.div
        className="contact-content rounded-3xl p-6 text-center sm:p-8 md:p-10"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <h3 className="contact-heading text-xl font-bold sm:text-2xl">Ready to collaborate on exciting projects?</h3>
        <p className="contact-subtext mx-auto mt-3 max-w-2xl text-center text-sm sm:text-base">
          I&apos;m always open to discussing new opportunities, innovative ideas, and potential collaborations.
        </p>
        <div className="contact-links mt-8 flex flex-wrap items-center justify-center gap-3 pb-1 sm:gap-4">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <ActionLink
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variant="secondary"
                size="md"
                icon={link.icon}
                className="contact-link-btn"
              >
                {link.label}
              </ActionLink>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </FadeInSection>
  );
}
