/**
 * Leaderboard Component - KITA Design System
 *
 * Displays ranked list of users by XP
 * Features:
 * - Top 3 highlighted with medals
 * - User avatar/address
 * - Level and XP display
 *
 * Design: ExportReadyAI card style
 */

'use client';

import { cn, truncateAddress, formatCompactNumber } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  address: string;
  username?: string;
  xp: number;
  level: number;
  avatar?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserAddress?: string;
  className?: string;
}

export function Leaderboard({
  entries,
  currentUserAddress,
  className
}: LeaderboardProps) {
  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {entries.map((entry) => {
        const isCurrentUser = currentUserAddress &&
          entry.address.toLowerCase() === currentUserAddress.toLowerCase();
        const isTopThree = entry.rank <= 3;

        return (
          <div
            key={entry.address}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
              isTopThree
                ? "bg-gradient-to-r from-primary-500/10 to-transparent border-primary-500/30 shadow-hard-sm"
                : "bg-white border-stone-200",
              isCurrentUser && "ring-2 ring-secondary-500 ring-offset-2"
            )}
          >
            {/* Rank badge */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-extrabold flex-shrink-0",
              entry.rank === 1 && "bg-gradient-to-br from-amber-400 to-amber-600 text-white text-lg",
              entry.rank === 2 && "bg-gradient-to-br from-stone-300 to-stone-400 text-stone-900",
              entry.rank === 3 && "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
              entry.rank > 3 && "bg-stone-200 text-stone-700"
            )}>
              {getMedalEmoji(entry.rank) || entry.rank}
            </div>

            {/* Avatar (placeholder) */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600
                            flex items-center justify-center text-white font-bold flex-shrink-0">
              {entry.username ? entry.username[0].toUpperCase() : '👤'}
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-900 truncate">
                {entry.username || truncateAddress(entry.address)}
                {isCurrentUser && (
                  <span className="ml-2 text-xs font-semibold text-secondary-600">
                    (Kamu)
                  </span>
                )}
              </p>
              <p className="text-xs text-stone-500">Level {entry.level}</p>
            </div>

            {/* XP */}
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-primary-600">
                {formatCompactNumber(entry.xp)} XP
              </p>
            </div>
          </div>
        );
      })}

      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-400 text-lg mb-2">👑</p>
          <p className="text-stone-500">Belum ada data leaderboard</p>
          <p className="text-xs text-stone-400 mt-1">
            Mulai trading untuk masuk leaderboard!
          </p>
        </div>
      )}
    </div>
  );
}
