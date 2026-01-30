'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { XPBar } from '@/components/gamification/XPBar';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userXP, setUserXP] = useState({ currentXP: 0, levelXP: 100, level: 1 });

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setIsLoggedIn(!!userData);

    // TODO: Fetch real user XP data from API
    if (userData) {
      // Mock data for now
      setUserXP({
        currentXP: 350,
        levelXP: 500,
        level: 3
      });
    }
  }, []);

  // Note: Setelah login, jangan arahin ke landing page lagi, tapi ke dashboardnya user

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-700/50 shadow-xl">
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link
                href={isLoggedIn ? "/dashboard" : "/"}
                className="text-xl font-bold bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
                KITA
              </Link>
              <div className="hidden md:flex gap-6">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  className="text-stone-300 hover:text-primary-400 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href={isLoggedIn ? "/nabung-bareng" : "/login"}
                  className="text-stone-300 hover:text-primary-400 transition-colors font-medium"
                >
                  Nabung Bareng
                </Link>
                <Link
                  href={isLoggedIn ? "/missions" : "/login"}
                  className="text-stone-300 hover:text-primary-400 transition-colors font-medium"
                >
                  Missions
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* XP Bar (only show when logged in) */}
              {isLoggedIn && (
                <div className="hidden lg:block">
                  <XPBar
                    currentXP={userXP.currentXP}
                    levelXP={userXP.levelXP}
                    level={userXP.level}
                    variant="compact"
                  />
                </div>
              )}

              {/* Profile/Login Button */}
              <Link
                href={isLoggedIn ? "/profil" : "/login"}
                className="px-6 py-2.5 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:shadow-lg hover:shadow-secondary-500/25 text-white font-semibold rounded-xl transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-none shadow-hard-amber-sm"
              >
                {isLoggedIn ? 'Profil' : 'Masuk'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
