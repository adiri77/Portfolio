"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/portfolio";

const MOBILE_NAV_BREAKPOINT = 1200;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        if (window.scrollY >= top - 200) current = section.id;
      });
      setActiveSection(current);
    };

    const onResize = () => {
      if (window.innerWidth > MOBILE_NAV_BREAKPOINT) setMobileOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="nav-container relative mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="logo shrink-0"
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
        >
          <span>A</span>
          <span>S</span>
        </div>
        <button
          className="mobile-menu-btn ml-auto shrink-0"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="portfolio-nav-links"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"}`} />
        </button>
        <ul
          id="portfolio-nav-links"
          className={`nav-links${mobileOpen ? " mobile-open" : ""}`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                <i className={`fas ${link.icon}`} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
