'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { ArrowLeft, Wallet, TrendingUp, AlertCircle, Shield, DollarSign, Target } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CoveredCall() {
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ETH');

  const strategyInfo = {
    name: 'Covered Call Vault',
    title: 'Nabung Aset Dapat Bunga',
    description: 'Hasilkan yield dari aset yang kamu punya dengan strategi covered call. Cocok untuk long-term holder yang mau dapat passive income.',
    apy: '6-10%',
    risk: 'Low',
    minInvestment: 2000000,
  };

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', currentAPY: 7.8, available: true },
    { symbol: 'BTC', name: 'Bitcoin', currentAPY: 6.5, available: true },
    { symbol: 'SOL', name: 'Solana', currentAPY: 9.2, available: true },
  ];

  const benefits = [
    { icon: Wallet, title: 'Passive Income', description: 'Aset tetap di tanganmu sambil dapat yield rutin' },
    { icon: Shield, title: 'Low Risk', description: 'Risiko paling rendah karena aset tetap dalam genggaman' },
    { icon: DollarSign, title: 'Premium Konsisten', description: 'Terima premium setiap kali jual covered call' },
    { icon: TrendingUp, title: 'Yield Stabil', description: 'Return konsisten cocok untuk long-term holder' },
  ];

  const howItWorks = [
    { step: 1, title: 'Deposit Aset', description: 'Masukkan aset crypto yang ingin kamu hold' },
    { step: 2, title: 'Jual Call Option', description: 'Sistem otomatis jual call option di atas harga pasar' },
    { step: 3, title: 'Terima Premium', description: 'Dapat premium sebagai passive income bulanan' },
    { step: 4, title: 'Aset Tetap Aman', description: 'Jika harga tidak naik drastis, aset tetap di tanganmu' },
  ];

  const estimatedReturns = amount ? {
    monthly: parseFloat(amount) * 0.006,
    yearly: parseFloat(amount) * 0.072,
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
              <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md">
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
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                    <Wallet className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-[#0A4A7C] mb-2">Tentang Strategi</h2>
                    <p className="text-gray-600 font-medium leading-relaxed mb-6">{strategyInfo.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl border border-green-200">
                        APY {strategyInfo.apy}
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-xl border border-green-200">
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
                      <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition-colors">
                        <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-green-700" />
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
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg flex-shrink-0">
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
              <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-green-700 mb-2 text-lg">Info Penting</h3>
                    <ul className="space-y-2 text-sm text-green-800 font-medium">
                      <li>• Jika harga naik drastis melewati strike, aset akan terjual</li>
                      <li>• Kamu tetap dapat premium meski aset terjual</li>
                      <li>• Cocok untuk yang yakin harga tidak akan pump terlalu tinggi</li>
                      <li>• Strategi terbaik untuk long-term holder yang mau passive income</li>
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
                            ? 'bg-green-50 border-green-500 shadow-lg'
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
                      placeholder="2.000.000"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-bold"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Minimal: Rp {(strategyInfo.minInvestment / 1000000).toFixed(1)}jt</p>
                </div>

                {/* Estimated Returns */}
                {estimatedReturns && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                    <h3 className="text-sm font-bold text-green-600 mb-3 flex items-center gap-2">
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.02] hover:shadow-xl border-b-4 border-black/20 active:border-b-0 active:translate-y-1'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Mulai Investasi
                </button>

                <p className="text-xs text-center text-gray-400 mt-4 font-medium">
                  Aset akan masuk ke Covered Call Vault
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
