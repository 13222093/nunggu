"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import {
  Sparkles,
  TrendingUp,
  User,
  Mail,
  AtSign,
  ArrowRight,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function CompleteProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Check if already logged in
    const sessionStr = localStorage.getItem('userSession');
    const guestDataStr = localStorage.getItem('userData');
    if (sessionStr || guestDataStr) {
      router.push('/dashboard');
      return;
    }

    const phone = localStorage.getItem("phoneNumber");
    if (!phone) {
      router.push("/onboarding/phone");
    } else {
      setPhoneNumber(phone);
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama Lengkap dibutuhkan";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email dibutuhkan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Mohon masukkan email yang valid";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username dibutuhkan";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username harus terdiri dari minimal 3 karakter";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username hanya boleh mengandung huruf, angka, dan garis bawah";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Kamu harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      ...formData,
      phoneNumber,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    router.push("/onboarding/profiling");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen flex bg-primary-50">
      {/* Left Panel - Decorative (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0284C7] to-[#06B6D4] p-12 flex-col justify-between relative overflow-hidden">
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
            Hampir Selesai!<br />
            Lengkapi Profilmu<br />
            <span className="text-secondary-400">Sekarang ✨</span>
          </h2>
          <p className="text-lg text-cyan-50 font-medium max-w-md">
            Hanya beberapa detail lagi untuk memulai perjalanan DeFi kamu dan unlock semua
            fitur gamifikasi yang seru!
          </p>
        </div>

        {/* Benefits */}
        <div className="relative z-10 space-y-3">
          {[
            "Profil unik dengan username",
            "Notifikasi ke email kamu",
            "Unlock XP & achievements"
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-hard-sm">
                <CheckCircle2 className="h-5 w-5 text-[#06B6D4]" />
              </div>
              <span className="text-white font-semibold">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0284C7] shadow-hard-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0A4A7C]">KITA</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-secondary-500" />
                <span className="text-xs font-bold text-secondary-600">DeFi Options</span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali</span>
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl border-2 border-primary-100 p-8 shadow-[0_8px_0_0_#e0f2fe]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-[#0A4A7C] mb-2">
                Lengkapi Profil 👤
              </h2>
              <p className="text-primary-600 font-medium">
                Hanya beberapa detail lagi untuk memulai
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                    className="pl-12"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm font-medium text-danger-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="pl-12"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm font-medium text-danger-500">{errors.email}</p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe123"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value.toLowerCase())}
                    required
                    className="pl-12"
                  />
                </div>
                {formData.username && formData.username.length >= 3 && (
                  <div className="flex items-center gap-1 text-success-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-bold">Username tersedia!</span>
                  </div>
                )}
                {errors.username && (
                  <p className="text-sm font-medium text-danger-500">{errors.username}</p>
                )}
                <p className="text-xs text-stone-500">
                  Ini akan menjadi pengenal unikmu di KITA
                </p>
              </div>

              {/* Phone Number Display */}
              <div className="bg-primary-50 border-2 border-primary-100 rounded-2xl p-4">
                <p className="text-sm text-primary-700 font-bold mb-1">
                  Nomor Telepon: {phoneNumber}
                </p>
                <div className="flex items-center gap-1 text-success-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-bold">Terverifikasi</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary-600 border-2 border-primary-200 rounded focus:ring-primary-500 cursor-pointer"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-stone-700 cursor-pointer">
                  Saya setuju dengan{" "}
                  <a href="#" className="text-primary-600 hover:underline font-bold">
                    Syarat Layanan
                  </a>{" "}
                  dan{" "}
                  <a href="#" className="text-primary-600 hover:underline font-bold">
                    Kebijakan Privasi
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm font-medium text-danger-500">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="lg" fullWidth>
                <div className="flex items-center gap-2">
                  <span>Lengkapi Pendaftaran</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-primary-400 font-medium mt-6">
            © 2026 KITA - Kolektif Investasi Tanpa Ambyar
          </p>
        </div>
      </div>
    </div>
  );
}
