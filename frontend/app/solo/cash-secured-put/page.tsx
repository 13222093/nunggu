'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { ArrowLeft, DollarSign, TrendingUp, AlertCircle, CheckCircle, Calendar, Target, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CashSecuredPut() {
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('USDC');

  const strategyInfo = {
    name: 'Cash-Secured Put',
    title: 'Beli Murah Dapat Cashback',
    description: 'Dapat premium dengan menjual opsi put. Cocok untuk beli aset di harga lebih murah dengan risiko yang terukur.',
    apy: '8-12%',
    risk: 'Medium',
    minInvestment: 1000000,
  };

  const assets = [
    { symbol: 'USDC', name: 'USD Coin', currentAPY: 8.5, available: true },
    { symbol: 'USDT', name: 'Tether', currentAPY: 8.2, available: true },
    { symbol: 'DAI', name: 'Dai Stablecoin', currentAPY: 9.1, available: true },
  ];

  const benefits = [
    { icon: DollarSign, title: 'Premium Income', description: 'Dapatkan premium langsung saat menjual opsi put' },
    { icon: Target, title: 'Beli Lebih Murah', description: 'Kesempatan membeli aset di harga strike yang lebih rendah' },
    { icon: Shield, title: 'Risiko Terukur', description: 'Maksimal loss sudah diketahui sejak awal (strike price)' },
    { icon: TrendingUp, title: 'APY Stabil', description: 'Yield konsisten dari premium yang diterima' },
  ];

  const howItWorks = [
    { step: 1, title: 'Pilih Aset & Jumlah', description: 'Tentukan aset yang ingin kamu beli dan jumlah investasi' },
    { step: 2, title: 'Jual Opsi Put', description: 'Sistem menjual opsi put dengan strike price di bawah harga pasar' },
    { step: 3, title: 'Terima Premium', description: 'Langsung dapat premium sebagai income pasif' },
    { step: 4, title: 'Exercise atau Expire', description: 'Jika harga turun di bawah strike, kamu beli aset lebih murah. Jika tidak, premium jadi profit' },
  ];

  const estimatedReturns = amount ? {
    monthly: parseFloat(amount) * 0.008,
    yearly: parseFloat(amount) * 0.096,
  } : null;

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f] pt-24 px-4 pb-24 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00FFF0] rounded-full blur-3xl opacity-25 animate-float-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard"
              className="group w-12 h-12 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6 text-[#0A4A7C] group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <div className="inline-block bg-gradient-to-r from-[#C15BFF] to-[#0A98FF] text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md">
                STRATEGY
              </div>
              <h1 className="text-4xl font-black text-white drop-shadow-lg">{strategyInfo.title}</h1>
              <p className="text-white/90 font-medium">{strategyInfo.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Strategy Overview */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-[#0A4A7C] mb-2">Tentang Strategi</h2>
                    <p className="text-gray-600 font-medium leading-relaxed mb-6">{strategyInfo.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl border border-green-200">
                        APY {strategyInfo.apy}
                      </span>
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-xl border border-yellow-200">
                        Risk: {strategyInfo.risk}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
                <h2 className="text-2xl font-black text-[#0A4A7C] mb-8">Keuntungan Strategi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0A4A7C] mb-1">{benefit.title}</h3>
                          <p className="text-sm text-gray-500 font-medium">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
                <h2 className="text-2xl font-black text-[#0A4A7C] mb-8">Cara Kerja</h2>
                <div className="space-y-6">
                  {howItWorks.map((item) => (
                    <div key={item.step} className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-lg font-bold text-[#0A4A7C] mb-1">{item.title}</h3>
                        <p className="text-gray-600 font-medium">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Warning */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-yellow-700 mb-2 text-lg">Perhatian</h3>
                    <ul className="space-y-2 text-sm text-yellow-800 font-medium">
                      <li>• Kamu wajib beli aset jika harga turun di bawah strike price</li>
                      <li>• Maksimal profit terbatas pada premium yang diterima</li>
                      <li>• Pastikan kamu siap hold aset jangka panjang jika ter-exercise</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Investment Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 sticky top-24">
                <h2 className="text-2xl font-black text-[#0A4A7C] mb-6">Mulai Investasi</h2>

                {/* Asset Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-500 mb-3">Pilih Aset</label>
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <button
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(asset.symbol)}
                        className={`w-full p-4 rounded-xl transition-all text-left border-2 ${selectedAsset === asset.symbol
                          ? 'bg-blue-50 border-[#0A98FF] shadow-lg'
                          : 'bg-white border-gray-100 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold ${selectedAsset === asset.symbol ? 'text-[#0A4A7C]' : 'text-gray-700'}`}>{asset.symbol}</span>
                          <span className="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded-lg">{asset.currentAPY}% APY</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{asset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-500 mb-2">Jumlah Investasi</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1.000.000"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0A98FF] focus:bg-white transition-all font-bold"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Minimal: Rp {(strategyInfo.minInvestment / 1000000).toFixed(1)}jt</p>
                </div>

                {/* Estimated Returns */}
                {estimatedReturns && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                    <h3 className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Estimasi Return
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Per Bulan</span>
                        <span className="text-[#0A4A7C] font-black">Rp {(estimatedReturns.monthly / 1000).toFixed(0)}rb</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Per Tahun</span>
                        <span className="text-green-600 font-black">Rp {(estimatedReturns.yearly / 1000000).toFixed(1)}jt</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  disabled={!amount || parseFloat(amount) < strategyInfo.minInvestment}
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg text-lg ${amount && parseFloat(amount) >= strategyInfo.minInvestment
                    ? 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white hover:scale-[1.02] hover:shadow-xl border-b-4 border-black/20 active:border-b-0 active:translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Mulai Investasi
                </button>

                <p className="text-xs text-center text-gray-400 mt-4 font-medium">
                  Dana akan langsung dialokasikan ke strategi Cash-Secured Put
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}
