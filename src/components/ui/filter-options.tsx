import React from "react";
import { cn } from "@/lib/utils";

export interface FilterOptionItem {
  id: string;
  label: string;
  count?: number;
}

export interface RadioFilterProps {
  label?: string;
  options: FilterOptionItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function RadioFilter({
  label,
  options,
  selectedId,
  onSelect,
  className,
}: RadioFilterProps) {
  return (
    <div className={cn("flex flex-col gap-2.5 text-left", className)}>
      {label && (
        <span className="text-label font-semibold text-content-primary">
          {label}
        </span>
      )}
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <label
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex items-center gap-2.5 cursor-pointer group text-isi select-none"
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                  isSelected
                    ? "border-navy-900 bg-white"
                    : "border-divider group-hover:border-content-muted"
                )}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-navy-900" />
                )}
              </div>
              <span
                className={cn(
                  "transition-colors",
                  isSelected
                    ? "font-semibold text-content-primary"
                    : "text-content-muted group-hover:text-content-primary"
                )}
              >
                {option.label}
              </span>
              {typeof option.count === "number" && (
                <span className="text-kecil text-content-muted ml-auto">
                  ({option.count})
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export interface SegmentedTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function SegmentedTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: SegmentedTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex p-1 rounded-lg bg-card border border-divider gap-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2 rounded-md text-tombol font-semibold transition-all select-none",
              isActive
                ? "bg-navy-900 text-white shadow-sm"
                : "text-content-primary hover:bg-page"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
