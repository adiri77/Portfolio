"use client";

import { motion } from "framer-motion";
import type { ProjectLink } from "@/data/portfolio";

type OtherProjectCardProps = {
  project: {
    title: string;
    tech: string;
    bullets: string[];
    links: ProjectLink[][];
  };
};

const iconClass = (icon: string) => (icon.startsWith("fab") ? icon : `fas ${icon}`);

export default function OtherProjectCard({ project }: OtherProjectCardProps) {
  const links = project.links.flat();
  const techChips = project.tech.split("•").map((t) => t.trim()).filter(Boolean);

  return (
    <motion.article
      className="other-card"
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      <div className="other-card-top">
        <i className="fas fa-folder-open other-folder" aria-hidden="true" />
        {links.length > 0 ? (
          <div className="other-links">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <i className={iconClass(l.icon)} />
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <h3 className="other-title">{project.title}</h3>
      <p className="other-desc">{project.bullets[0]}</p>

      <ul className="other-tech">
        {techChips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </motion.article>
  );
}
