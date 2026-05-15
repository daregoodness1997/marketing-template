import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "white" | "muted" | "dark";
  size?: "default" | "large";
  narrow?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = "white",
      size = "default",
      narrow = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          size === "default" ? "py-32" : "py-40",
          variant === "white" && "bg-surface",
          variant === "muted" && "bg-surface-secondary",
          variant === "dark" && "bg-surface-invert text-text-invert",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "mx-auto px-6 relative z-10",
            narrow ? "max-w-4xl" : "max-w-7xl",
          )}
        >
          {children}
        </div>
      </section>
    );
  },
);

Section.displayName = "Section";
