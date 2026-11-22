import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface ProductCardProps {
  id?: string | number;
  title: string;
  description: string;
  imageUrl?: string;
  href?: string;
  categoryName?: string;
  className?: string;
}

export function ProductCard({
  title,
  description,
  imageUrl,
  href = "/katalog",
  categoryName,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl bg-card border border-divider shadow-card overflow-hidden transition-all duration-200 hover:shadow-md hover:border-navy-700/30",
        className
      )}
    >
      {/* Gambar Produk - Dapat diklik untuk melihat detail produk */}
      <Link
        href={href}
        className="block relative w-full h-[180px] bg-navy-100 overflow-hidden cursor-pointer"
        aria-label={`Lihat detail produk ${title}`}
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-kecil font-medium text-navy-900/70">
              {categoryName || "Produk Fabrikasi"}
            </span>
          </div>
        )}
      </Link>

      {/* Konten Kartu */}
      <div className="flex flex-col flex-1 p-4 gap-2 text-left">
        <Link href={href} className="group-hover:text-orange-500 transition-colors">
          <h3 className="text-h3 font-semibold text-content-primary group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-isi text-content-muted line-clamp-2 flex-1">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-tombol font-semibold text-content-primary hover:text-orange-500 mt-2 transition-colors self-start"
        >
          <span>Lihat produk</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
