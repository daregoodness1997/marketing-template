import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: "left" | "center";
  divider?: boolean;
  className?: string;
  id?: string;
}

export function SectionHeading({
  title,
  subtitle,
  accent,
  align = "center",
  divider = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-16", align === "center" && "text-center", className)}
    >
      {accent && (
        <span className="text-overline text-primary mb-4 block">{accent}</span>
      )}
      <h2
        id={id}
        className="text-3xl md:text-5xl lg:text-7xl heading-editorial text-text"
      >
        {title}
      </h2>
      {divider && (
        <div
          className={cn(
            "w-24 h-1 bg-primary mt-6",
            align === "center" && "mx-auto",
          )}
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p className="text-text-secondary text-xl font-medium mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
