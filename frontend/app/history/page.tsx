'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Users, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function History() {
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdraw' | 'yield'>('all');

  // Dummy data untuk history
  const activities = [
    { id: 1, type: 'deposit', action: 'Deposit', amount: 5000000, date: '21 Jan 2026', time: '14:30', description: 'Deposit ke USDC Vault' },
    { id: 2, type: 'yield', action: 'Yield Earned', amount: 150000, date: '20 Jan 2026', time: '00:00', description: 'Daily yield dari USDC Vault' },
    { id: 3, type: 'deposit', action: 'Deposit', amount: 3000000, date: '19 Jan 2026', time: '10:15', description: 'Deposit ke USDT Vault' },
    { id: 4, type: 'withdraw', action: 'Withdraw', amount: 2000000, date: '18 Jan 2026', time: '16:45', description: 'Withdraw dari DAI Vault' },
    { id: 5, type: 'yield', action: 'Yield Earned', amount: 125000, date: '17 Jan 2026', time: '00:00', description: 'Daily yield dari USDT Vault' },
    { id: 6, type: 'deposit', action: 'Group Contribution', amount: 10000000, date: '16 Jan 2026', time: '09:20', description: 'Kontribusi ke Tim Startup Gaji Pas' },
    { id: 7, type: 'yield', action: 'Yield Earned', amount: 180000, date: '15 Jan 2026', time: '00:00', description: 'Daily yield dari USDC Vault' },
    { id: 8, type: 'withdraw', action: 'Withdraw', amount: 1500000, date: '14 Jan 2026', time: '11:30', description: 'Withdraw dari USDC Vault' },
    { id: 9, type: 'deposit', action: 'Deposit', amount: 8000000, date: '13 Jan 2026', time: '15:00', description: 'Deposit ke DAI Vault' },
    { id: 10, type: 'yield', action: 'Yield Earned', amount: 95000, date: '12 Jan 2026', time: '00:00', description: 'Daily yield dari DAI Vault' },
  ];

  const filteredActivities = filterType === 'all'
    ? activities
    : activities.filter(activity => activity.type === filterType);

  const totalDeposits = activities.filter(a => a.type === 'deposit').reduce((sum, a) => sum + a.amount, 0);
  const totalWithdraws = activities.filter(a => a.type === 'withdraw').reduce((sum, a) => sum + a.amount, 0);
  const totalYield = activities.filter(a => a.type === 'yield').reduce((sum, a) => sum + a.amount, 0);

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
            <div>
              <div className="inline-block bg-gradient-to-r from-[#00FFF0] to-[#0A98FF] text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md">
                HISTORY
              </div>
              <h1 className="text-4xl font-black text-white drop-shadow-lg">Riwayat Transaksi</h1>
              <p className="text-white/90 font-medium">Semua aktivitas deposit, withdraw, dan yield</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center border border-green-200 shadow-md">
                  <ArrowDownRight className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Deposits</p>
                  <p className="text-2xl font-black text-[#0A4A7C]">Rp {(totalDeposits / 1000000).toFixed(1)}jt</p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center border border-red-200 shadow-md">
                  <ArrowUpRight className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Withdraws</p>
                  <p className="text-2xl font-black text-[#0A4A7C]">Rp {(totalWithdraws / 1000000).toFixed(1)}jt</p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center border border-blue-200 shadow-md">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Yield</p>
                  <p className="text-2xl font-black text-[#0A4A7C]">Rp {(totalYield / 1000000).toFixed(1)}jt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-2 shadow-lg">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-6 h-6 text-[#0A4A7C] ml-3 mr-1" />
              {['all', 'deposit', 'withdraw', 'yield'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`flex-1 py-3 px-6 rounded-xl transition-all font-bold whitespace-nowrap ${filterType === type
                      ? 'bg-gradient-to-r from-[#C15BFF] to-[#0A98FF] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#0A4A7C] hover:bg-white/50'
                    }`}
                >
                  {type === 'all' ? 'Semua' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 min-h-[500px]">
            <h2 className="text-2xl font-black text-[#0A4A7C] mb-8 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              {filterType === 'all' ? 'Semua Aktivitas' : `Aktivitas ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}
            </h2>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-100 group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform ${activity.type === 'deposit'
                      ? 'bg-green-100 border-green-200'
                      : activity.type === 'yield'
                        ? 'bg-blue-100 border-blue-200'
                        : 'bg-red-100 border-red-200'
                    }`}>
                    {activity.type === 'deposit' ? (
                      <ArrowDownRight className="w-6 h-6 text-green-600" />
                    ) : activity.type === 'yield' ? (
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[#0A4A7C] font-bold text-lg">{activity.action}</p>
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${activity.type === 'deposit'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : activity.type === 'yield'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }`}>
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.date}
                      </span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-black tracking-tight ${activity.type === 'withdraw' ? 'text-red-500' : 'text-green-500'
                      }`}>
                      {activity.type === 'withdraw' ? '-' : '+'}Rp {(activity.amount / 1000000).toFixed(1)}jt
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}
