/**
 * Streak Counter Component - KITA Design System
 *
 * Displays current streak and longest streak
 * Fire emoji intensity based on streak length (Duolingo style)
 *
 * Used in: Dashboard, Profile
 */

'use client';

import { cn } from '@/lib/utils';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  className
}: StreakCounterProps) {
  // Fire intensity based on streak length (Duolingo pattern)
  const getFireEmoji = () => {
    if (currentStreak >= 30) return "🔥🔥🔥";
    if (currentStreak >= 7) return "🔥🔥";
    if (currentStreak >= 1) return "🔥";
    return "💨"; // No streak
  };

  const getStreakColor = () => {
    if (currentStreak >= 30) return "from-orange-500 to-orange-600";
    if (currentStreak >= 7) return "from-orange-400 to-orange-500";
    return "from-secondary-500 to-orange-600";
  };

  return (
    <div className={cn(
      "bg-white border-2 border-primary-500/30 rounded-2xl p-6",
      "shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg transition-all",
      className
    )}>
      <div className="flex items-center gap-4">
        {/* Fire icon */}
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center text-3xl",
          `bg-gradient-to-br ${getStreakColor()}`
        )}>
          {getFireEmoji()}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
            Streak Aktif
          </h3>
          <p className="text-3xl font-extrabold text-stone-900">
            {currentStreak} Hari
          </p>
          <p className="text-xs text-stone-400">
            Terbaik: {longestStreak} hari
          </p>
        </div>
      </div>

      {/* Motivational message */}
      {currentStreak === 0 && (
        <p className="mt-4 text-xs text-stone-500 text-center">
          Mulai streak kamu hari ini! 🚀
        </p>
      )}
      {currentStreak >= 7 && currentStreak < 30 && (
        <p className="mt-4 text-xs text-orange-600 text-center font-semibold">
          Keren! Pertahankan terus! 💪
        </p>
      )}
      {currentStreak >= 30 && (
        <p className="mt-4 text-xs text-orange-600 text-center font-semibold">
          LEGEND! Diamond Hands! 💎🔥
        </p>
      )}
    </div>
  );
}
