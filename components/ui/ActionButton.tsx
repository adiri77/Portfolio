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
    "border-transparent bg-gradient-to-r from-[#f3d490] to-[#df9a3d] font-semibold text-[#2a1208] shadow-[0_10px_30px_rgba(223,154,61,0.35)] hover:from-[#f6e0ad] hover:to-[#e8b85b] hover:shadow-[0_16px_44px_rgba(232,184,91,0.48)] disabled:opacity-60",
  secondary:
    "border-aqua/40 bg-cream/50 text-aqua-light shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:border-aqua hover:bg-cream-warm/70 hover:text-aqua-dark",
  ghost:
    "border-transparent bg-transparent text-aqua-dark hover:bg-aqua/10",
  chip:
    "border-transparent bg-aqua/8 text-text-secondary hover:bg-aqua/15 hover:text-aqua-light data-[active=true]:bg-aqua/20 data-[active=true]:text-aqua-dark data-[active=true]:shadow-[inset_0_0_0_1px_rgba(232,184,91,0.5)]",
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
