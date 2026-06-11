"use client";

import type { ProjectLink } from "@/data/portfolio";
import { ActionLink } from "@/components/ui/ActionButton";

type ProjectLinksProps = {
  links: ProjectLink[][];
};

export default function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="project-links mt-auto flex flex-col gap-2.5 pt-4">
      {links.map((row, rowIndex) => (
        <div className="project-links-row flex flex-wrap gap-2.5" key={`row-${rowIndex}`}>
          {row.map((link) => (
            <ActionLink
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              icon={link.icon}
              className="project-link-btn"
            >
              {link.label}
            </ActionLink>
          ))}
        </div>
      ))}
    </div>
  );
}
