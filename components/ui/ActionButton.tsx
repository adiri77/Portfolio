"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "chip";
type ButtonSize = "sm" | "md" | "chip";

type ActionButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  icon?: string;
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-gradient-to-r from-aqua-dark to-aqua text-white shadow-[0_8px_24px_rgba(0,119,182,0.25)] hover:from-[#023e8a] hover:to-aqua-dark disabled:opacity-60",
  secondary:
    "border-aqua/30 bg-cream text-aqua-dark shadow-[0_4px_16px_rgba(0,119,182,0.08)] hover:border-aqua hover:bg-cream-warm",
  ghost:
    "border-transparent bg-transparent text-aqua-dark hover:bg-aqua/10",
  chip:
    "border-aqua/25 bg-cream text-text-secondary hover:border-aqua/45 hover:bg-aqua/10 hover:text-aqua-dark data-[active=true]:border-aqua data-[active=true]:bg-aqua/15 data-[active=true]:text-aqua-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2.5 text-xs sm:min-h-11 sm:px-5 sm:py-3 sm:text-sm",
  md: "min-h-11 px-5 py-3 text-sm sm:min-h-12 sm:px-6 sm:py-3.5 sm:text-base",
  chip: "min-h-10 px-3.5 py-2.5 text-[0.8rem] sm:min-h-11 sm:px-4 sm:py-3 sm:text-sm",
};

const defaultMotionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

type ActionButtonProps = ActionButtonBaseProps &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: undefined;
  };

type ActionLinkProps = ActionButtonBaseProps &
  Omit<HTMLMotionProps<"a">, "children"> & {
    href: string;
  };

function baseClassName(variant: ButtonVariant, size: ButtonSize, className: string) {
  const shape = variant === "chip" ? "rounded-xl" : "rounded-full";
  return [
    `action-btn inline-flex shrink-0 items-center justify-center ${shape} border font-semibold`,
    "box-border transition-colors duration-200",
    variant === "chip" ? "text-center" : "whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function ButtonContent({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <span className="action-btn-content">
      {icon ? <i className={icon} aria-hidden /> : null}
      <span className="action-btn-text">{children}</span>
    </span>
  );
}

const chipMotionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

export function ActionButton({
  variant = "primary",
  size = "md",
  active = false,
  icon,
  className = "",
  children,
  disabled,
  ...props
}: ActionButtonProps) {
  const resolvedSize = variant === "chip" && size === "md" ? "chip" : size;

  return (
    <motion.button
      type="button"
      className={baseClassName(variant, resolvedSize, className)}
      data-active={active}
      disabled={disabled}
      {...defaultMotionProps}
      {...props}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </motion.button>
  );
}

export function ActionLink({
  variant = "primary",
  size = "md",
  active = false,
  icon,
  className = "",
  children,
  href,
  ...props
}: ActionLinkProps) {
  const resolvedSize = variant === "chip" && size === "md" ? "chip" : size;

  return (
    <motion.a
      href={href}
      className={baseClassName(variant, resolvedSize, className)}
      data-active={active}
      {...defaultMotionProps}
      {...props}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </motion.a>
  );
}
