import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: {
    box: "w-8 h-8",
    icon: "w-5 h-5",
    dot: "w-1.5 h-1.5 -top-0.5 -right-0.5",
    text: "text-lg",
  },
  md: {
    box: "w-10 h-10",
    icon: "w-6 h-6",
    dot: "w-2 h-2 -top-1 -right-1",
    text: "text-xl",
  },
} as const;

export interface LogoProps {
  size?: keyof typeof sizes;
  className?: string;
  /** Brand name — change per project */
  brandName?: string;
  /** Accent portion of the brand name */
  brandAccent?: string;
}

export function Logo({
  size = "md",
  className,
  brandName = "Your",
  brandAccent = "Brand",
}: LogoProps) {
  const s = sizes[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          s.box,
          "bg-primary flex items-center justify-center rounded-lg shadow-sm",
        )}
      >
        <span className="relative">
          <Zap
            className={cn(s.icon, "text-white fill-current")}
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute bg-white rounded-full animate-pulse",
              s.dot,
            )}
          />
        </span>
      </span>
      <span
        className={cn(
          s.text,
          "font-black tracking-tight text-slate-900 uppercase",
        )}
      >
        {brandName}
        <span className="text-primary">{brandAccent}</span>
      </span>
    </span>
  );
}
