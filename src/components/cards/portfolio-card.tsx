import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, formatTanggal } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import { BadgeStatus } from "../ui/badge-status";

export interface PortfolioCardProps {
  id?: string | number;
  title: string;
  categoryName?: string;
  category?: string;
  completionDate?: string;
  date?: string;
  imageUrl?: string;
  href?: string;
  className?: string;
}

export function PortfolioCard({
  title,
  categoryName,
  category,
  completionDate,
  date,
  imageUrl,
  href = "/katalog",
  className,
}: PortfolioCardProps) {
  const displayCategory = category || categoryName || "Fabrikasi Besi";
  const displayDate = date || completionDate;
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl bg-card border border-divider shadow-card overflow-hidden transition-all duration-200 hover:shadow-md hover:border-navy-700/30",
        className
      )}
    >
      {/* Gambar Portofolio - Dapat diklik untuk melihat detail portofolio */}
      <Link
        href={href}
        className="block relative w-full h-[180px] bg-navy-100 overflow-hidden cursor-pointer"
        aria-label={`Lihat detail portofolio ${title}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#E4EAF2] to-[#B8C4D4] p-4 text-center">
            <svg
              className="w-10 h-10 text-navy-700/60 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-kecil font-medium text-navy-900/70">
              {displayCategory}
            </span>
          </div>
        )}
      </Link>

      {/* Konten Portofolio */}
      <div className="flex flex-col flex-1 p-4 gap-2 text-left">
        {/* Kategori Badge */}
        <div className="self-start">
          <BadgeStatus variant="info" withDot={false} size="sm">
            {displayCategory}
          </BadgeStatus>
        </div>

        {/* Judul */}
        <Link href={href} className="group-hover:text-orange-500 transition-colors">
          <h3 className="text-h3 font-semibold text-content-primary group-hover:text-orange-500 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Tanggal Selesai */}
        {displayDate && (
          <div className="flex items-center gap-1.5 text-kecil text-content-muted">
            <Calendar className="w-3.5 h-3.5 text-content-muted/80" />
            <span>{displayDate.includes("-") && displayDate.length === 10 && displayDate.split("-")[0].length === 4 ? formatTanggal(displayDate) : displayDate}</span>
          </div>
        )}

        {/* Aksi */}
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 mt-2 transition-colors self-start"
        >
          <span>Lihat detail</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
