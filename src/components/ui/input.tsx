import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      required,
      disabled,
      leftIcon,
      rightIcon,
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
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-content-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              "w-full h-[44px] px-3.5 py-[11px] rounded-lg bg-card text-content-primary border border-divider text-isi transition-colors placeholder:text-content-muted/70",
              "focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
              "disabled:bg-page disabled:text-content-muted disabled:cursor-not-allowed",
              error && "border-[#912020] focus:border-[#912020] focus:ring-[#912020]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-content-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-kecil text-[#912020] mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-kecil text-content-muted mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
