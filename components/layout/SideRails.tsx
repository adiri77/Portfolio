"use client";

import { contactLinks } from "@/data/portfolio";

const isExternal = (href: string) => href.startsWith("http");

const railSocials = [
  contactLinks.find((l) => l.icon.includes("github")),
  contactLinks.find((l) => l.icon.includes("linkedin")),
  contactLinks.find((l) => l.href.startsWith("mailto")),
].filter(Boolean) as typeof contactLinks;

const emailLink = contactLinks.find((l) => l.href.startsWith("mailto"));

export default function SideRails() {
  return (
    <>
      <aside className="side-rail side-rail-left" aria-label="Social links">
        {railSocials.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(isExternal(link.href)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <i className={link.icon.startsWith("fab") ? link.icon : `fas ${link.icon}`} />
          </a>
        ))}
      </aside>

      {emailLink ? (
        <aside className="side-rail side-rail-right" aria-label="Email">
          <a className="rail-email" href={emailLink.href}>
            {emailLink.label}
          </a>
        </aside>
      ) : null}
    </>
  );
}
