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

        <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
          {/* HERO CARD - Player Profile (Mobile-First) */}
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-2 border-white/30 hover:border-white/40 transition-all">
            <div className="flex items-center gap-4 md:gap-6">
              {/* Level Badge/Avatar */}
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#FBFF2B] via-[#FFBC57] to-[#FF9500] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 transform hover:scale-110 hover:rotate-3 transition-all">
                  <span className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">5</span>
                </div>
                {/* XP Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#00FFF0] to-[#0A98FF] text-white text-xs font-black px-2 py-1 rounded-full border-2 border-white shadow-lg">
                  LVL 5
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-lg truncate">
                  Hi, {userData?.user?.name || 'Investor'}! 👋
                </h1>
                <p className="text-sm md:text-base text-white/80 mb-3">Trader Aktif • On Fire!</p>

                {/* XP Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs md:text-sm text-white/90 mb-1.5">
                    <span className="font-bold">XP Progress</span>
                    <span className="font-bold">350 / 500 XP</span>
                  </div>
                  <div className="relative h-3 md:h-4 bg-white/20 rounded-full overflow-hidden border-2 border-white/30 shadow-inner">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00FFF0] via-[#0A98FF] to-[#C15BFF] rounded-full transition-all duration-500"
                      style={{ width: '70%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Streak Counter */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 backdrop-blur-sm px-3 py-1.5 rounded-full border-2 border-orange-400/40">
                  <span className="text-lg md:text-xl">🔥</span>
                  <span className="text-xs md:text-sm font-black text-white">7 Day Streak!</span>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK STATS - Horizontal Scroll (Story Style) */}
          <div className="overflow-hidden -mx-4 md:mx-0">
            <div className="flex gap-3 md:gap-4 px-4 md:px-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {/* Total Balance */}
              <div className="min-w-[160px] md:min-w-[200px] flex-1 bg-gradient-to-br from-[#00FFF0]/20 to-[#0A98FF]/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border-2 border-[#00FFF0]/30 hover:scale-105 transition-all snap-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg mb-3">
                  <Wallet className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-xs md:text-sm text-white/70 mb-1 font-semibold">Total Balance</p>
                <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">
                  Rp {(stats.totalBalance / 1000000).toFixed(1)}jt
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-green-400 font-bold mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +12.5%
                </span>
              </div>

              {/* Total Yield */}
              <div className="min-w-[160px] md:min-w-[200px] flex-1 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border-2 border-green-400/30 hover:scale-105 transition-all snap-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg mb-3">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-xs md:text-sm text-white/70 mb-1 font-semibold">Total Yield</p>
                <h3 className="text-xl md:text-2xl font-black text-green-300 drop-shadow-lg">
                  Rp {(stats.totalYield / 1000000).toFixed(2)}jt
                </h3>
              </div>

              {/* Active Positions */}
              <div className="min-w-[160px] md:min-w-[200px] flex-1 bg-gradient-to-br from-[#FFBC57]/20 to-[#FF9500]/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border-2 border-[#FFBC57]/30 hover:scale-105 transition-all snap-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg mb-3">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-xs md:text-sm text-white/70 mb-1 font-semibold">Active Positions</p>
                <h3 className="text-xl md:text-2xl font-black text-[#FFBC57] drop-shadow-lg">
                  {stats.activePositions}
                </h3>
              </div>

              {/* Target Reached */}
              <div className="min-w-[160px] md:min-w-[200px] flex-1 bg-gradient-to-br from-[#C15BFF]/20 to-[#FBFF2B]/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border-2 border-[#C15BFF]/30 hover:scale-105 transition-all snap-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#C15BFF] to-[#FBFF2B] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg mb-3">
                  <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-xs md:text-sm text-white/70 mb-1 font-semibold">Target Reached</p>
                <h3 className="text-xl md:text-2xl font-black text-[#FBFF2B] drop-shadow-lg">
                  {stats.targetReached || 0}%
                </h3>
              </div>
            </div>
          </div>

          {/* DAILY MISSION BANNER */}
          <Link href="/missions" className="block group">
            <div className="bg-gradient-to-r from-[#C15BFF]/30 via-[#0A98FF]/30 to-[#00FFF0]/30 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl border-2 border-[#C15BFF]/40 hover:border-[#C15BFF]/60 transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FBFF2B] to-[#FFBC57] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform flex-shrink-0">
                  <Target className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-black text-white mb-1 drop-shadow-lg">Misi Harian: Trade 1x Hari Ini! 🎯</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2.5 md:h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                      <div className="h-full bg-gradient-to-r from-[#00FFF0] to-[#0A98FF] rounded-full transition-all" style={{ width: '40%' }} />
                    </div>
                    <span className="text-xs md:text-sm font-black text-[#FBFF2B] whitespace-nowrap">+100 XP</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/80 font-semibold">0 / 1 trade • Tap untuk lihat semua misi →</p>
                </div>
              </div>
            </div>
          </Link>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              onClick={() => setShowSoloModal(true)}
              className="group relative overflow-hidden bg-gradient-to-br from-[#00FFF0]/20 to-[#0A98FF]/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#00FFF0]/40 hover:border-[#00FFF0]/60 hover:scale-[1.02] hover:-translate-y-1 transition-all text-left"
            >
              {/* Animated background orb */}
              <div className="absolute -right-8 -top-8 w-32 h-32 md:w-40 md:h-40 bg-[#00FFF0] rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform flex-shrink-0">
                  <Plus className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg mb-1">Nabung Solo 💎</h3>
                  <p className="text-sm md:text-base text-white/90">APY hingga 9% • Mulai dari 100rb</p>
                </div>
              </div>
            </button>

            <Link href="/nabung-bareng" className="group relative overflow-hidden block bg-gradient-to-br from-[#C15BFF]/20 to-[#0A98FF]/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#C15BFF]/40 hover:border-[#C15BFF]/60 hover:scale-[1.02] hover:-translate-y-1 transition-all text-left">
              {/* Animated background orb */}
              <div className="absolute -right-8 -top-8 w-32 h-32 md:w-40 md:h-40 bg-[#C15BFF] rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform flex-shrink-0">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg mb-1">Nabung Bareng 👥</h3>
                  <p className="text-sm md:text-base text-white/90">Investasi bareng temen • Lebih seru!</p>
                </div>
              </div>
            </Link>
          </div>

          {/* ACTIVE POSITIONS - Horizontal Scroll */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">Active Positions 🚀</h2>
              <Link href="/vaults" className="text-sm md:text-base font-bold text-[#00FFF0] hover:text-[#ACFFFC] transition-colors">
                View All →
              </Link>
            </div>

            <div className="overflow-hidden -mx-4 md:mx-0">
              <div className="flex gap-4 px-4 md:px-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
                {positions.map((position: Position, index: number) => {
                  const gradients = [
                    { from: '#00FFF0', to: '#0A98FF' },
                    { from: '#C15BFF', to: '#0A98FF' },
                    { from: '#FFBC57', to: '#FF9500' },
                  ];
                  const gradient = gradients[index % 3];

                  return (
                    <div
                      key={position.id}
                      className="min-w-[280px] md:min-w-[320px] flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl border-2 border-white/20 hover:border-white/40 hover:scale-105 transition-all snap-start"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                          >
                            {position.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-white text-base md:text-lg">{position.name}</h4>
                            <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-300 text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/30">
                              {position.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/70">Balance</span>
                          <span className="font-black text-white text-lg md:text-xl drop-shadow-lg">
                            Rp {(position.balance / 1000000).toFixed(1)}jt
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/70">APY</span>
                          <span className="font-bold text-green-300 text-base md:text-lg">{position.apy}%</span>
                        </div>
                      </div>

                      {/* Mini chart placeholder */}
                      <div className="h-12 bg-white/5 rounded-xl flex items-end gap-1 px-2 overflow-hidden">
                        {[40, 60, 45, 75, 50, 80, 65, 90].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t rounded-t transition-all hover:opacity-80"
                            style={{
                              height: `${height}%`,
                              background: `linear-gradient(to top, ${gradient.from}, ${gradient.to})`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Add Position Card */}
                <button
                  onClick={() => setShowSoloModal(true)}
                  className="min-w-[280px] md:min-w-[320px] flex-shrink-0 bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 shadow-xl border-2 border-dashed border-white/30 hover:border-white/50 hover:bg-white/10 transition-all snap-start flex flex-col items-center justify-center gap-3 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-white text-lg">Tambah Posisi Baru</p>
                  <p className="text-sm text-white/70">Mulai strategi baru</p>
                </button>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITIES - Timeline Style */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">Recent Activities 📊</h2>
              <Link href="/history" className="text-sm md:text-base font-bold text-[#00FFF0] hover:text-[#ACFFFC] transition-colors">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="relative flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl hover:bg-white/10 transition-all border border-white/10">
                  {/* Timeline dot */}
                  {index !== recentActivities.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-6 bg-white/20" />
                  )}

                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    activity.type === 'deposit' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                    activity.type === 'yield' ? 'bg-gradient-to-br from-[#00FFF0] to-[#0A98FF]' :
                    'bg-gradient-to-br from-red-400 to-red-600'
                  }`}>
                    {activity.type === 'deposit' ? (
                      <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : activity.type === 'yield' ? (
                      <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm md:text-base">{activity.action}</p>
                    <p className="text-xs md:text-sm text-white/70">{activity.date}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className={`font-black text-base md:text-lg ${
                      activity.type === 'withdraw' ? 'text-red-400' : 'text-green-300'
                    }`}>
                      {activity.type === 'withdraw' ? '-' : '+'}Rp {(activity.amount / 1000).toFixed(0)}rb
                    </p>
                  </div>
                </div>
              ))}
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
