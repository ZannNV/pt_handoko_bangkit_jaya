import React from "react";
import { cn } from "@/lib/utils";

export interface AdminTopbarProps {
  title: string;
  action?: React.ReactNode;
  adminName?: string;
  className?: string;
}

export function AdminTopbar({
  title,
  action,
  adminName = "Edo Raihan",
  className,
}: AdminTopbarProps) {
  const initial = adminName ? adminName.charAt(0).toUpperCase() : "A";

  return (
    <header
      className={cn(
        "w-full h-[72px] bg-card border-b border-divider flex items-center justify-between px-6 lg:px-8 shrink-0 select-none",
        className
      )}
    >
      {/* Judul Halaman */}
      <h1 className="text-h2 font-semibold text-content-primary tracking-tight">
        {title}
      </h1>

      {/* Aksi & Profil Pengguna */}
      <div className="flex items-center gap-4 md:gap-5">
        {action && <div className="flex items-center">{action}</div>}

        {/* Profil Admin */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-divider/70">
          <div
            className="w-9 h-9 rounded-full bg-status-info-bg text-status-info-text font-bold text-label flex items-center justify-center shrink-0 shadow-xs border border-status-info-text/20"
            aria-hidden="true"
          >
            {initial}
          </div>
          <span className="text-isi font-medium text-content-primary hidden sm:inline">
            {adminName}
          </span>
        </div>
      </div>
    </header>
  );
}
