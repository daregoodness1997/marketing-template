import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, disabled, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;
    const hintId = !error && hint && id ? `${id}-hint` : undefined;

    return (
      <div className="space-y-3">
        {label && (
          <label htmlFor={id} className="label-base">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? hintId}
          className={cn(
            "input-base",
            error && "input-error",
            disabled && "input-disabled",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-error pl-1" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-xs text-text-tertiary pl-1">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
