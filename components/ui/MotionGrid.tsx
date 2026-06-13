"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/components/layout/useReveal";

type MotionGridProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MotionGrid({ children, className = "" }: MotionGridProps) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionGridItem({ children, className = "" }: MotionGridProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
