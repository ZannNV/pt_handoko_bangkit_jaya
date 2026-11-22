import React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "Tidak ada data ditemukan",
  emptyAction,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const getAlignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  return (
    <div
      className={cn(
        "w-full bg-card rounded-xl border border-divider shadow-card overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-divider bg-page/40">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-label font-semibold text-content-muted whitespace-nowrap",
                    getAlignClass(col.align),
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-divider">
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={`skeleton-${rIdx}`} className="animate-pulse">
                  {columns.map((_, cIdx) => (
                    <td key={`skeleton-${rIdx}-${cIdx}`} className="px-4 py-4">
                      <div className="h-4 bg-navy-100/70 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-content-muted"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-page flex items-center justify-center text-content-muted/80">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <p className="text-isi font-medium text-content-muted">
                      {emptyMessage}
                    </p>
                    {emptyAction && <div className="mt-1">{emptyAction}</div>}
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              data.map((item, rIdx) => (
                <tr
                  key={item.id ?? rIdx}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    "transition-colors hover:bg-page/50",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={cn(
                        "px-4 py-3.5 text-isi text-content-primary align-middle",
                        getAlignClass(col.align),
                        col.className
                      )}
                    >
                      {col.cell
                        ? col.cell(item, rIdx)
                        : col.accessorKey
                        ? (item[col.accessorKey] as React.ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
