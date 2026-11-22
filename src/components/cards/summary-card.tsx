import React from "react";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-6 rounded-xl bg-card border border-divider shadow-card text-left transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-isi text-content-muted font-medium">{title}</span>
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-page flex items-center justify-center text-navy-700">
            {icon}
          </div>
        )}
      </div>
      <div className="text-[36px] font-bold text-content-primary leading-tight tracking-tight">
        {value}
      </div>
      {subtitle && (
        <span className="text-kecil text-content-muted/80 mt-1">{subtitle}</span>
      )}
    </div>
  );
}
