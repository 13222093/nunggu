'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { ArrowLeft, TrendingUp, Wallet, DollarSign, Award, Plus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Vaults() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Dummy data untuk vaults
  const vaults = [
    {
      id: 1,
      name: 'USDC Vault',
      strategy: 'Cash-Secured Put',
      balance: 7500000,
      apy: 8.5,
      status: 'Active',
      dailyYield: 1750,
      totalEarned: 525000,
      startDate: '10 Jan 2026',
    },
    {
      id: 2,
      name: 'USDT Vault',
      strategy: 'Covered Call',
      balance: 3000000,
      apy: 7.2,
      status: 'Active',
      dailyYield: 590,
      totalEarned: 295000,
      startDate: '12 Jan 2026',
    },
    {
      id: 3,
      name: 'DAI Vault',
      strategy: 'Cash-Secured Put',
      balance: 2000000,
      apy: 9.1,
      status: 'Active',
      dailyYield: 500,
      totalEarned: 150000,
      startDate: '15 Jan 2026',
    },
  ];

  const filteredVaults = filterStatus === 'all'
    ? vaults
    : vaults.filter(vault => vault.status.toLowerCase() === filterStatus);

  const totalBalance = vaults.reduce((sum, vault) => sum + vault.balance, 0);
  const totalEarned = vaults.reduce((sum, vault) => sum + vault.totalEarned, 0);
  const activeVaults = vaults.filter(v => v.status === 'Active').length;
  const avgAPY = vaults.filter(v => v.status === 'Active').reduce((sum, v) => sum + v.apy, 0) / activeVaults || 0;

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
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard"
              className="group w-12 h-12 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6 text-[#0A4A7C] group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex-1">
              <div className="inline-block bg-gradient-to-r from-[#C15BFF] to-[#0A98FF] text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md">
                PORTFOLIO
              </div>
              <h1 className="text-4xl font-black text-white drop-shadow-lg">Semua Vault</h1>
              <p className="text-white/90 font-medium">Kelola semua vault dan posisi investasi kamu</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Total Balance</p>
                  <p className="text-xl font-black text-[#0A4A7C]">Rp {(totalBalance / 1000000).toFixed(1)}jt</p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Total Earned</p>
                  <p className="text-xl font-black text-green-600">Rp {(totalEarned / 1000000).toFixed(1)}jt</p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C15BFF] to-[#FBFF2B] rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Active Vaults</p>
                  <p className="text-xl font-black text-[#C15BFF]">{activeVaults}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">Avg APY</p>
                  <p className="text-xl font-black text-[#FFBC57]">{avgAPY.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl p-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all shadow-sm ${filterStatus === 'all'
                    ? 'bg-gradient-to-r from-[#00FFF0] to-[#0A98FF] text-white shadow-lg scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                Semua ({vaults.length})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all shadow-sm ${filterStatus === 'active'
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                Active ({vaults.filter(v => v.status === 'Active').length})
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all shadow-sm ${filterStatus === 'inactive'
                    ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                Inactive ({vaults.filter(v => v.status === 'Inactive').length})
              </button>
            </div>
          </div>

          {/* Vault List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVaults.map((vault, index) => {
              const gradients = [
                'from-[#C15BFF] to-[#0A98FF]',
                'from-[#00FFF0] to-[#0A98FF]',
                'from-[#FFBC57] to-[#FF9500]',
              ];
              const gradient = gradients[index % 3];

              return (
                <div
                  key={vault.id}
                  className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                        {vault.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-[#0A4A7C] mb-1">{vault.name}</h3>
                        <p className="text-gray-600 font-medium">{vault.strategy}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-md ${vault.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                      }`}>
                      {vault.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6 bg-gray-50 rounded-2xl p-4 border-2 border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-500">Balance</span>
                      <span className="text-[#0A4A7C] font-black">Rp {(vault.balance / 1000000).toFixed(1)}jt</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-500">APY</span>
                      <span className="text-green-600 font-black">{vault.apy}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-500">Daily Yield</span>
                      <span className="text-[#00FFF0] font-black drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Rp {(vault.dailyYield / 1000).toFixed(1)}rb</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-500">Total Earned</span>
                      <span className="text-[#C15BFF] font-black">Rp {(vault.totalEarned / 1000000).toFixed(1)}jt</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">Dimulai {vault.startDate}</span>
                    <button className="flex items-center gap-2 text-sm text-[#0A98FF] font-black group-hover:gap-3 transition-all">
                      Lihat Detail
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}
