/**
 * Mission Card Component - KITA Design System
 *
 * Displays mission progress with:
 * - Title, description
 * - XP reward
 * - Progress bar
 * - Completion state
 *
 * Design: ExportReadyAI card style with hard shadows
 */

'use client';

import { cn } from '@/lib/utils';

interface MissionCardProps {
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  total: number;
  icon: string;
  completed: boolean;
  type?: 'daily' | 'weekly' | 'achievement';
  onComplete?: () => void;
}

export function MissionCard({
  title,
  description,
  xpReward,
  progress,
  total,
  icon,
  completed,
  type = 'daily',
  onComplete
}: MissionCardProps) {
  const progressPercent = Math.min((progress / total) * 100, 100);

  const typeColors = {
    daily: 'border-primary-500/30',
    weekly: 'border-secondary-500/30',
    achievement: 'border-purple-500/30',
  };

  return (
    <div
      className={cn(
        "bg-white border-2 rounded-2xl p-6 transition-all",
        completed
          ? "border-success-500 shadow-[0_4px_0_0_rgba(34,197,94,0.3)]"
          : `${typeColors[type]} shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg`,
        !completed && "cursor-pointer"
      )}
      onClick={!completed ? onComplete : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
          completed
            ? "bg-success-500"
            : "bg-gradient-to-br from-primary-500 to-primary-600"
        )}>
          {completed ? "✅" : icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title and XP */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-stone-900">{title}</h3>
            <span className="text-secondary-500 font-bold text-sm whitespace-nowrap ml-2">
              +{xpReward} XP
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 mb-3">{description}</p>

          {/* Progress bar */}
          <div className="relative h-2 bg-stone-200 rounded-full overflow-hidden mb-1">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600
                         transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Shimmer effect */}
            {!completed && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                              -translate-x-full animate-shimmer" />
            )}
          </div>

          {/* Progress text */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              {progress} / {total}
            </p>
            {completed && (
              <p className="text-xs text-success-600 font-semibold">
                ✨ Selesai!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Type badge */}
      <div className="mt-3 flex justify-end">
        {type === 'daily' && (
          <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded-lg">
            HARIAN
          </span>
        )}
        {type === 'weekly' && (
          <span className="text-xs font-semibold text-secondary-600 bg-secondary-100 px-2 py-1 rounded-lg">
            MINGGUAN
          </span>
        )}
        {type === 'achievement' && (
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">
            PENCAPAIAN
          </span>
        )}
      </div>
    </div>
  );
}
