"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/portfolio";

const tabLabel = (period: string) =>
  period.split("|")[0].split("–")[0].split("-")[0].trim();

export default function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <motion.div
      className="exp-tabs"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="exp-tablist" role="tablist" aria-label="Work history">
        {experiences.map((e, i) => (
          <button
            key={`${e.company}-${e.period}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            className={`exp-tab${active === i ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tabLabel(e.period)}
          </button>
        ))}
      </div>

      <div className="exp-panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <h3 className="exp-role">
              {exp.role} <span className="exp-at">@ {exp.company}</span>
            </h3>
            <p className="exp-period">{exp.period}</p>
            <ul className="exp-bullets">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
