import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? hintId}
          className={cn(
            "input-base resize-none min-h-[160px]",
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

Textarea.displayName = "Textarea";
