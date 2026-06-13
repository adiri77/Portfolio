"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Robust scroll-reveal. Reveals the element once it enters the viewport and
 * can never get stuck hidden:
 *  - reveals immediately if it mounts already in/above the viewport
 *    (lazy-mounted sections you've already scrolled past),
 *  - uses an IntersectionObserver for normal scrolling,
 *  - plus a passive scroll fallback so even instant jumps past it reveal it.
 * This avoids the framer-motion `whileInView` + `once` failure mode where a
 * fast/jump scroll leaves a section permanently at opacity 0.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const inRange = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.92;

    if (inRange()) {
      setShown(true);
      return;
    }

    let io: IntersectionObserver | undefined;
    const cleanup = () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (inRange()) {
        setShown(true);
        cleanup();
      }
    };

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShown(true);
            cleanup();
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0 }
      );
      io.observe(el);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [shown]);

  return [ref, shown] as const;
}
