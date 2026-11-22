import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "light" | "dark";
}

export function CompanyLogoIcon({ size = 40, className = "" }: LogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 bg-white p-0.5 shadow-sm border border-navy-100/30 ${className}`}
    >
      <Image
        src="/images/logo-hbj.jpg"
        alt="Logo PT Handoko Bangkit Jaya"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}

export function CompanyBrand({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CompanyLogoIcon size={38} />
      <span
        className={`font-semibold text-h3 leading-none tracking-tight ${
          variant === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        PT Handoko Bangkit Jaya
      </span>
    </div>
  );
}
