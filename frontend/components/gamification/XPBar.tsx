/**
 * XP Bar Component - KITA Design System
 *
 * Displays user's current level, XP progress to next level
 * Used in: Navbar (compact), Dashboard, Profile (large)
 *
 * Design: ExportReadyAI-inspired with blue fill, shimmer animation
 */

'use client';

import { cn } from '@/lib/utils';

interface XPBarProps {
  currentXP: number;
  levelXP: number;
  level: number;
  variant?: 'compact' | 'default' | 'large';
  className?: string;
}

export function XPBar({
  currentXP,
  levelXP,
  level,
  variant = 'default',
  className
}: XPBarProps) {
  const progress = Math.min((currentXP / levelXP) * 100, 100);

  // Compact variant for Navbar
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {/* Level badge */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600
                        flex items-center justify-center shadow-sm">
          <span className="text-xs font-extrabold text-white">{level}</span>
        </div>

        {/* Mini progress bar */}
        <div className="relative h-2 w-20 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600
                       transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Large variant for Profile page
  if (variant === 'large') {
    return (
      <div className={cn('w-full', className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600
                            flex items-center justify-center shadow-hard-sm">
              <span className="text-xl font-extrabold text-white">{level}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-400">Level {level}</p>
              <p className="text-xs text-stone-500">{currentXP} / {levelXP} XP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-500">Selanjutnya</p>
            <p className="text-lg font-bold text-primary-500">Level {level + 1}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-4 bg-stone-800 rounded-full overflow-hidden border-2 border-stone-700">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600
                       transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          -translate-x-full animate-shimmer" />
        </div>

        {/* Percentage */}
        <p className="text-xs text-stone-500 mt-2 text-right">
          {Math.round(progress)}% menuju level selanjutnya
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('w-full', className)}>
      {/* Level badge and stats */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-stone-400">Level {level}</span>
        <span className="text-xs text-stone-500">{currentXP} / {levelXP} XP</span>
      </div>

      {/* Progress bar with blue fill */}
      <div className="relative h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600
                     transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -translate-x-full animate-shimmer" />
      </div>
    </div>
  );
}
