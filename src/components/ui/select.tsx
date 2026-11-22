import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      disabled,
      options,
      children,
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
          <select
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-[44px] pl-3.5 pr-10 py-[11px] rounded-lg bg-card text-content-primary border border-divider text-isi transition-colors appearance-none cursor-pointer",
              "focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
              "disabled:bg-page disabled:text-content-muted disabled:cursor-not-allowed",
              error && "border-[#912020] focus:border-[#912020] focus:ring-[#912020]",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 flex items-center pointer-events-none text-content-muted">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = "Select";
