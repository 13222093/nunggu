"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Sparkles, TrendingUp, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    countryCode: "+62",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.phoneNumber || formData.phoneNumber.length < 8) {
      setError("Mohon masukkan nomor telepon yang valid");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/request-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: formData.phoneNumber,
            countryCode: formData.countryCode,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // User exists, send OTP
        localStorage.setItem("phoneNumber", formData.countryCode + formData.phoneNumber);
        localStorage.setItem("rawPhoneNumber", formData.phoneNumber);
        localStorage.setItem("isLoginFlow", "true");
        router.push("/login/otp");
      } else {
        setError(data.error || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Gagal menghubungi server. Periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-primary-50">
      {/* Left Panel - Decorative (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-hard-md">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">KITA</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-secondary-400" />
                <span className="text-sm font-bold text-secondary-400">DeFi Options</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Selamat Datang<br />
            Kembali ke<br />
            <span className="text-secondary-400">Platform DeFi Kamu!</span>
          </h2>
          <p className="text-lg text-primary-100 font-medium max-w-md">
            Monetisasi limit orders dengan DeFi options. Nabung sendiri atau bareng temen, sambil
            kumpulin XP dan unlock badges!
          </p>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-3">
          {[
            "Cash Secured Put & Covered Call",
            "Gamifikasi Seru - XP & Badges",
            "Nabung Bareng di Group Vault"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500 shadow-hard-amber-sm">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-semibold">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 shadow-hard-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-primary-700">KITA</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-secondary-500" />
                <span className="text-xs font-bold text-secondary-600">DeFi Options</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl border-2 border-primary-100 p-8 shadow-[0_8px_0_0_#e0f2fe]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-primary-700 mb-2">
                Selamat Datang! 👋
              </h2>
              <p className="text-primary-600 font-medium">
                Masuk ke akun KITA kamu untuk lanjut
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                <div className="flex gap-2">
                  {/* Country Code Select */}
                  <div className="relative">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({ ...formData, countryCode: e.target.value })
                      }
                      className="h-12 w-24 px-3 rounded-xl border-2 border-primary-100 bg-white
                                 text-base font-medium text-stone-900 shadow-[0_2px_0_0_#e0f2fe]
                                 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                                 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+65">🇸🇬 +65</option>
                    </select>
                  </div>

                  {/* Phone Number Input */}
                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="812345678"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      required
                      disabled={isLoading}
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-primary-50 border-2 border-primary-100 rounded-2xl p-4">
                <p className="text-sm text-primary-700 font-medium">
                  📱 Kami akan mengirim kode verifikasi via WhatsApp untuk konfirmasi
                  identitas kamu.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memeriksa...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Kirim Kode Verifikasi</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>

              {/* Divider */}
              <div className="text-center pt-4 border-t-2 border-primary-100">
                <p className="text-stone-700 font-medium">
                  Belum punya akun?{" "}
                  <Link
                    href="/onboarding"
                    className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-2"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-primary-400 font-medium mt-6">
            © 2026 KITA - Kolektif Investasi Tanpa Ambyar
          </p>

          {/* Terms */}
          <p className="text-xs text-stone-500 mt-4 text-center">
            Dengan melanjutkan, kamu menyetujui{" "}
            <a href="#" className="text-primary-600 hover:underline font-medium">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="#" className="text-primary-600 hover:underline font-medium">
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
