"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CompanyBrand } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAdminAction } from "@/actions/auth-actions";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan username dan password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginAdminAction(username, password);
      if (res.success) {
        // Redirect ke dashboard admin setelah cookie httpOnly sesi tersimpan di server
        window.location.href = "/admin/dashboard";
      } else {
        setErrorMessage(
          res.error || "Username atau password yang Anda masukkan salah."
        );
      }
    } catch {
      setErrorMessage("Terjadi kesalahan saat masuk. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden flex flex-col items-center justify-center p-6 select-none">
      {/* Background: Foto Bangunan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/building-hbj.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-900/90" />
      </div>

      {/* Brand Header */}
      <div className="relative z-10 mb-8">
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <CompanyBrand variant="light" />
        </Link>
      </div>

      {/* Login Card (Shadow-Modal) */}
      <div className="relative z-10 w-full max-w-[480px] bg-card rounded-2xl p-8 sm:p-10 shadow-modal border border-navy-700/30 flex flex-col gap-6 text-left">
        <div>
          <h1 className="text-h1 font-bold text-navy-900 tracking-tight">
            Login Admin
          </h1>
          <p className="text-isi text-content-muted mt-1.5">
            Masuk untuk mengelola pesanan, klien, dan portofolio.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username atau email admin"
            autoComplete="username"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            autoComplete="current-password"
          />

          {/* Pesan Galat */}
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-status-danger-bg text-status-danger-text text-isi border border-status-danger-text/20 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="utama"
            size="md"
            isLoading={isLoading}
            className="w-full mt-2"
          >
            Masuk ke Panel Admin
          </Button>
        </form>

        {/* Footer Link */}
        <div className="border-t border-divider pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-tombol text-content-muted hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website Publik</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
