import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-surface border border-border rounded-xl shadow-slick p-12",
  elevated: "bg-surface border border-border rounded-2xl shadow-slick p-12",
  hero: "bg-surface border border-border rounded-3xl shadow-slick p-12 md:p-20",
  dark: "bg-surface-invert border border-slate-800 rounded-xl text-text-invert p-8",
  subtle: "bg-surface-secondary rounded-xl p-10",
  interactive:
    "bg-surface border border-border rounded-xl shadow-slick shadow-slick-hover p-12 hover:-translate-y-2 transition-all duration-500",
} as const;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  as?: "div" | "article" | "section";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", as: Tag = "div", children, ...props },
    ref,
  ) => {
    return (
      <Tag ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </Tag>
    );
  },
);

Card.displayName = "Card";
