import React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  activeLabel = "Tayang",
  inactiveLabel = "Draft",
  disabled = false,
  className = "",
}: ToggleProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-label font-semibold text-content-primary">
              {label}
            </span>
          )}
          {description && (
            <span className="text-kecil text-content-muted">{description}</span>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-kecil font-medium text-content-muted min-w-[45px] text-right">
          {checked ? activeLabel : inactiveLabel}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
            checked ? "bg-orange-500" : "bg-divider",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>
    </div>
  );
}
