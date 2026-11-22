"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";

interface DetailGalleryProps {
  initialImage?: string;
  images?: string[];
  title: string;
}

export function DetailGallery({
  initialImage,
  images = [],
  title,
}: DetailGalleryProps) {
  const allImages = (
    images.length > 0 ? images : initialImage ? [initialImage] : []
  ).filter(Boolean);

  const [activeImage, setActiveImage] = useState<string>(
    initialImage || allImages[0] || ""
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Gambar Utama Besar */}
      <div className="aspect-[4/3] rounded-2xl bg-navy-100 overflow-hidden border border-divider shadow-card relative flex items-center justify-center group">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-all duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-content-muted p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-sm">
              <Wrench className="w-8 h-8" />
            </div>
            <span className="font-semibold text-isi">
              Dokumentasi Foto Proyek Fabrikasi
            </span>
            <span className="text-kecil max-w-xs">
              Hasil pengerjaan riil di workshop PT Handoko Bangkit Jaya.
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Media (Frame 03: 4 Thumbnail) */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.slice(0, 4).map((imgUrl, idx) => {
            const isSelected = activeImage === imgUrl;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-[4/3] rounded-xl bg-navy-100 border overflow-hidden transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-orange-500 border-orange-500 scale-[1.02] shadow-sm"
                    : "border-divider opacity-75 hover:opacity-100 hover:border-navy-700/40"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${title} - Thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 15vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
