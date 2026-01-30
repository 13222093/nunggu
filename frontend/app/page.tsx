'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Sparkles, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section - ExportReadyAI Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        {/* Subtle blue glow overlay (70% rule) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-700/10" />

        {/* Background Pattern - Blue blobs (not teal) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/30 rounded-full blur-3xl" />
        </div>

        {/* Floating Elements - Amber for CTAs (10% rule) */}
        <div className="absolute top-20 right-20 animate-bounce hidden md:block">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-hard-amber-md rotate-12">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-pulse hidden md:block">
          <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-secondary-400" />
            <span className="text-white/90 text-sm font-medium">Platform DeFi Options Indonesia</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            KITA
            <br />
            <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">Kolektif Investasi Tanpa Ambyar</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            Monetisasi limit orders dengan DeFi options. Dapat cashback instant saat "antri beli" crypto di harga target kamu.
          </p>

          {/* Tagline */}
          <p className="text-lg text-secondary-400 font-semibold mb-10">
            Nabung sendiri atau bareng temen, sambil main strategi DeFi yang seru.
          </p>

          {/* CTA Buttons - Amber for primary CTA (10% rule) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="group flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg
                         shadow-hard-amber-lg hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(245,158,11,0.4)]
                         active:translate-y-1 active:shadow-[0_2px_0_0_rgba(245,158,11,0.4)] transition-all"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-primary-500/30 text-white px-8 py-4 rounded-2xl font-bold text-lg
                         hover:bg-white/20 hover:border-primary-500/50 transition-all"
            >
              <Play className="w-5 h-5" />
              Lihat Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">$2.4M+</p>
              <p className="text-white/60 text-sm mt-1">Total Value Locked</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">18.5%</p>
              <p className="text-white/60 text-sm mt-1">Avg APY</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white">1,250+</p>
              <p className="text-white/60 text-sm mt-1">Active Users</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <main className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white mb-4">Cara Kerja KITA</h2>
              <p className="text-xl text-stone-400">Mulai investasi dengan mudah, cuan dengan strategi DeFi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white border-2 border-primary-500/30 rounded-2xl p-8 shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-2xl mb-6 shadow-lg">
                  💰
                </div>
                <div className="mb-2 text-secondary-600 text-sm font-bold uppercase tracking-wider">Langkah 1</div>
                <h3 className="text-xl font-bold text-primary-600 mb-3">Pilih Mode Nabung</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Nabung sendiri atau ajak teman nabung bareng. Pilih strategi yang kamu mau: cash secured put, covered call, dan lainnya!
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border-2 border-primary-500/30 rounded-2xl p-8 shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl mb-6 shadow-lg">
                  🎯
                </div>
                <div className="mb-2 text-primary-600 text-sm font-bold uppercase tracking-wider">Langkah 2</div>
                <h3 className="text-xl font-bold text-primary-600 mb-3">Atur Target & Deposit</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Tentukan target harga dan strategi DeFi yang sesuai. Deposit USDC kamu dan mulai dapat cuan.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border-2 border-primary-500/30 rounded-2xl p-8 shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center text-2xl mb-6 shadow-lg">
                  ⚡
                </div>
                <div className="mb-2 text-success-600 text-sm font-bold uppercase tracking-wider">Langkah 3</div>
                <h3 className="text-xl font-bold text-primary-600 mb-3">Raih Cuan & XP</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Dapat cashback instant, kumpulin XP dari misi, ajak teman, dan level up untuk unlock badge eksklusif!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-primary-600 mb-4">Kenapa Pilih KITA?</h2>
              <p className="text-xl text-neutral-700">Platform DeFi Options Pertama untuk Indonesia</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit 1 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Solo atau Bareng</h3>
                <p className="text-neutral-700">
                  Nabung sendiri atau ajak teman dalam satu vault. Voting system untuk keputusan grup.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Banyak Strategi</h3>
                <p className="text-neutral-700">
                  Cash secured put, covered call, buy call, buy put. Pilih sesuai risk appetite.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-success-600" />
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Gamifikasi Seru</h3>
                <p className="text-neutral-700">
                  Kumpulin XP, unlock badges, maintain streaks. Investing yang fun!
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Cepat & Murah</h3>
                <p className="text-neutral-700">
                  Built on Base Network. Gas fees rendah, settlement cepat.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Reward & Achievements</h3>
                <p className="text-neutral-700">
                  Misi harian, referral bonus, seasonal campaigns. Makin aktif, makin cuan!
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="bg-white border-2 border-primary-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-bold text-primary-600 mb-2">Aman & Transparan</h3>
                <p className="text-neutral-700">
                  Smart contract audited, on-chain transparency, security-first design.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full flex items-center justify-center
                     shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg
                     active:translate-y-1 active:shadow-hard-sm transition-all"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-800 py-12 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-2xl font-bold bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">KITA</p>
              <p className="text-sm text-stone-500 mt-1">Kolektif Investasi Tanpa Ambyar</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-stone-400">Built on <span className="text-primary-500 font-semibold">Base Network</span></p>
              <p className="text-sm text-stone-500 mt-1">© 2026 KITA. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
