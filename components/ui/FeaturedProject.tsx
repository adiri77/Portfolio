"use client";

import { motion } from "framer-motion";
import type { ProjectLink } from "@/data/portfolio";
import ProjectLinks from "@/components/ui/ProjectLinks";

type FeaturedProjectProps = {
  project: {
    title: string;
    tech: string;
    bullets: string[];
    links: ProjectLink[][];
  };
  index: number;
  icon: string;
  flip?: boolean;
};

export default function FeaturedProject({ project, index, icon, flip }: FeaturedProjectProps) {
  const techChips = project.tech.split("•").map((t) => t.trim()).filter(Boolean);

  return (
    <motion.article
      className={`featured${flip ? " featured-flip" : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="featured-visual" aria-hidden="true">
        <span className="featured-index">{String(index + 1).padStart(2, "0")}</span>
        <i className={`fas ${icon} featured-icon`} />
        <div className="featured-techfloat">
          {techChips.slice(0, 5).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="featured-content">
        <p className="featured-overline">Featured Project</p>
        <h3 className="featured-title">{project.title}</h3>
        <div className="featured-desc">
          <ul>
            {project.bullets.slice(0, 4).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <ul className="featured-tech">
          {techChips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {project.links.length > 0 ? <ProjectLinks links={project.links} /> : null}
      </div>
    </motion.article>
  );
}
