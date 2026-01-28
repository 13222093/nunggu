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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white flex items-center justify-between shadow-lg">
            <div>
                <h1 className="text-3xl font-bold mb-2">Missions</h1>
                <p className="opacity-90">Selesaikan misi untuk naik level!</p>
            </div>
            <div className="text-right">
                <p className="text-sm opacity-80">Total XP</p>
                <p className="text-4xl font-bold flex items-center gap-2">
                    <Award className="w-8 h-8 text-yellow-300" />
                    {totalXP}
                </p>
            </div>
          </div>

          {/* Mission List */}
          <div className="space-y-4">
            {isLoading ? (
                <p className="text-white text-center">Loading missions...</p>
            ) : missions.map((mission) => (
                <div 
                    key={mission.id}
                    className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all ${
                        mission.isCompleted ? 'opacity-70' : 'hover:bg-slate-800/70'
                    }`}
                >
                    <div className="flex items-start gap-4">
                        <button 
                            onClick={() => !mission.isCompleted && handleComplete(mission.id)}
                            className={`mt-1 flex-shrink-0 transition-colors ${
                                mission.isCompleted ? 'text-green-400' : 'text-slate-500 hover:text-blue-400'
                            }`}
                        >
                            {mission.isCompleted ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                <Circle className="w-6 h-6" />
                            )}
                        </button>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className={`text-lg font-bold ${mission.isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                                    {mission.title}
                                </h3>
                                <span className="text-sm font-semibold text-yellow-400 flex items-center gap-1">
                                    +{mission.xp} XP
                                </span>
                            </div>
                            <p className="text-slate-400 mb-3">{mission.description}</p>
                            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
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

