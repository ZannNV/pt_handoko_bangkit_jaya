"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { SummaryCard } from "@/components/cards/summary-card";
import { BadgeStatus } from "@/components/ui/badge-status";
import { Button } from "@/components/ui/button";
import {
  getDashboardMetrics,
  getOrders,
  getRecentStatusHistory,
} from "@/lib/data/store";
import { Pesanan, RiwayatStatus } from "@/lib/types";
import { formatTanggal, formatDateTime, formatRupiah } from "@/lib/utils";
import {
  Plus,
  ArrowRight,
  Clock,
  FileSearch,
  Wrench,
  Eye,
  FileUp,
  FolderOpen,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    diajukan: 0,
    ditinjau: 0,
    diproses: 0,
    portofolioTayang: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Pesanan[]>([]);
  const [recentHistory, setRecentHistory] = useState<
    (RiwayatStatus & { kode_pesanan: string })[]
  >([]);

  useEffect(() => {
    const dataMetrics = getDashboardMetrics();
    setMetrics({
      diajukan: dataMetrics.diajukan,
      ditinjau: dataMetrics.ditinjau,
      diproses: dataMetrics.diproses,
      portofolioTayang: dataMetrics.portofolioTayang,
    });
    setRecentOrders(getOrders({ limit: 8 }));
    setRecentHistory(getRecentStatusHistory(4));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar title="Dashboard" />

      <main className="p-6 lg:p-8 flex flex-col gap-8 max-w-[1440px] w-full mx-auto">
        {/* 4 Kartu Ringkasan (Dihitung langsung dari database per status) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SummaryCard
            title="Diajukan"
            value={metrics.diajukan}
            icon={<Clock className="w-4 h-4 text-status-info-text" />}
          />
          <SummaryCard
            title="Ditinjau"
            value={metrics.ditinjau}
            icon={<FileSearch className="w-4 h-4 text-status-warning-text" />}
          />
          <SummaryCard
            title="Diproses"
            value={metrics.diproses}
            icon={<Wrench className="w-4 h-4 text-orange-500" />}
          />
          <SummaryCard
            title="Portofolio Tayang"
            value={metrics.portofolioTayang}
            icon={<Eye className="w-4 h-4 text-status-success-text" />}
          />
        </section>

        {/* Konten Utama 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Pesanan Terbaru (8 baris) */}
          <div className="lg:col-span-8 bg-card rounded-xl border border-divider shadow-card overflow-hidden flex flex-col">
            <div className="p-5 border-b border-divider flex items-center justify-between">
              <h2 className="text-h3 font-semibold text-content-primary">
                Pesanan Terbaru
              </h2>
              <Link
                href="/admin/pesanan"
                className="inline-flex items-center gap-1 text-tombol font-semibold text-content-primary hover:text-orange-500 transition-colors"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-divider bg-page/40">
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-left">
                      No Pesanan
                    </th>
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-left">
                      Klien
                    </th>
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-left">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-right">
                      Nominal
                    </th>
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-center">
                      Pembayaran
                    </th>
                    <th className="px-4 py-3 text-label font-semibold text-content-muted text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  {recentOrders.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-page/50 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-isi font-semibold text-content-primary">
                          <Link
                            href={`/admin/pesanan`}
                            className="hover:text-orange-500 transition-colors"
                          >
                            {order.kode}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 text-isi text-content-primary">
                          {order.klien?.nama || "Klien Umum"}
                        </td>
                        <td className="px-4 py-3.5 text-isi text-content-muted font-mono">
                          {formatTanggal(order.tanggal)}
                        </td>
                        <td className="px-4 py-3.5 text-isi font-medium text-navy-900 text-right">
                          {order.nominal > 0 ? formatRupiah(order.nominal) : "-"}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <BadgeStatus>{order.status_pembayaran}</BadgeStatus>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <BadgeStatus>{order.status}</BadgeStatus>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 border-t border-divider bg-page/20 text-kecil text-content-muted text-left">
              Menampilkan {recentOrders.length} pesanan terbaru
            </div>
          </div>

          {/* Kolom Kanan: Akses Cepat & Riwayat Status */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Akses Cepat */}
            <div className="bg-card rounded-xl border border-divider shadow-card p-5 flex flex-col gap-3.5 text-left">
              <h2 className="text-h3 font-semibold text-content-primary mb-1">
                Akses Cepat
              </h2>
              <Link href="/admin/portofolio/tambah" className="w-full">
                <Button
                  variant="utama"
                  className="w-full justify-center"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Tambah Portofolio
                </Button>
              </Link>
              <Link href="/admin/portofolio" className="w-full">
                <Button
                  variant="sekunder"
                  className="w-full justify-center"
                  leftIcon={<FolderOpen className="w-4 h-4 text-navy-700" />}
                >
                  Kelola Portofolio
                </Button>
              </Link>
              <Link href="/admin/pesanan/tambah" className="w-full">
                <Button
                  variant="sekunder"
                  className="w-full justify-center"
                  leftIcon={<Plus className="w-4 h-4 text-navy-700" />}
                >
                  Tambah Pesanan
                </Button>
              </Link>
              <Link href="/admin/dokumen/tambah" className="w-full">
                <Button
                  variant="sekunder"
                  className="w-full justify-center"
                  leftIcon={<FileUp className="w-4 h-4 text-navy-700" />}
                >
                  Unggah Dokumen Pesanan
                </Button>
              </Link>
            </div>

            {/* Riwayat Status Terbaru */}
            <div className="bg-card rounded-xl border border-divider shadow-card p-5 flex flex-col gap-4 text-left">
              <h2 className="text-h3 font-semibold text-content-primary">
                Riwayat Status Terbaru
              </h2>
              <div className="flex flex-col gap-3.5">
                {recentHistory.map((hist) => (
                  <div key={hist.id} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-isi font-semibold text-content-primary leading-tight">
                        {hist.kode_pesanan}: Status menjadi {hist.status}
                      </span>
                      <span className="text-kecil text-content-muted mt-0.5">
                        {formatDateTime(hist.created_at)} • {hist.catatan || `Pembaruan status oleh ${hist.diubah_oleh}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
