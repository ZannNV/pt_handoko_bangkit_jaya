import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s+/g, "");
}

/**
 * Format tanggal standar seluruh aplikasi: dd-mm-yyyy (contoh: 27-10-2026)
 */
export function formatTanggal(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return "-";
  
  if (typeof dateStr === "string") {
    const trimmed = dateStr.trim();
    // Jika sudah berformat dd-mm-yyyy
    if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
      return trimmed;
    }
    // Jika format yyyy-mm-dd
    const ymdMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (ymdMatch) {
      const [, y, m, d] = ymdMatch;
      return `${d}-${m}-${y}`;
    }
  }

  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (!date || isNaN(date.getTime())) return String(dateStr);

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

/**
 * Format tanggal dan waktu: dd-mm-yyyy HH:mm (contoh: 27-10-2026 14:00)
 */
export function formatDateTime(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return "-";

  if (typeof dateStr === "string") {
    const trimmed = dateStr.trim();
    // Jika sudah berformat dd-mm-yyyy HH:mm
    if (/^\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}$/.test(trimmed)) {
      return trimmed;
    }
    // Jika format yyyy-mm-dd HH:mm atau yyyy-mm-ddTHH:mm
    const dtMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
    if (dtMatch) {
      const [, y, m, d, hh, mm] = dtMatch;
      return `${d}-${m}-${y} ${hh}:${mm}`;
    }
    // Jika yyyy-mm-dd tanpa jam
    const ymdMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (ymdMatch) {
      const [, y, m, d] = ymdMatch;
      return `${d}-${m}-${y}`;
    }
  }

  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (!date || isNaN(date.getTime())) return String(dateStr);

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${d}-${m}-${y} ${hh}:${mm}`;
}
