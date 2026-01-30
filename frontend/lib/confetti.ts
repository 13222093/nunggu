/**
 * Confetti Animation Utilities - KITA Design System
 *
 * Celebration animations for gamification events:
 * - Achievement unlocks
 * - Level ups
 * - Streak milestones
 *
 * Uses canvas-confetti library with Duolingo-inspired multi-burst patterns
 */

import confetti from 'canvas-confetti';

/**
 * Achievement unlock celebration
 * Multi-burst confetti effect (Duolingo style)
 */
export function celebrateAchievement() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-burst confetti (Duolingo style)
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Level up celebration
 * Firework burst from bottom with brand colors
 */
export function celebrateLevelUp() {
  confetti({
    particleCount: 150,
    spread: 180,
    origin: { y: 1.0, x: 0.5 },
    colors: ['#0284c7', '#f59e0b', '#22c55e'], // Primary blue, amber, green
    gravity: 0.8,
    scalar: 1.2,
  });
}

/**
 * Streak milestone celebration
 * Fire emoji rain effect
 *
 * @param streakDays - Number of consecutive days (affects particle count)
 */
export function celebrateStreak(streakDays: number) {
  confetti({
    particleCount: Math.min(streakDays * 2, 100), // Cap at 100 particles
    spread: 100,
    origin: { y: 0.2 },
    shapes: ['circle'],
    colors: ['#f59e0b', '#d97706', '#f97316'], // Amber/orange for fire effect
    gravity: 1,
    scalar: 1.5,
  });
}

/**
 * Mission completion celebration
 * Quick burst from center
 */
export function celebrateMission() {
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0284c7', '#38bdf8'], // Primary blue shades
  });
}

/**
 * XP gain celebration
 * Small subtle burst
 */
export function celebrateXP() {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { y: 0.5 },
    colors: ['#f59e0b', '#fbbf24'], // Amber shades
    gravity: 1.2,
    scalar: 0.8,
  });
}

/**
 * Referral success celebration
 * Side cannons effect
 */
export function celebrateReferral() {
  const end = Date.now() + 2 * 1000; // 2 seconds
  const colors = ['#0284c7', '#f59e0b', '#22c55e'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
