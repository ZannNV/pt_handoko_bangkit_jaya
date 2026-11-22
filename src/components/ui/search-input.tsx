import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, placeholder = "Cari...", ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <Search className="w-4 h-4 text-content-muted absolute left-3.5 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-[42px] pl-10 pr-9 py-2 rounded-lg bg-card text-content-primary border border-divider text-isi placeholder:text-content-muted/70 transition-colors",
            "focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500",
            className
          )}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-content-muted hover:text-content-primary p-0.5 rounded transition-colors"
            aria-label="Bersihkan pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
