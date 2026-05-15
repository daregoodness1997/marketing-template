import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

const alertVariants = {
  success: {
    container: "bg-success-light text-emerald-700 border-emerald-100",
    icon: CheckCircle2,
  },
  error: {
    container: "bg-error-light text-red-700 border-red-100",
    icon: AlertCircle,
  },
  warning: {
    container: "bg-warning-light text-amber-700 border-amber-100",
    icon: AlertTriangle,
  },
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: keyof typeof alertVariants;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, ...props }, ref) => {
    const { container, icon: Icon } = alertVariants[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-center gap-3 p-4 rounded-md border",
          container,
          className,
        )}
        {...props}
      >
        <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="font-medium">{children}</span>
      </div>
    );
  },
);

Alert.displayName = "Alert";
