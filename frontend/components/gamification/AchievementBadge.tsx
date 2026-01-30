/**
 * Achievement Badge Component - KITA Design System
 *
 * Displays achievement badges in locked/unlocked states
 * Used in: Profile page, Missions page, Dashboard
 *
 * Design: ExportReadyAI card style with hard shadows
 * Locked badges: grayscale + lock icon overlay
 */

'use client';

import { cn } from '@/lib/utils';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category?: 'trading' | 'social' | 'streak' | 'milestone';
  onClick?: () => void;
}

export function AchievementBadge({
  title,
  description,
  icon,
  unlocked,
  unlockedAt,
  category = 'trading',
  onClick
}: AchievementBadgeProps) {
  const categoryColors = {
    trading: 'from-primary-500 to-primary-600',
    social: 'from-secondary-500 to-secondary-600',
    streak: 'from-orange-500 to-orange-600',
    milestone: 'from-purple-500 to-purple-600',
  };

  return (
    <div
      onClick={unlocked ? onClick : undefined}
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all",
        unlocked
          ? "bg-white border-primary-500 shadow-hard-md cursor-pointer hover:-translate-y-1 hover:shadow-hard-lg"
          : "bg-stone-800 border-stone-700 opacity-50 grayscale"
      )}
    >
      {/* Icon with gradient background */}
      <div className={cn(
        "w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl",
        unlocked
          ? `bg-gradient-to-br ${categoryColors[category]}`
          : "bg-stone-700"
      )}>
        {unlocked ? icon : '🔒'}
      </div>

      {/* Title */}
      <h3 className={cn(
        "text-center font-bold text-sm mb-1",
        unlocked ? "text-stone-900" : "text-stone-400"
      )}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn(
        "text-center text-xs",
        unlocked ? "text-stone-600" : "text-stone-500"
      )}>
        {description}
      </p>

      {/* Unlock date */}
      {unlocked && unlockedAt && (
        <p className="text-center text-xs text-primary-600 mt-2">
          {new Date(unlockedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      )}

      {/* Lock overlay for locked badges */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 bg-stone-900/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-xl">🔒</span>
          </div>
        </div>
      )}
    </div>
  );
}
