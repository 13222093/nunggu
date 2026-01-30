/**
 * EmptyState Component - Guide New Users
 *
 * Research: Empty states are onboarding moments (Nielsen Norman Group, 2018)
 * 40% of first-time users drop off if next action is unclear.
 *
 * Usage:
 * <EmptyState
 *   icon={<TrendingUp />}
 *   title="Belum ada posisi aktif"
 *   description="Mulai investasi pertama Anda..."
 *   action={<Button>Mulai Sekarang</Button>}
 * />
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'text-center py-12 px-6',
        'bg-stone-800 rounded-2xl border-2 border-dashed border-stone-700',
        'animate-pop',
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
          <div className="text-amber-500 [&>svg]:w-8 [&>svg]:h-8">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-stone-100 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-stone-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}

      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}

/**
 * Empty state for positions list
 */
export function EmptyPositions() {
  return (
    <EmptyState
      title="Belum ada posisi aktif"
      description="Mulai investasi pertama Anda dengan strategi 'Beli Murah Dapat Cashback'"
    />
  );
}

/**
 * Empty state for groups list
 */
export function EmptyGroups() {
  return (
    <EmptyState
      title="Belum ada grup"
      description="Buat grup nabung bareng pertama Anda atau bergabung dengan grup teman"
    />
  );
}

/**
 * Empty state for missions
 */
export function EmptyMissions() {
  return (
    <EmptyState
      title="Semua misi selesai!"
      description="Kamu sudah menyelesaikan semua misi yang tersedia. Cek lagi nanti untuk misi baru."
    />
  );
}
