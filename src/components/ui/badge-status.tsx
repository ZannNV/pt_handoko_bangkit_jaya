import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "sukses" | "peringatan" | "info" | "bahaya" | "netral";

export interface BadgeStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  statusText?: string;
  withDot?: boolean;
  size?: "sm" | "md";
}

export function getVariantFromStatus(status?: string): BadgeVariant {
  if (!status) return "netral";
  const s = status.toLowerCase().trim();

  // Sukses: Selesai, Lunas, Aktif, Lengkap, Tayang
  if (
    s === "selesai" ||
    s === "lunas" ||
    s === "aktif" ||
    s === "lengkap" ||
    s === "tayang"
  ) {
    return "sukses";
  }

  // Peringatan: Ditinjau, Diproses, DP 30%, DP 50%, Pending
  if (
    s === "ditinjau" ||
    s === "diproses" ||
    s === "dp 30%" ||
    s === "dp 50%" ||
    s === "pending"
  ) {
    return "peringatan";
  }

  // Info: Diajukan, Info
  if (s === "diajukan" || s === "info") {
    return "info";
  }

  // Bahaya: Dibatalkan, Batal, Belum Bayar
  if (s === "dibatalkan" || s === "batal" || s === "belum bayar") {
    return "bahaya";
  }

  // Netral: Draft, Nonaktif
  return "netral";
}

export function BadgeStatus({
  className,
  variant,
  statusText,
  withDot = true,
  size = "md",
  children,
  ...props
}: BadgeStatusProps) {
  const label = statusText || (typeof children === "string" ? children : "");
  const activeVariant = variant || getVariantFromStatus(label);

  const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
    sukses: {
      bg: "bg-status-success-bg",
      text: "text-status-success-text",
      dot: "bg-status-success-text",
    },
    peringatan: {
      bg: "bg-status-warning-bg",
      text: "text-status-warning-text",
      dot: "bg-status-warning-text",
    },
    info: {
      bg: "bg-status-info-bg",
      text: "text-status-info-text",
      dot: "bg-status-info-text",
    },
    bahaya: {
      bg: "bg-status-danger-bg",
      text: "text-status-danger-text",
      dot: "bg-status-danger-text",
    },
    netral: {
      bg: "bg-status-neutral-bg",
      text: "text-status-neutral-text",
      dot: "bg-status-neutral-text",
    },
  };

  const current = variantStyles[activeVariant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-kecil gap-1.5",
    md: "px-3 py-1 text-label gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap select-none",
        current.bg,
        current.text,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", current.dot)}
          aria-hidden="true"
        />
      )}
      <span>{children || statusText}</span>
    </span>
  );
}
