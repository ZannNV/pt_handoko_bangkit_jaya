import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label="Paginasi Halaman"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      {/* Tombol Sebelumnya */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya"
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-lg border border-divider bg-card text-content-primary transition-colors",
          "hover:bg-page disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Nomor Halaman */}
      {getPages().map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-content-muted text-label select-none"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Halaman ${page}`}
            className={cn(
              "min-w-[36px] h-9 px-3 flex items-center justify-center rounded-lg text-tombol font-semibold transition-colors",
              isActive
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-card border border-divider text-content-primary hover:bg-page"
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Tombol Selanjutnya */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Halaman selanjutnya"
        className={cn(
          "w-9 h-9 flex items-center justify-center rounded-lg border border-divider bg-card text-content-primary transition-colors",
          "hover:bg-page disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
