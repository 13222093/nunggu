/**
 * Toast Notification Component - KITA Design System
 *
 * Displays celebration toasts for:
 * - XP gains
 * - Achievement unlocks
 * - Level ups
 * - Streak milestones
 *
 * Features: Auto-dismiss, confetti integration, ExportReadyAI card style
 */

'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  celebrateAchievement,
  celebrateLevelUp,
  celebrateStreak,
  celebrateXP
} from '@/lib/confetti';

export type ToastType = 'xp' | 'achievement' | 'levelUp' | 'streak' | 'mission';

interface ToastNotificationProps {
  type: ToastType;
  title: string;
  message: string;
  icon?: string;
  onClose: () => void;
}

export function ToastNotification({
  type,
  title,
  message,
  icon,
  onClose
}: ToastNotificationProps) {
  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(onClose, 5000);

    // Confetti for special events
    if (type === 'achievement') {
      celebrateAchievement();
    } else if (type === 'levelUp') {
      celebrateLevelUp();
    } else if (type === 'streak') {
      celebrateStreak(7); // Default to 7 days
    } else if (type === 'xp') {
      celebrateXP();
    }

    return () => clearTimeout(timer);
  }, [type, onClose]);

  const bgColors: Record<ToastType, string> = {
    xp: 'from-primary-500 to-primary-600',
    achievement: 'from-secondary-500 to-orange-600',
    levelUp: 'from-purple-500 to-purple-600',
    streak: 'from-orange-500 to-orange-600',
    mission: 'from-primary-500 to-primary-600',
  };

  const defaultIcons: Record<ToastType, string> = {
    xp: '⭐',
    achievement: '🏆',
    levelUp: '🎉',
    streak: '🔥',
    mission: '✅',
  };

  return (
    <div
      className={cn(
        "fixed top-20 right-8 z-50 max-w-sm",
        "bg-white border-2 border-primary-500 rounded-2xl p-4",
        "shadow-hard-lg",
        "animate-pop"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
          `bg-gradient-to-br ${bgColors[type]}`
        )}>
          {icon || defaultIcons[type]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-900">{title}</h3>
          <p className="text-sm text-stone-600">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 text-xl leading-none transition-colors"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}
