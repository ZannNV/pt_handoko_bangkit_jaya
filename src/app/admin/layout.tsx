"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { logoutAdminAction } from "@/actions/auth-actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await logoutAdminAction();
    } finally {
      window.location.href = "/admin/login";
    }
  };

  // Halaman login render bersih tanpa sidebar (diproteksi di level middleware)
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-page flex">
      {/* Sidebar Admin (Dapat dilipat untuk responsif mobile/tablet) */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Area Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
