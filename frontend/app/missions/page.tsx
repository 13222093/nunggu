'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { Award, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Mission {
  id: number;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  category: string;
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    // Optimistic update
    setMissions(prev => prev.map(m => m.id === id ? { ...m, isCompleted: true } : m));

    // Call API (fire and forget for demo)
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/missions/${id}/complete`, {
      method: 'POST'
    });
  };

  const totalXP = missions.reduce((acc, m) => m.isCompleted ? acc + m.xp : acc, 0);

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

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm border-4 border-white/50 rounded-3xl p-8 flex items-center justify-between shadow-2xl">
            <div>
              <div className="inline-block bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-md">
                ⚡ DAILY MISSIONS
              </div>
              <h1 className="text-4xl font-black text-[#0A4A7C] mb-2">Missions</h1>
              <p className="text-gray-600">Selesaikan misi untuk naik level!</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-500 mb-1">Total XP</p>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border-2 border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FFBC57] to-[#FF9500] rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-black text-[#0A4A7C]">
                  {totalXP}
                </p>
              </div>
            </div>
          </div>

          {/* Mission List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-white text-center animate-pulse text-xl font-bold">Loading missions...</div>
            ) : missions.map((mission) => (
              <div
                key={mission.id}
                className={`group bg-white/95 backdrop-blur-sm border-4 border-white/50 rounded-3xl p-6 transition-all duration-300 shadow-xl ${mission.isCompleted ? 'opacity-80 scale-95 grayscale' : 'hover:scale-[1.02] hover:-translate-y-1'
                  }`}
              >
                <div className="flex items-start gap-5">
                  <button
                    onClick={() => !mission.isCompleted && handleComplete(mission.id)}
                    className={`mt-1 flex-shrink-0 transition-all duration-300 transform ${mission.isCompleted ? 'text-green-500 scale-110' : 'text-gray-300 hover:text-[#00FFF0] hover:scale-110'
                      }`}
                  >
                    {mission.isCompleted ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : (
                      <Circle className="w-8 h-8" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-black ${mission.isCompleted ? 'text-gray-400 line-through' : 'text-[#0A4A7C]'}`}>
                        {mission.title}
                      </h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-[#C15BFF] to-[#0A98FF] text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        +{mission.xp} XP
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed font-medium">{mission.description}</p>
                    <span className="inline-block text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                      {mission.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

