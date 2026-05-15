import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-text-invert hover:bg-primary-hover hover:-translate-y-0.5 shadow-primary-sm hover:shadow-primary-lg active:scale-[0.98]",
  dark: "bg-surface-invert text-text-invert hover:bg-primary hover:shadow-primary-lg hover:-translate-y-1 active:scale-[0.98]",
  ghost:
    "bg-transparent text-text border border-border hover:bg-surface-secondary hover:border-slate-300 active:bg-slate-100",
  "ghost-dark":
    "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white active:bg-slate-600",
} as const;

const sizes = {
  sm: "px-5 py-2 text-xs font-bold tracking-wider uppercase gap-2",
  md: "px-6 py-2.5 text-sm font-bold tracking-wider uppercase gap-2",
  lg: "px-10 py-5 text-lg font-black tracking-widest uppercase gap-4",
  block:
    "w-full py-5 text-lg font-black tracking-widest uppercase justify-center gap-4",
} as const;

const radii = {
  sm: "rounded-full",
  md: "rounded-full",
  lg: "rounded-full",
  block: "rounded-lg",
} as const;

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  block: "w-5 h-5",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center transition-all duration-300 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
          radii[size],
          variants[variant],
          sizes[size],
          isDisabled &&
            "bg-slate-200 text-text-tertiary cursor-not-allowed shadow-none hover:translate-y-0 hover:scale-100 hover:bg-slate-200 hover:shadow-none border-transparent",
          className,
        )}
        {...props}
      >
        {loading ? (
          <div
            className={cn(
              "border-2 border-current border-t-transparent rounded-full animate-spin",
              iconSizes[size],
            )}
            role="status"
          >
            <span className="sr-only">Loading…</span>
          </div>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className={iconSizes[size]} aria-hidden="true">
                {icon}
              </span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className={iconSizes[size]} aria-hidden="true">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
