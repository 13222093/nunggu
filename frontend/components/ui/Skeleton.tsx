/**
 * Skeleton Component - Loading States
 *
 * Provides better perceived performance than spinners.
 * Research shows skeleton screens reduce perceived wait time by 30%.
 *
 * Usage:
 * <Skeleton className="h-4 w-24" />
 * <Skeleton className="h-32 w-full rounded-2xl" />
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-stone-700 rounded',
        className
      )}
    />
  );
}

/**
 * Pre-built skeleton for stat cards
 */
export function SkeletonStatCard() {
  return (
    <div className="bg-stone-800 rounded-2xl p-6 border-2 border-stone-700">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-32 mb-1" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

/**
 * Pre-built skeleton for position cards
 */
export function SkeletonPositionCard() {
  return (
    <div className="bg-stone-800 rounded-2xl p-6 border-2 border-stone-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

/**
 * Pre-built skeleton for group cards
 */
export function SkeletonGroupCard() {
  return (
    <div className="bg-stone-800 rounded-2xl p-6 border-2 border-stone-700">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full mb-2" />
      <Skeleton className="h-3 w-40 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
