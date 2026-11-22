"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BadgeStatus } from "@/components/ui/badge-status";
import { Pagination } from "@/components/ui/pagination";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
} from "@/lib/data/store";
import {
  Pesanan,
  StatusPesanan,
  ALLOWED_STATUS_TRANSITIONS,
} from "@/lib/types";
import { formatRupiah, formatTanggal, formatDateTime } from "@/lib/utils";
import {
  Plus,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  X,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function KelolaPesananPage() {
  const [orders, setOrders] = useState<Pesanan[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [paymentFilter, setPaymentFilter] = useState("Semua");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Selected Order for Detail Modal
  const [selectedOrder, setSelectedOrder] = useState<Pesanan | null>(null);
  const [newStatus, setNewStatus] = useState<StatusPesanan>("Diproses");
  const [statusNote, setStatusNote] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadData = () => {
    const list = getOrders({
      search,
      status: statusFilter,
      pembayaran: paymentFilter,
      tanggal: dateFilter,
    });
    setOrders(list);
  };

  useEffect(() => {
    loadData();
  }, [search, statusFilter, paymentFilter, dateFilter]);

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const res = updateOrderStatus(selectedOrder.id, newStatus, statusNote);
    if (!res.success) {
      alert(res.error || "Gagal mengubah status.");
      return;
    }

    const updated = getOrderById(selectedOrder.id);
    setSelectedOrder(updated);
    setStatusNote("");
    loadData();
  };

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
    setShowDeleteConfirm(false);
    setSelectedOrder(null);
    loadData();
  };

  // Pagination slice (6 items per page)
  const itemsPerPage = 6;
  const totalPages = Math.ceil(orders.length / itemsPerPage) || 1;
  const displayedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <AdminTopbar
        title="Kelola Pesanan"
        action={
          <Link href="/admin/pesanan/tambah">
            <Button
              variant="utama"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Tambah Data
            </Button>
          </Link>
        }
      />

      <main className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1440px] w-full mx-auto">
        {/* Filter Bar Sesuai Desain Figma Frame 03 */}
        <div className="bg-card rounded-xl border border-divider shadow-card p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Pencarian */}
          <div className="lg:col-span-4 flex flex-col gap-1.5 text-left">
            <span className="text-label font-semibold text-content-primary">
              Pencarian
            </span>
            <SearchInput
              placeholder="Cari kode atau nama klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>

          {/* Filter Status */}
          <div className="lg:col-span-3 flex flex-col gap-1.5 text-left">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: "Semua Status", value: "Semua Status" },
                { label: "Diajukan", value: "Diajukan" },
                { label: "Ditinjau", value: "Ditinjau" },
                { label: "Diproses", value: "Diproses" },
                { label: "Selesai", value: "Selesai" },
                { label: "Dibatalkan", value: "Dibatalkan" },
              ]}
            />
          </div>

          {/* Filter Pembayaran */}
          <div className="lg:col-span-2 flex flex-col gap-1.5 text-left">
            <Select
              label="Pembayaran"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              options={[
                { label: "Semua", value: "Semua" },
                { label: "Belum Bayar", value: "Belum Bayar" },
                { label: "DP 30%", value: "DP 30%" },
                { label: "DP 50%", value: "DP 50%" },
                { label: "Lunas", value: "Lunas" },
              ]}
            />
          </div>

          {/* Filter Tanggal */}
          <div className="lg:col-span-2 flex flex-col gap-1.5 text-left">
            <Input
              label="Tanggal"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Tombol Filter */}
          <div className="lg:col-span-1">
            <Button
              type="button"
              variant="navy"
              onClick={loadData}
              className="w-full h-[44px]"
            >
              Filter
            </Button>
          </div>
        </div>

        {/* Tabel Kelola Pesanan */}
        <div className="bg-card rounded-xl border border-divider shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-divider bg-page/40">
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Kode
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Nama Klien
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Produk
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-left">
                    Tanggal
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-right">
                    Nominal
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                    Pembayaran
                  </th>
                  <th className="px-5 py-3.5 text-label font-semibold text-content-muted text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {displayedOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-content-muted text-isi"
                    >
                      Tidak ada pesanan yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  displayedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-isi font-semibold text-content-primary">
                        {order.kode}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-primary">
                        {order.klien?.nama || "Klien Umum"}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-primary">
                        {order.nama_produk}
                      </td>
                      <td className="px-5 py-4 text-isi text-content-muted">
                        {formatTanggal(order.tanggal)}
                      </td>
                      <td className="px-5 py-4 text-isi font-medium text-navy-900 text-right">
                        {order.nominal > 0 ? formatRupiah(order.nominal) : "-"}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <BadgeStatus>{order.status}</BadgeStatus>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <BadgeStatus>{order.status_pembayaran}</BadgeStatus>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Button
                          variant="sekunder"
                          size="sm"
                          onClick={() => {
                            const full = getOrderById(order.id);
                            const current = full || order;
                            setSelectedOrder(current);
                            const allowed = ALLOWED_STATUS_TRANSITIONS[current.status] || [];
                            setNewStatus(allowed.length > 0 ? allowed[0] : current.status);
                          }}
                          className="h-8 px-3"
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginasi & Footer Tabel */}
          <div className="p-4 border-t border-divider flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-kecil text-content-muted">
              Menampilkan {displayedOrders.length} dari {orders.length} pesanan
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      {/* Modal Detail Pesanan & Riwayat Status */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-card w-full max-w-2xl rounded-2xl border border-divider shadow-modal p-6 sm:p-8 flex flex-col gap-6 text-left my-auto max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-divider pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-h2 font-bold text-navy-900">
                    {selectedOrder.kode}
                  </h2>
                  <BadgeStatus>{selectedOrder.status}</BadgeStatus>
                  <BadgeStatus>{selectedOrder.status_pembayaran}</BadgeStatus>
                </div>
                <p className="text-isi text-content-muted mt-1">
                  Diajukan pada {formatTanggal(selectedOrder.tanggal)} oleh{" "}
                  <strong className="text-navy-900">
                    {selectedOrder.klien?.nama}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-content-muted hover:text-navy-900 hover:bg-page transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spesifikasi Pesanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-page/70 border border-divider text-isi">
              <div>
                <span className="text-label text-content-muted block">
                  Produk / Layanan
                </span>
                <span className="font-semibold text-content-primary">
                  {selectedOrder.nama_produk}
                </span>
              </div>
              <div>
                <span className="text-label text-content-muted block">
                  Jumlah & Estimasi Biaya
                </span>
                <span className="font-semibold text-content-primary">
                  {selectedOrder.jumlah || "1 Unit"} —{" "}
                  {selectedOrder.nominal > 0
                    ? formatRupiah(selectedOrder.nominal)
                    : selectedOrder.anggaran || "-"}
                </span>
              </div>
              <div>
                <span className="text-label text-content-muted block">
                  Dimensi & Ukuran
                </span>
                <span className="text-content-primary">
                  {selectedOrder.dimensi || "-"}
                </span>
              </div>
              <div>
                <span className="text-label text-content-muted block">
                  Material Besi / Baja
                </span>
                <span className="text-content-primary">
                  {selectedOrder.material || "-"}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-label text-content-muted block">
                  Alamat Pemasangan
                </span>
                <span className="text-content-primary">
                  {selectedOrder.alamat || selectedOrder.klien?.alamat || "-"}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-label text-content-muted block">
                  Catatan Proyek
                </span>
                <span className="text-content-primary">
                  {selectedOrder.catatan || "-"}
                </span>
              </div>
            </div>

            {/* Form Ubah Status Pesanan (Mencatat ke Riwayat Status dengan Aturan Transisi Resmi) */}
            {(() => {
              const allowedStatuses = ALLOWED_STATUS_TRANSITIONS[selectedOrder.status] || [];
              if (allowedStatuses.length === 0) {
                return (
                  <div className="p-4 rounded-xl border border-divider bg-page/60 text-kecil text-content-muted">
                    <span className="font-semibold text-content-primary">Status Final: </span>
                    Pesanan ini berstatus <strong>{selectedOrder.status}</strong> dan tidak dapat diubah lagi.
                  </div>
                );
              }
              return (
                <form
                  onSubmit={handleUpdateStatus}
                  className="p-4 rounded-xl border border-divider flex flex-col gap-3.5 bg-card"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-label font-bold text-navy-900 uppercase tracking-wide">
                      Ubah Status Pesanan
                    </h3>
                    <span className="text-kecil text-content-muted">
                      Status Saat Ini: <strong>{selectedOrder.status}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      label="Pilih Status Baru"
                      value={newStatus}
                      onChange={(e) =>
                        setNewStatus(e.target.value as StatusPesanan)
                      }
                      options={allowedStatuses.map((s) => ({ label: s, value: s }))}
                    />
                    <Input
                      label="Catatan Perubahan (Opsional)"
                      placeholder="Contoh: DP 50% diterima, mulai las"
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button variant="utama" size="sm" type="submit">
                      Simpan Perubahan Status
                    </Button>
                  </div>
                </form>
              );
            })()}

            {/* Riwayat Status */}
            <div className="flex flex-col gap-3">
              <h3 className="text-label font-bold text-navy-900 uppercase tracking-wide">
                Riwayat Perubahan Status
              </h3>
              <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
                {selectedOrder.riwayat && selectedOrder.riwayat.length > 0 ? (
                  selectedOrder.riwayat.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg bg-page border border-divider flex items-start gap-3"
                    >
                      <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-isi text-content-primary">
                            {r.status}
                          </span>
                          <span className="text-kecil text-content-muted">
                            oleh {r.diubah_oleh} • {formatDateTime(r.created_at)}
                          </span>
                        </div>
                        {r.catatan && (
                          <p className="text-kecil text-content-muted mt-0.5">
                            {r.catatan}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-kecil text-content-muted italic">
                    Belum ada riwayat perubahan status tercatat.
                  </p>
                )}
              </div>
            </div>

            {/* Aksi Hapus */}
            <div className="pt-4 border-t border-divider flex items-center justify-between">
              {showDeleteConfirm ? (
                <div className="flex items-center gap-2 w-full justify-between bg-status-danger-bg p-3 rounded-lg">
                  <span className="text-isi text-status-danger-text font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Yakin ingin menghapus
                    pesanan ini?
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="bahaya"
                      size="sm"
                      onClick={() => handleDeleteOrder(selectedOrder.id)}
                    >
                      Ya, Hapus
                    </Button>
                    <Button
                      variant="sekunder"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    variant="bahaya"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Hapus Pesanan
                  </Button>
                  <Button
                    variant="sekunder"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Tutup
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
