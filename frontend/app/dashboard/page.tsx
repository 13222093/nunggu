'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { TrendingUp, Wallet, Target, Award, ArrowUpRight, ArrowDownRight, Plus, Users, X, TrendingDown, DollarSign, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Position {
  id: number;
  name: string;
  apy: number;
  balance: number;
  status: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [showSoloModal, setShowSoloModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  // Data dummy (fallback)
  const defaultStats = {
    totalBalance: 0,
    totalYield: 0,
    activePositions: 0,
    monthlyReturn: 0,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // Get session & Guest Data
      const sessionStr = localStorage.getItem('userSession');
      const guestDataStr = localStorage.getItem('userData');

      // If neither exists, redirect to login
      if (!sessionStr && !guestDataStr) {
        router.push('/login');
        return;
      }

      // Handle Guest Mode
      if (!sessionStr && guestDataStr) {
        const guestUser = JSON.parse(guestDataStr);
        setUserData({
          user: {
            name: guestUser.fullName || 'Guest',
            email: guestUser.email
          },
          stats: defaultStats,
          positions: [
            {
              id: 1,
              name: 'ETH Covered Call',
              apy: 5.2,
              balance: 15000000,
              status: 'Active'
            }
          ], // Provide some dummy data for guest to see UI
          history: []
        });
        setIsLoading(false);
        return;
      }

      // Normal Auth Flow
      const session = JSON.parse(sessionStr!);
      // Determine identity (wallet or phone)
      // The API accepts either, but let's use what we have. 
      // Auth router returns id, phoneNumber, walletAddress.
      const identifier = session.walletAddress || session.phoneNumber;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/user/profile/${identifier}`);
        const data = await res.json();

        if (data.success) {
          setUserData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const stats = userData?.stats || defaultStats;
  const positions = userData?.positions || [];
  // const recentActivities = userData?.history || []; // Backend not sending history yet, keep dummy or empty

  const soloStrategies = [
    {
      id: 1,
      title: 'Beli Murah Dapat Cashback',
      subtitle: 'Cash-Secured Put',
      description: 'Dapat premium dengan menjual opsi put. Cocok untuk beli aset di harga lebih murah.',
      icon: DollarSign,
      color: 'blue',
      risk: 'Medium',
    },
    {
      id: 2,
      title: 'Nabung Aset Dapat Bunga',
      subtitle: 'Covered Call Vault',
      description: 'Hasilkan yield dari aset yang kamu punya dengan strategi covered call.',
      icon: Wallet,
      color: 'green',
      risk: 'Low',
    },
    {
      id: 3,
      title: 'Modal Receh, Potensi Jackpot',
      subtitle: 'Buy Call',
      description: 'Beli opsi call untuk profit dari kenaikan harga dengan risiko terbatas.',
      icon: Zap,
      color: 'purple',
      risk: 'High',
    },
    {
      id: 4,
      title: 'Tiket Cuan Pas Turun',
      subtitle: 'Buy Put',
      description: 'Beli opsi put untuk profit dari penurunan harga dengan risiko terbatas.',
      icon: TrendingDown,
      color: 'red',
      risk: 'High',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Deposit', amount: 5000000, date: '2 jam lalu', type: 'deposit' },
    { id: 2, action: 'Yield Earned', amount: 150000, date: '1 hari lalu', type: 'yield' },
    { id: 3, action: 'Withdraw', amount: 2000000, date: '3 hari lalu', type: 'withdraw' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f] flex items-center justify-center">
        <div className="text-white text-xl animate-pulse drop-shadow-lg">Memuat Data Portfolio...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f] pt-24 px-4 pb-24 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FFBC57] rounded-full blur-3xl opacity-20 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00FFF0] rounded-full blur-3xl opacity-25 animate-float-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-4 border-2 border-white/30 shadow-lg">
              💼 DASHBOARD
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg">
              Hi, {userData?.user?.name || 'Investor'}! 👋
            </h1>
            <p className="text-lg text-white/90">Lihat portfolio dan semua yield kamu di sini.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setShowSoloModal(true)}
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-left"
              style={{ boxShadow: '0 20px 60px rgba(0,255,240,0.3)' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A4A7C] mb-1">Nabung Solo</h3>
                  <p className="text-gray-700">Mulai investasi sendiri dengan APY hingga 9%</p>
                </div>
              </div>
            </button>

            <Link href="/nabung-bareng" className="group block bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 text-left"
              style={{ boxShadow: '0 20px 60px rgba(193,91,255,0.3)' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#0A4A7C] mb-1">Nabung Bareng</h3>
                  <p className="text-gray-700">Investasi bersama teman dan keluarga</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Balance */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-green-500 font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" />
                  +12.5%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">Total Balance</p>
              <h3 className="text-3xl font-black text-[#0A4A7C]">
                Rp {(stats.totalBalance / 1000000).toFixed(1)}jt
              </h3>
            </div>

            {/* Total Yield */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">Total Yield</p>
              <h3 className="text-3xl font-black text-green-600">
                Rp {(stats.totalYield / 1000000).toFixed(2)}jt
              </h3>
            </div>

            {/* Target Reached */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C15BFF] to-[#FBFF2B] rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">Target Reached</p>
              <h3 className="text-3xl font-black text-[#C15BFF]">
                {stats.targetReached}%
              </h3>
            </div>

            {/* Active Positions */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">Active Positions</p>
              <h3 className="text-3xl font-black text-[#FFBC57]">
                {stats.activePositions}
              </h3>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Positions */}
            <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
              <h2 className="text-2xl font-black text-[#0A4A7C] mb-6">Active Positions</h2>
              <div className="space-y-4">
                {positions.map((position: Position, index: number) => {
                  const gradients = [
                    'from-[#00FFF0] to-[#0A98FF]',
                    'from-[#C15BFF] to-[#0A98FF]',
                    'from-[#FFBC57] to-[#FF9500]',
                  ];
                  return (
                    <div
                      key={position.id}
                      className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border-2 border-gray-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${gradients[index % 3]} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                          {position.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0A4A7C] text-lg">{position.name}</h4>
                          <p className="text-sm text-gray-600">
                            APY: <span className="text-green-600 font-bold">{position.apy}%</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#0A4A7C] text-lg">
                          Rp {(position.balance / 1000000).toFixed(1)}jt
                        </p>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                          {position.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/vaults" className="block w-full mt-6 py-5 bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white rounded-xl font-bold text-center shadow-[0_8px_0_0_rgba(255,149,0,0.4)] hover:shadow-[0_12px_0_0_rgba(255,149,0,0.4)] hover:-translate-y-1 active:translate-y-2 active:shadow-[0_4px_0_0_rgba(255,149,0,0.4)] transition-all border-2 border-white/20">
                View All Positions
              </Link>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
              <h2 className="text-2xl font-black text-[#0A4A7C] mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === 'deposit' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-500" />
                      ) : activity.type === 'yield' ? (
                        <TrendingUp className="w-5 h-5 text-[#00FFF0]" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#0A4A7C]">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                    <p
                      className={`text-sm font-bold ${activity.type === 'withdraw' ? 'text-red-500' : 'text-green-600'
                        }`}
                    >
                      {activity.type === 'withdraw' ? '-' : '+'}
                      Rp {(activity.amount / 1000).toFixed(0)}rb
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/history" className="block w-full mt-6 py-4 bg-gray-100 text-[#0A4A7C] rounded-xl hover:bg-gray-200 transition-all text-center font-bold">
                View History
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solo Strategy Modal */}
      {showSoloModal && (
        <div className="fixed inset-0 bg-[#0A4A7C]/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/10 backdrop-blur-md border-b-2 border-white/20 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-heading text-white mb-1">Pilih Strategi Nabung Solo</h2>
                <p className="text-body text-white/70">Pilih strategi yang sesuai dengan tujuan investasimu</p>
              </div>
              <button
                onClick={() => setShowSoloModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soloStrategies.map((strategy) => {
                  const Icon = strategy.icon;
                  const colorClasses = {
                    blue: 'bg-[#0284C7]/20 text-[#00FFF0] group-hover:bg-[#0284C7]/30',
                    green: 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30',
                    purple: 'bg-[#A855F7]/20 text-[#A855F7] group-hover:bg-[#A855F7]/30',
                    red: 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30',
                  };
                  const riskColors = {
                    Low: 'bg-green-500/20 text-green-400',
                    Medium: 'bg-yellow-500/20 text-yellow-400',
                    High: 'bg-red-500/20 text-red-400',
                  };

                  const strategyLinks: { [key: number]: string } = {
                    1: '/solo/cash-secured-put',
                    2: '/solo/covered-call',
                    3: '/solo/buy-call',
                    4: '/solo/buy-put',
                  };

                  return (
                    <Link
                      key={strategy.id}
                      href={strategyLinks[strategy.id]}
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all text-left group block"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${colorClasses[strategy.color as keyof typeof colorClasses]}`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="subheading text-white mb-1">{strategy.title}</h3>
                          <p className="text-sm text-white/70 mb-2">{strategy.subtitle}</p>
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${riskColors[strategy.risk as keyof typeof riskColors]}`}>
                            Risk: {strategy.risk}
                          </span>
                        </div>
                      </div>
                      <p className="body-text text-white/90">{strategy.description}</p>
                      <div className="mt-4 pt-4 border-t-2 border-white/20">
                        <span className="text-sm text-[#00FFF0] font-semibold group-hover:text-[#ACFFFC] transition-colors">
                          Pilih Strategi →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatBot />
    </>
  );
}
