import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      disabled,
      rows = 3,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label font-semibold text-content-primary flex items-center gap-1 select-none"
          >
            <span>{label}</span>
            {required && <span className="text-[#912020]">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            "w-full min-h-[88px] p-3.5 rounded-lg bg-card text-content-primary border border-divider text-isi transition-colors placeholder:text-content-muted/70 resize-y",
            "focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
            "disabled:bg-page disabled:text-content-muted disabled:cursor-not-allowed",
            error && "border-[#912020] focus:border-[#912020] focus:ring-[#912020]",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-kecil text-[#912020] mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-kecil text-content-muted mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
