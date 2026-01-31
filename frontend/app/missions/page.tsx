'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import {
  Award, CheckCircle, Circle, ArrowRight, Trophy, Star,
  Flame, Zap, Gift, Calendar, Target, Rocket, Crown,
  Medal, Sparkles, TrendingUp, Users, ChevronRight, Share2, Heart, X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Mission {
  id: number;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  category: string;
  progress?: number;
  maxProgress?: number;
}

interface Badge {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'trading' | 'social' | 'streak' | 'milestone';
  progress?: number;
  maxProgress?: number;
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<any>(null); // For popup modal

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/missions`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMissions(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleComplete = (id: number) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, isCompleted: true } : m));
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/missions/${id}/complete`, {
      method: 'POST'
    });
  };

  // Dummy data for gamification elements
  const userStats = {
    currentXP: 2450,
    levelXP: 3000,
    level: 8,
    totalXP: 12450,
    missionsCompleted: 47,
    badgesEarned: 12,
    currentRank: 24
  };

  const streakData = {
    currentStreak: 7,
    longestStreak: 21
  };

  // Nabung Bareng Groups Data
  const nabungBarengGroups = [
    {
      id: 1,
      name: "Tim Startup Gaji Pas",
      emoji: "💼",
      strategy: "Cash-Secured Put",
      streakDays: 45,
      profit: "+8.5%",
      progress: 50,
      target: "Rp 50jt",
      current: "Rp 25jt",
      gradient: "from-[#FF6B9D] via-[#C15BFF] to-[#0A98FF]",
      members: [
        { initial: "B", name: "Budi", color: "from-[#0A98FF] to-[#C15BFF]" },
        { initial: "S", name: "Sari", color: "from-[#FF6B9D] to-[#EC4899]" },
        { initial: "A", name: "Adi", color: "from-[#0A98FF] to-[#00FFF0]" },
        { initial: "D", name: "Dewi", color: "from-[#C15BFF] to-[#9333EA]" },
        { initial: "R", name: "Rudi", color: "from-[#FFBC57] to-[#FF9500]" },
      ]
    },
    {
      id: 2,
      name: "Keluarga Sukses",
      emoji: "👨‍👩‍👧",
      strategy: "Covered Call Vault",
      streakDays: 62,
      profit: "+7.2%",
      progress: 45,
      target: "Rp 100jt",
      current: "Rp 45jt",
      gradient: "from-[#00FFF0] via-[#0A98FF] to-[#C15BFF]",
      members: [
        { initial: "M", name: "Mama", color: "from-[#EC4899] to-[#DB2777]" },
        { initial: "D", name: "Daddy", color: "from-[#0A98FF] to-[#00FFF0]" },
        { initial: "S", name: "Sisca", color: "from-[#C15BFF] to-[#9333EA]" },
        { initial: "A", name: "Andi", color: "from-[#FFBC57] to-[#FF9500]" },
        { initial: "N", name: "Nana", color: "from-[#10B981] to-[#059669]" },
        { initial: "O", name: "Oma", color: "from-[#EC4899] to-[#F97316]" },
        { initial: "O", name: "Opa", color: "from-[#0A98FF] to-[#C15BFF]" },
        { initial: "T", name: "Tante", color: "from-[#FF6B9D] to-[#EC4899]" },
      ]
    },
  ];

  const currentCampaign = {
    name: "Valentine Nabung Bareng",
    emoji: "💝",
    description: "Nabung bareng dengan pasangan, dapat bonus premium +20%!",
    endDate: new Date('2026-02-14'),
    reward: "Power Couple Badge + 500k bonus",
    participants: 1234,
    isActive: true
  };

  const badges: Badge[] = [
    { title: "First Blood", description: "Profit pertama kali", icon: "🎖️", unlocked: true, category: "trading", unlockedAt: new Date('2026-01-15') },
    { title: "Streak Master", description: "5 minggu profit berturut", icon: "🔥", unlocked: true, category: "streak", unlockedAt: new Date('2026-01-20') },
    { title: "Social Butterfly", description: "Grup 10+ orang", icon: "👥", unlocked: false, category: "social", progress: 6, maxProgress: 10 },
    { title: "Whale Hunter", description: "1 posisi 50M+", icon: "🐋", unlocked: false, category: "trading" },
    { title: "Diamond Hands", description: "Hold sampai expiry", icon: "💎", unlocked: true, category: "trading", unlockedAt: new Date('2026-01-10') },
    { title: "Sharpshooter", description: "10 posisi profitable", icon: "🎯", unlocked: false, category: "trading", progress: 7, maxProgress: 10 },
    { title: "Legend", description: "Reach Level 10", icon: "🏆", unlocked: false, category: "milestone", progress: 8, maxProgress: 10 },
    { title: "Early Bird", description: "Login pagi 7 hari", icon: "🌅", unlocked: false, category: "streak" }
  ];

  const leaderboardPreview = [
    { rank: 1, username: "CryptoNinja", xp: 25400, level: 12 },
    { rank: 2, username: "DiamondHands", xp: 22100, level: 11 },
    { rank: 3, username: "MoonBoy", xp: 19800, level: 10 },
    { rank: 4, username: "HODLER", xp: 17500, level: 10 },
    { rank: 5, username: "You", xp: userStats.totalXP, level: userStats.level }
  ];

  const totalXP = missions.reduce((acc, m) => m.isCompleted ? acc + m.xp : acc, 0);
  const dailyMissions = missions.filter(m => m.category === 'daily');
  const weeklyMissions = missions.filter(m => m.category === 'weekly');
  const specialMissions = missions.filter(m => !['daily', 'weekly'].includes(m.category));

  // Calculate time remaining for campaign
  const getTimeRemaining = () => {
    const now = new Date();
    const diff = currentCampaign.endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <>
      <Navbar />

      {/* HERO SECTION - XP Stats Dashboard */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#C15BFF] via-[#0A98FF] to-[#04877f] pt-24 pb-16">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(193,91,255,0.3),transparent_50%)] animate-pulse" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFBC57] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00FFF0] rounded-full blur-3xl opacity-20 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#FBFF2B] rounded-full blur-3xl opacity-25 animate-float-slow" />
        </div>

        {/* Floating icons */}
        {/* Trophy - Top Right */}
        <div className="absolute top-24 right-8 md:right-20 animate-bounce">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-2xl rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Trophy className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Star - Bottom Left */}
        <div className="absolute bottom-32 left-8 md:left-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-xl flex items-center justify-center shadow-xl -rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Star className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Fire - Top Left */}
        <div className="absolute top-32 left-12 md:left-24 animate-bounce" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#DC2626] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/40">
            <Flame className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Zap - Middle Right */}
        <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.8s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#C15BFF] to-[#9333EA] rounded-2xl flex items-center justify-center shadow-2xl -rotate-6 backdrop-blur-sm border-2 border-white/30">
            <Zap className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-6 border-2 border-white/30 shadow-lg">
            ⚡ GAMIFICATION HUB
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Level Up & Earn Rewards!
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Selesaikan misi, kumpulkan badge, dan naik peringkat untuk unlock reward eksklusif! 🚀
          </p>

          {/* Stats Grid - Gamified Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Total XP Card - Tilted Left */}
            <div className="transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
              <div className="relative bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform -rotate-6">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-black bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] bg-clip-text text-transparent mb-1">{userStats.totalXP.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Total XP</p>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-xs">✨</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank Card - Tilted Right */}
            <div className="transform hover:scale-110 transition-all duration-300 hover:rotate-2">
              <div className="relative bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform rotate-6">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-black bg-gradient-to-br from-[#FFBC57] to-[#FF9500] bg-clip-text text-transparent mb-1">#{userStats.currentRank}</p>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Rank</p>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-xs">🏆</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Missions Card - Tilted Left */}
            <div className="transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
              <div className="relative bg-gradient-to-br from-[#10B981] to-[#059669] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform -rotate-6">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-black bg-gradient-to-br from-[#10B981] to-[#059669] bg-clip-text text-transparent mb-1">{userStats.missionsCompleted}</p>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Missions</p>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-xs">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Card - Tilted Right */}
            <div className="transform hover:scale-110 transition-all duration-300 hover:rotate-2">
              <div className="relative bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] p-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform rotate-6">
                    <Medal className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-black bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] bg-clip-text text-transparent mb-1">{userStats.badgesEarned}</p>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">Badges</p>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-xs">🎖️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress - Gamified Design */}
          <div className="mt-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="relative bg-gradient-to-br from-[#C15BFF] via-[#0A98FF] to-[#00FFF0] rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-[22px] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <span className="text-3xl font-black text-white">{userStats.level}</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-500">Level {userStats.level}</p>
                      <p className="text-xs text-gray-400">{userStats.currentXP} / {userStats.levelXP} XP</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Next Level</p>
                    <div className="inline-block bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] rounded-xl px-3 py-1 shadow-lg">
                      <p className="text-xl font-black text-white">{userStats.level + 1}</p>
                    </div>
                  </div>
                </div>

                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner border-2 border-gray-300">
                  <div
                    className="h-full bg-gradient-to-r from-[#C15BFF] via-[#0A98FF] to-[#00FFF0] rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(userStats.currentXP / userStats.levelXP) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-30"></div>
                  </div>
                  {/* Progress percentage badge */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-0.5 shadow-lg border-2 border-purple-300 transition-all duration-500"
                    style={{ left: `calc(${(userStats.currentXP / userStats.levelXP) * 100}% - 20px)` }}
                  >
                    <p className="text-xs font-black text-purple-600">{Math.round((userStats.currentXP / userStats.levelXP) * 100)}%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center font-semibold">
                  {userStats.levelXP - userStats.currentXP} XP to level up! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEASONAL CAMPAIGN SECTION - VALENTINE THEME */}
      {currentCampaign.isActive && (
        <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#FFB6C1] via-[#FF69B4] to-[#FF1493]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,182,193,0.4),transparent_50%)] animate-pulse" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-20 w-64 h-64 bg-[#FFC0CB] rounded-full blur-3xl opacity-30 animate-float" />
            <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#FFB6D9] rounded-full blur-3xl opacity-25 animate-float-delayed" />
          </div>

          {/* Floating hearts */}
          <div className="absolute top-20 right-8 md:right-20 animate-bounce">
            <div className="text-6xl drop-shadow-2xl animate-pulse">💝</div>
          </div>

          <div className="absolute bottom-24 left-8 md:left-16 animate-bounce" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl drop-shadow-2xl animate-pulse">💕</div>
          </div>

          <div className="absolute top-32 left-1/4 animate-bounce" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl drop-shadow-2xl animate-pulse">💖</div>
          </div>

          <div className="absolute bottom-32 right-1/4 animate-bounce" style={{ animationDelay: '0.6s' }}>
            <div className="text-5xl drop-shadow-2xl animate-pulse">❤️</div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-4 border-pink-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block bg-gradient-to-r from-[#FF1493] to-[#FF69B4] text-white px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-md">
                    💝 VALENTINE SPECIAL
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#FF1493] mb-2">
                    {currentCampaign.emoji} {currentCampaign.name}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {currentCampaign.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <div className="bg-pink-50 px-4 py-2 rounded-xl border-2 border-pink-300">
                      <p className="text-xs text-pink-600 font-bold">Reward</p>
                      <p className="text-sm font-black text-[#FF1493]">{currentCampaign.reward}</p>
                    </div>
                    <div className="bg-pink-50 px-4 py-2 rounded-xl border-2 border-pink-300">
                      <p className="text-xs text-pink-600 font-bold">Participants</p>
                      <p className="text-sm font-black text-[#FF1493]">{currentCampaign.participants.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#FF1493] to-[#FF69B4] rounded-3xl p-6 shadow-2xl border-4 border-pink-200 mb-4">
                    <p className="text-xs text-white/80 font-bold mb-2">Time Left</p>
                    <div className="flex gap-2 justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
                        <p className="text-3xl font-black text-white">{timeRemaining.days}</p>
                        <p className="text-xs text-white/80 font-semibold">Days</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
                        <p className="text-3xl font-black text-white">{timeRemaining.hours}</p>
                        <p className="text-xs text-white/80 font-semibold">Hrs</p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-[#FF1493] to-[#FF69B4] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 mx-auto">
                    Join Campaign
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STREAK SYSTEM SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#F97316] via-[#DC2626] to-[#991B1B]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(249,115,22,0.3),transparent_50%)] animate-pulse" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-20 w-64 h-64 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#FF9500] rounded-full blur-3xl opacity-15 animate-float-delayed" />
        </div>

        {/* Floating fire icons */}
        <div className="absolute top-24 right-12 md:right-24 animate-bounce">
          <div className="text-6xl drop-shadow-2xl animate-pulse">🔥</div>
        </div>
        <div className="absolute top-40 left-12 md:left-24 animate-bounce" style={{ animationDelay: '0.3s' }}>
          <div className="text-5xl drop-shadow-2xl animate-pulse">🔥</div>
        </div>
        <div className="absolute bottom-32 right-20 md:right-32 animate-bounce" style={{ animationDelay: '0.6s' }}>
          <div className="text-5xl drop-shadow-2xl animate-pulse">🔥</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-4 border-2 border-white/30 shadow-lg">
              🔥 STREAK SYSTEM
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">
              Keep Your Streak Alive!
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Login dan nabung setiap hari untuk maintain streak dan unlock special rewards! 💪
            </p>
          </div>

          {/* Horizontal Scrolling Streak Cards */}
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-6 pb-4">
                {/* Solo Streak Card */}
                <div className="min-w-[90vw] md:min-w-[600px] snap-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#DC2626] rounded-xl flex items-center justify-center shadow-lg">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500">SOLO STREAK</p>
                        <h3 className="text-xl font-black text-[#0A4A7C]">Personal Progress</h3>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#DC2626] rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-4xl">
                              {streakData.currentStreak >= 30 ? "🔥🔥🔥" : streakData.currentStreak >= 7 ? "🔥🔥" : streakData.currentStreak >= 1 ? "🔥" : "💨"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">CURRENT STREAK</p>
                            <p className="text-5xl font-black text-[#0A4A7C]">{streakData.currentStreak}</p>
                            <p className="text-sm text-gray-500 font-semibold">days in a row</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                          <p className="text-xs text-gray-500 font-bold mb-2">LONGEST STREAK</p>
                          <p className="text-3xl font-black text-gray-400">🏆 {streakData.longestStreak} days</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-bold text-gray-500 mb-4">STREAK MILESTONES</p>
                        <div className="space-y-3">
                          <div className={`p-3 rounded-xl border-2 ${streakData.currentStreak >= 7 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{streakData.currentStreak >= 7 ? '✅' : '🔒'}</span>
                                <div>
                                  <p className="font-bold text-gray-700">7 Days Streak</p>
                                  <p className="text-xs text-gray-500">+100 XP Bonus</p>
                                </div>
                              </div>
                              <span className="text-xl">🔥🔥</span>
                            </div>
                          </div>

                          <div className={`p-3 rounded-xl border-2 ${streakData.currentStreak >= 30 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{streakData.currentStreak >= 30 ? '✅' : '🔒'}</span>
                                <div>
                                  <p className="font-bold text-gray-700">30 Days Streak</p>
                                  <p className="text-xs text-gray-500">Diamond Hands Badge</p>
                                </div>
                              </div>
                              <span className="text-xl">🔥🔥🔥</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl border-2 bg-gray-50 border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🔒</span>
                                <div>
                                  <p className="font-bold text-gray-700">100 Days Streak</p>
                                  <p className="text-xs text-gray-500">Legend Status</p>
                                </div>
                              </div>
                              <span className="text-xl">🔥🔥🔥🔥🔥</span>
                            </div>
                          </div>
                        </div>

                        {streakData.currentStreak >= 7 && (
                          <button className="mt-4 w-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                            Share Streak Card
                            <Sparkles className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nabung Bareng Streak - Compact Cards with Modal */}
                <div className="min-w-[90vw] md:min-w-[600px] snap-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500">NABUNG BARENG STREAK</p>
                        <h3 className="text-xl font-black text-[#0A4A7C]">Group Progress</h3>
                      </div>
                    </div>

                    {/* Compact Group Cards - Click to expand */}
                    <div className="space-y-3">
                      {nabungBarengGroups.map((group) => (
                        <div
                          key={group.id}
                          onClick={() => setSelectedGroup(group)}
                          className={`relative bg-gradient-to-r ${group.gradient} rounded-2xl p-1 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]`}
                        >
                          <div className="bg-white rounded-xl p-4 flex items-center gap-4">
                            {/* Emoji */}
                            <div className="text-4xl animate-bounce flex-shrink-0">{group.emoji}</div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-black text-[#0A4A7C] truncate">{group.name}</h4>
                              <p className="text-[10px] text-gray-500 font-bold">{group.strategy}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs font-black text-orange-500">🔥 {group.streakDays}d</span>
                                <span className="text-xs font-black text-green-500">{group.profit}</span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* View All Link */}
                      <Link href="/nabung-bareng">
                        <div className="bg-gray-100 rounded-2xl p-4 border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer">
                          <span className="text-sm font-black text-[#0A4A7C]">View All Groups</span>
                          <ChevronRight className="w-5 h-5 text-[#0A4A7C]" />
                        </div>
                      </Link>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center mt-3 font-semibold">Tap a group to see details</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* BADGES GALLERY SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#00FFF0] via-[#0A98FF] to-[#04877f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(0,255,240,0.3),transparent_50%)] animate-pulse" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-15 animate-float-delayed" />
        </div>

        {/* Floating icons */}
        <div className="absolute top-20 right-8 md:right-20 animate-bounce">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-2xl rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Medal className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="absolute bottom-24 left-8 md:left-16 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#A855F7] to-[#9333EA] rounded-xl flex items-center justify-center shadow-xl -rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Crown className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-4 border-2 border-white/30 shadow-lg">
              🏆 ACHIEVEMENT BADGES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">
              Collect & Flex Your Badges
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Unlock exclusive badges by completing missions and reaching milestones! 🎖️
            </p>
          </div>

          {/* Horizontal scrolling badges */}
          <div className="overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex gap-4 w-max min-w-full">
              {badges.map((badge, index) => (
                <div key={index} className="w-[200px] flex-shrink-0">
                  <div className={`relative p-6 rounded-2xl border-4 transition-all ${badge.unlocked
                    ? 'bg-white/95 backdrop-blur-sm border-white/50 shadow-2xl hover:-translate-y-2 hover:shadow-3xl cursor-pointer'
                    : 'bg-gray-800/90 backdrop-blur-sm border-gray-700/50 opacity-60 grayscale'
                    }`}>
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl shadow-lg ${badge.unlocked
                      ? badge.category === 'trading' ? 'bg-gradient-to-br from-[#0A98FF] to-[#04877f]' :
                        badge.category === 'social' ? 'bg-gradient-to-br from-[#FFBC57] to-[#FF9500]' :
                          badge.category === 'streak' ? 'bg-gradient-to-br from-[#F97316] to-[#DC2626]' :
                            'bg-gradient-to-br from-[#C15BFF] to-[#9333EA]'
                      : 'bg-gray-700'
                      }`}>
                      {badge.unlocked ? badge.icon : '🔒'}
                    </div>

                    {/* Title */}
                    <h3 className={`text-center font-black text-sm mb-2 ${badge.unlocked ? 'text-[#0A4A7C]' : 'text-gray-400'
                      }`}>
                      {badge.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-center text-xs mb-3 ${badge.unlocked ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                      {badge.description}
                    </p>

                    {/* Progress bar for in-progress badges */}
                    {!badge.unlocked && badge.progress && badge.maxProgress && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{badge.progress}/{badge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00FFF0] to-[#0A98FF] rounded-full transition-all duration-500"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Unlock date */}
                    {badge.unlocked && badge.unlockedAt && (
                      <p className="text-center text-xs text-[#0A98FF] mt-3 font-semibold">
                        {new Date(badge.unlockedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    )}

                    {/* Lock overlay */}
                    {!badge.unlocked && !badge.progress && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-2xl">🔒</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/profile" className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#0A4A7C] px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all border-4 border-white/50">
              View All Badges
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MISSIONS SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
        </div>

        {/* Floating icons */}
        <div className="absolute top-24 right-8 md:right-20 animate-bounce">
          <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-2xl rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Target className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="absolute bottom-32 left-8 md:left-20 animate-pulse" style={{ animationDelay: '0.6s' }}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-xl flex items-center justify-center shadow-xl -rotate-12 backdrop-blur-sm border-2 border-white/30">
            <Rocket className="w-6 h-6 text-white drop-shadow-lg" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-4 border-2 border-white/30 shadow-lg">
              ⚡ DAILY MISSIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg">
              Complete Missions, Earn XP!
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Selesaikan misi harian dan weekly untuk level up lebih cepat! 🚀
            </p>
          </div>

          {isLoading ? (
            <div className="text-white text-center text-xl font-bold animate-pulse py-12">
              Loading missions...
            </div>
          ) : (
            <div className="space-y-8">
              {/* Daily Missions */}
              {dailyMissions.length > 0 && (
                <div>
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-lg flex items-center justify-center text-sm">
                      ⚡
                    </span>
                    Daily Missions
                  </h3>
                  <div className="space-y-3">
                    {dailyMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onComplete={handleComplete} />
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Missions */}
              {weeklyMissions.length > 0 && (
                <div>
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#C15BFF] to-[#9333EA] rounded-lg flex items-center justify-center text-sm">
                      📅
                    </span>
                    Weekly Missions
                  </h3>
                  <div className="space-y-3">
                    {weeklyMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onComplete={handleComplete} />
                    ))}
                  </div>
                </div>
              )}

              {/* Special Missions */}
              {specialMissions.length > 0 && (
                <div>
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-lg flex items-center justify-center text-sm">
                      ⭐
                    </span>
                    Special Missions
                  </h3>
                  <div className="space-y-3">
                    {specialMissions.map((mission) => (
                      <MissionCard key={mission.id} mission={mission} onComplete={handleComplete} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* LEADERBOARD PREVIEW SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A8A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-20 w-64 h-64 bg-[#FBBF24] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#C15BFF] rounded-full blur-3xl opacity-15 animate-float-delayed" />
        </div>

        {/* Trophy icon */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="text-6xl drop-shadow-2xl">🏆</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4 border-2 border-white/30 shadow-lg">
              👑 LEADERBOARD
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 md:mb-3 drop-shadow-lg">
              Top Players This Month
            </h2>
            <p className="text-sm md:text-lg text-white/90 max-w-2xl mx-auto">
              Compete dengan user lain dan raih posisi teratas! 🥇
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-4 border-white/50 mb-6">
            <div className="space-y-2 md:space-y-3">
              {leaderboardPreview.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-2.5 md:gap-4 p-2.5 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all ${entry.rank <= 3
                    ? 'bg-gradient-to-r from-[#FBBF24]/10 to-transparent border-[#FBBF24]/30 shadow-lg'
                    : 'bg-gray-50 border-gray-200'
                    } ${entry.username === 'You' ? 'ring-2 md:ring-4 ring-[#C15BFF] ring-offset-1 md:ring-offset-2' : ''}`}
                >
                  {/* Rank */}
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm md:text-xl flex-shrink-0 ${entry.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900 shadow-lg' :
                      entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' :
                        'bg-gray-200 text-gray-700'
                    }`}>
                    {entry.rank <= 3 ? (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') : entry.rank}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#C15BFF] to-[#0A98FF] flex items-center justify-center text-white font-black text-sm md:text-xl flex-shrink-0 shadow-lg">
                    {entry.username[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[#0A4A7C] truncate text-sm md:text-lg">
                      {entry.username}
                      {entry.username === 'You' && (
                        <span className="ml-1 md:ml-2 text-[10px] md:text-xs font-bold text-[#C15BFF]">(You)</span>
                      )}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 font-semibold">Level {entry.level}</p>
                  </div>

                  {/* XP */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-[#0A98FF] text-sm md:text-xl">
                      {entry.xp.toLocaleString()}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500 font-semibold">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/leaderboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all border-4 border-white/30">
              View Full Leaderboard
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FULLSCREEN GROUP DETAIL MODAL */}
      {selectedGroup && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setSelectedGroup(null)}
        >
          <div
            className={`w-full md:max-w-md bg-gradient-to-br ${selectedGroup.gradient} rounded-t-3xl md:rounded-3xl p-1 max-h-[90vh] overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-t-[22px] md:rounded-[22px] p-6 max-h-[88vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedGroup(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-3 animate-bounce">{selectedGroup.emoji}</div>
                <h3 className="text-xl font-black text-[#0A4A7C] mb-1">{selectedGroup.name}</h3>
                <p className="text-sm text-gray-500 font-bold">{selectedGroup.strategy}</p>
              </div>

              {/* Big Streak Counter */}
              <div className={`bg-gradient-to-r ${selectedGroup.gradient} rounded-2xl p-5 mb-4 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10"></div>
                <p className="text-white/80 text-xs font-bold mb-1 relative z-10">🔥 STREAK</p>
                <p className="text-white text-5xl font-black mb-1 relative z-10">{selectedGroup.streakDays}</p>
                <p className="text-white/90 text-sm font-semibold relative z-10">DAYS STRONG</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 rounded-xl p-3 text-center border-2 border-green-200">
                  <p className="text-green-600 text-2xl font-black">{selectedGroup.profit}</p>
                  <p className="text-xs text-gray-500 font-bold">Profit</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center border-2 border-purple-200">
                  <p className="text-purple-600 text-2xl font-black">{selectedGroup.members.length}</p>
                  <p className="text-xs text-gray-500 font-bold">Members</p>
                </div>
              </div>

              {/* Members List - Full Names */}
              <div className="mb-4">
                <p className="text-xs font-black text-gray-500 mb-3">SQUAD MEMBERS</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.members.map((member: any, idx: number) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 bg-gradient-to-r ${member.color.replace('to-', 'to-').replace('from-', 'from-')}/10 px-3 py-2 rounded-full border border-gray-200`}
                    >
                      <div className={`w-6 h-6 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-[10px] font-black`}>
                        {member.initial}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-gray-500">PROGRESS</p>
                  <p className="text-sm font-black text-[#0A4A7C]">{selectedGroup.progress}%</p>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${selectedGroup.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${selectedGroup.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center font-semibold">
                  {selectedGroup.current} / {selectedGroup.target}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className={`w-full bg-gradient-to-r ${selectedGroup.gradient} text-white py-3.5 rounded-xl font-black text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2`}>
                  <Share2 className="w-5 h-5" />
                  Share Badge
                </button>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatBot />
    </>
  );
}

// Mission Card Component
function MissionCard({ mission, onComplete }: { mission: Mission; onComplete: (id: number) => void }) {
  return (
    <div
      className={`group bg-white/95 backdrop-blur-sm border-4 border-white/50 rounded-3xl p-6 transition-all duration-300 shadow-xl ${mission.isCompleted
        ? 'opacity-80 scale-95 grayscale'
        : 'hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl'
        }`}
    >
      <div className="flex items-start gap-5">
        <button
          onClick={() => !mission.isCompleted && onComplete(mission.id)}
          className={`mt-1 flex-shrink-0 transition-all duration-300 transform ${mission.isCompleted
            ? 'text-green-500 scale-110'
            : 'text-gray-300 hover:text-[#00FFF0] hover:scale-110'
            }`}
        >
          {mission.isCompleted ? (
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          ) : (
            <Circle className="w-10 h-10" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2 gap-4">
            <h3 className={`text-xl font-black ${mission.isCompleted ? 'text-gray-400 line-through' : 'text-[#0A4A7C]'}`}>
              {mission.title}
            </h3>
            <span className="px-3 py-1.5 bg-gradient-to-r from-[#C15BFF] to-[#0A98FF] text-white text-sm font-bold rounded-full shadow-md flex items-center gap-1.5 flex-shrink-0">
              <Award className="w-4 h-4" />
              +{mission.xp} XP
            </span>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed font-medium">{mission.description}</p>

          <div className="flex items-center gap-3">
            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
              {mission.category}
            </span>

            {mission.progress !== undefined && mission.maxProgress && (
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className="font-semibold">Progress</span>
                  <span className="font-bold">{mission.progress}/{mission.maxProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A98FF] to-[#00FFF0] rounded-full transition-all duration-500"
                    style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
