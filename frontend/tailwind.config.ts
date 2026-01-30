import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'mega': ['48px', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.03em' }],
        'ultra-heading': ['32px', { lineHeight: '1.2', fontWeight: '800', letterSpacing: '-0.02em' }],
        'heading': ['24px', { lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.01em' }],
        'subheading': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '500' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'button': ['18px', { lineHeight: '1.2', fontWeight: '600' }],
      },
      colors: {
        // ExportReadyAI-Inspired Palette (70-20-10 Rule)
        // PRIMARY: Blue-Teal (70% usage) - Trust & Calm
        primary: {
          50: '#f0f9ff',   // Light backgrounds
          100: '#e0f2fe',   // Hover states
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',   // Main blue (ExportReadyAI)
          600: '#0369a1',   // Darker blue
          700: '#0d9488',   // Teal accent
          800: '#0c4a6e',
          900: '#134e4a',
        },
        // SECONDARY: Amber (10% usage) - Action & Energy (CTAs only)
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',   // Amber for CTAs only
          600: '#d97706',   // Hover state
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // NEUTRAL: Stone (20% usage) - Structure
        neutral: {
          50: '#fafaf9',   // White text
          100: '#f5f5f4',   // Light cards
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',   // Dark cards
          900: '#1c1917',   // Dark background
        },
        // SUCCESS: Green (achievements, profits)
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        // DANGER: Red (losses, warnings)
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        // Background: Warmer stone (not cold slate)
        background: {
          primary: '#1c1917', // stone-900
          secondary: '#292524', // stone-800
          tertiary: '#44403c', // stone-700
        },
        // Legacy color names (for compatibility)
        white: '#fafaf9', // stone-50
        'dark-gray': '#1c1917', // stone-900
        'light-gray': '#a8a29e', // stone-400
        mint: '#22c55e', // Keep success green
        salmon: '#ef4444', // Keep danger red
        sand: '#fef3c7', // Lighter amber
      },
      backgroundColor: {
        'app-bg': '#1c1917',
        'component-bg': '#292524',
      },
      textColor: {
        'active': '#fafaf9',
        'inactive': '#a8a29e',
      },
      boxShadow: {
        // Hard shadows with primary blue (ExportReadyAI style)
        'hard-sm': '0 2px 0 0 rgba(2, 132, 199, 0.2)',
        'hard-md': '0 4px 0 0 rgba(2, 132, 199, 0.3)',
        'hard-lg': '0 6px 0 0 rgba(2, 132, 199, 0.3)',
        'hard-xl': '0 8px 0 0 rgba(2, 132, 199, 0.3)',
        // Amber shadows for secondary CTAs
        'hard-amber-sm': '0 2px 0 0 rgba(245, 158, 11, 0.2)',
        'hard-amber-md': '0 4px 0 0 rgba(245, 158, 11, 0.3)',
        'hard-amber-lg': '0 6px 0 0 rgba(245, 158, 11, 0.4)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'bounce-sm': 'bounce-sm 0.5s ease-in-out',
        pop: 'pop 0.3s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
