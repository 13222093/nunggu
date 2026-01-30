"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, TrendingUp, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-primary-50">
      {/* Left Panel - Decorative (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-success-500 to-success-600 p-12 flex-col justify-between relative overflow-hidden">
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
            Mulai Perjalanan<br />
            DeFi Kamu<br />
            <span className="text-secondary-400">Hari Ini! 🚀</span>
          </h2>
          <p className="text-lg text-green-100 font-medium max-w-md">
            Bergabung dengan ribuan investor yang sudah monetisasi limit orders mereka dengan
            strategi DeFi options yang seru dan menguntungkan!
          </p>
        </div>

        {/* Benefits */}
        <div className="relative z-10 space-y-3">
          {[
            "Gratis untuk memulai",
            "Gamifikasi - Kumpulin XP & Badges",
            "Nabung solo atau bareng temen"
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-hard-sm">
                <CheckCircle2 className="h-5 w-5 text-success-500" />
              </div>
              <span className="text-white font-semibold">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Welcome Card */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-500 shadow-hard-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-success-700">KITA</h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-secondary-500" />
                <span className="text-xs font-bold text-secondary-600">DeFi Options</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl border-2 border-primary-100 p-8 shadow-[0_8px_0_0_#e0f2fe]">
            <div className="text-center mb-8">
              {/* Icon Badge */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-hard-md">
                <Zap className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-3xl font-extrabold text-success-700 mb-2">
                Selamat Datang di KITA! 🎉
              </h2>
              <p className="text-primary-600 font-medium">
                Platform DeFi options terpercaya untuk kamu
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {[
                "💰 Cash Secured Put & Covered Call",
                "🎮 Gamifikasi - XP, Badges, Streaks",
                "👥 Nabung bareng di group vault",
                "📊 Built on Base - Cepat & Murah"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="h-5 w-5 text-success-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => router.push("/onboarding/phone")}
              variant="primary"
              size="lg"
              fullWidth
              className="mb-4"
            >
              <div className="flex items-center gap-2">
                <span>Mulai dengan KITA</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </Button>

            {/* Divider */}
            <div className="text-center pt-4 border-t-2 border-primary-100">
              <p className="text-stone-700 font-medium">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-2"
                >
                  Masuk
                </Link>
              </p>
            </div>
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
