# KITA Frontend Design System - Ocean Blue Baseline

**Last Updated:** January 30, 2026  
**Based On:** `/app/page.tsx` (Landing Page)  
**Status:** Production Baseline for All Pages

---

## 🎯 Core Mission: Simplify Options, Make Them Enjoyable

KITA's UI/UX design is built on a singular objective: **transform complex DeFi options trading into an intuitive, fun, mobile-native experience** that anyone can understand and enjoy.

### Design Philosophy

This design system exists to fulfill the Thetanuts V4 vision:

> **"Build experiences that simplify options and make them enjoyable to use through gamified frontends that repackage options into intuitive, fun, mobile-native interfaces."**

Every design decision—from color choices to button animations—serves this mission:

1. **Simplification Through Visual Language**
   - **Ocean Blue gradients** replace intimidating dark trading terminals
   - **Floating 3D icons** (trophy, coins, sparkles) make finance feel playful, not scary
   - **Zero jargon UI**: "Beli Murah Dapat Cashback" instead of "Cash Secured Put"
   - **Hard shadow buttons** provide tactile feedback, making actions feel safe and reversible

2. **Enjoyment Through Gamification**
   - **XP bars and badges** turn trading into a game with progression
   - **Bounce animations** on icons create delight in every interaction
   - **Confetti celebrations** reward users for completing actions
   - **Leaderboards and missions** add competitive fun to finance

3. **Mobile-Native by Design**
   - **Touch-optimized**: 44px minimum targets, swipe gestures, thumb-friendly layouts
   - **Vibrant colors**: High contrast for outdoor mobile use (Indonesian sunlight)
   - **Responsive-first**: Designed for 375px screens, enhanced for desktop
   - **Fast animations**: 200ms transitions feel instant on mobile networks

4. **Intuitive Repackaging of Options**
   - **Visual metaphors**: Dollar signs, trending arrows, percentage badges
   - **Gradient CTAs**: Amber/orange = "Get money now" (instant premium)
   - **Glassmorphic cards**: Modern, approachable (not corporate/intimidating)
   - **Emoji + icons**: Universal language that transcends financial literacy

### Why This Matters

Traditional options platforms fail because they:
- ❌ Use technical jargon ("strike", "theta decay", "IV")
- ❌ Have dark, intimidating UIs (Bloomberg Terminal aesthetic)
- ❌ Are desktop-first (unusable on mobile)
- ❌ Lack feedback (users don't know if actions succeeded)

KITA succeeds by:
- ✅ Speaking everyday Bahasa Indonesia
- ✅ Using bright, playful Ocean Blue theme
- ✅ Being mobile-native from day 1
- ✅ Celebrating every action with animations and rewards

**Result:** Options trading feels like playing a game, not managing a portfolio.

---

## 🌊 Color Palette

### Primary Colors (Ocean Blue Theme)

```css
/* Background Gradient (Hero Section) */
from-[#0A4A7C]  /* Deep Navy - Trust, stability */
via-[#0284C7]   /* Sky Blue - Energy, movement */
to-[#06B6D4]    /* Cyan - Fresh, modern */

/* Accent Colors */
#0A98FF         /* Bright Blue - Primary actions, links */
#00FFF0         /* Neon Cyan - Highlights, badges */
#ACFFFC         /* Light Cyan - Text gradients */
```

### Secondary Colors (Complementary Accents)

```css
/* Warm Accents (CTAs & Highlights) */
#FFBC57         /* Amber - Primary CTA, important text */
#FF9500         /* Orange - CTA gradient endpoint */
#FBBF24         /* Gold - Coin icons, prosperity */

/* Gamification Colors */
#10B981         /* Green - Bullish, positive growth */
#059669         /* Dark Green - Success states */
#A855F7         /* Purple - Badges, achievements */
#9333EA         /* Dark Purple - Trophy icons */

/* Floating Orbs (Ambient) */
#C15BFF         /* Magenta - Top-left orb */
#FBFF2B         /* Yellow - Bottom-right orb */
#00FFF0         /* Cyan - Center orb */
```

### Neutral Colors

```css
/* Text & Backgrounds */
#FFFFFF         /* White - Primary text on dark backgrounds */
rgba(255,255,255,0.90)  /* White/90 - Body text */
rgba(255,255,255,0.15)  /* White/15 - Glassmorphic backgrounds */
#E0FFFF         /* Light Cyan - Tagline text */
```

---

## 📐 Typography

### Font Family
```css
font-family: 'Plus Jakarta Sans', sans-serif;
```
- **Rationale**: Indonesian-inspired (Jakarta), modern, friendly, excellent readability
- **Fallback**: `system-ui, -apple-system, sans-serif`

### Type Scale

| Class | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `text-8xl` | 96px (6rem) | 900 (Black) | 1.1 | -2% | Hero headline (desktop) |
| `text-7xl` | 72px (4.5rem) | 900 (Black) | 1.1 | -2% | Hero headline (tablet) |
| `text-6xl` | 60px (3.75rem) | 900 (Black) | 1.1 | -1.5% | Hero headline (mobile) |
| `text-2xl` | 24px (1.5rem) | 500 (Medium) | 1.6 | 0% | Subheadline |
| `text-lg` | 18px (1.125rem) | 700 (Bold) | 1.4 | 0% | Tagline, emphasis |
| `text-base` | 16px (1rem) | 500 (Medium) | 1.5 | 0% | Body text |
| `text-sm` | 14px (0.875rem) | 600 (Semibold) | 1.4 | 2% | Badge text, labels |

### Text Hierarchy Examples

```tsx
{/* Hero Headline */}
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight">
  KITA<span className="font-serif italic font-light tracking-wide">finance</span>
</h1>

{/* Gradient Text */}
<span className="bg-gradient-to-r from-[#00FFF0] to-[#ACFFFC] bg-clip-text text-transparent">
  Trading <span className="text-[#FFBC57] bg-clip-border">option</span> jadi seru
</span>

{/* Subheadline */}
<p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-3 leading-relaxed font-medium">
  Body text with 90% opacity for readability
</p>

{/* Tagline */}
<p className="text-base sm:text-lg text-[#E0FFFF] font-bold mb-10 drop-shadow-lg">
  💎 Highlighted tagline with cyan tint
</p>
```

---

## 🎭 Visual Elements

### 1. Background Gradients

```tsx
{/* Hero Section Background */}
<section className="bg-gradient-to-br from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]">
  {/* Radial overlay for depth */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />
</section>
```

**Usage**: All hero sections, onboarding pages, and full-screen backgrounds.

### 2. Floating Orbs (Ambient Background)

```tsx
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
  <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
  <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00FFF0] rounded-full blur-3xl opacity-25 animate-float-slow" />
</div>
```

**Animations**:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
.animate-float-slow { animation: float 10s ease-in-out infinite 1s; }
```

### 3. Floating Icons (Gamification)

**Icon Container Pattern**:
```tsx
<div className="w-14 h-14 bg-gradient-to-br from-[COLOR1] to-[COLOR2] rounded-2xl flex items-center justify-center shadow-2xl rotate-12 backdrop-blur-sm border-2 border-white/30">
  <Icon className="w-7 h-7 text-white drop-shadow-lg" />
</div>
```

**Icon Inventory**:
| Icon | Colors | Position | Animation | Meaning |
|------|--------|----------|-----------|---------|
| `Sparkles` | Amber → Orange | Top Right | `animate-bounce` | Rewards, magic |
| `TrendingUp` | Green → Dark Green | Bottom Left | Static | Bullish, growth |
| `Coins` | Gold → Amber | Top Left | `animate-spin-slow` | Money, wealth |
| `Trophy` | Purple → Dark Purple | Middle Left | `animate-bounce` (delay 0.5s) | Achievement |
| `DollarSign` | Cyan → Sky Blue | Bottom Right | `animate-pulse` (delay 1s) | Currency |
| `+15%` Badge | Green → Dark Green | Middle Right | `animate-bounce` (delay 0.3s) | Percentage gain |

### 4. Badges & Pills

```tsx
{/* Status Badge */}
<div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border-2 border-[#00FFF0]/40 rounded-full px-5 py-2.5 shadow-lg">
  <div className="w-2 h-2 bg-[#00FFF0] rounded-full animate-pulse" />
  <span className="text-white font-semibold text-sm tracking-wide">Platform DeFi Options #1 Indonesia</span>
</div>
```

**Variants**:
- **Primary Badge**: `bg-white/15` + cyan border
- **Success Badge**: `bg-green-500/20` + green border
- **Warning Badge**: `bg-amber-500/20` + amber border

---

## 🔘 Buttons & CTAs

### Primary CTA (Amber Gradient)

```tsx
<Link
  href="/onboarding"
  className="group w-full sm:w-auto flex items-center justify-center gap-2 
             bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white 
             px-8 py-4 rounded-2xl font-bold text-lg
             shadow-[0_8px_0_0_rgba(255,149,0,0.4)] 
             hover:shadow-[0_12px_0_0_rgba(255,149,0,0.4)] hover:-translate-y-1
             active:translate-y-2 active:shadow-[0_4px_0_0_rgba(255,149,0,0.4)] 
             transition-all duration-200
             border-2 border-white/20"
>
  Mulai Sekarang
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
```

**Key Features**:
- **Hard Shadow**: `shadow-[0_8px_0_0_rgba(255,149,0,0.4)]` for tactile feel
- **Hover Lift**: `-translate-y-1` + increased shadow
- **Active Press**: `translate-y-2` + reduced shadow (physical button feel)
- **Icon Animation**: Arrow slides right on hover

### Secondary CTA (Outline)

```tsx
<Link
  href="/login"
  className="group w-full sm:w-auto flex items-center justify-center gap-2 
             bg-white/10 backdrop-blur-md text-white 
             px-8 py-4 rounded-2xl font-bold text-lg
             border-2 border-white/40
             hover:bg-white/20 hover:border-white/60
             transition-all duration-200"
>
  Masuk
  <Play className="w-5 h-5" />
</Link>
```

---

## 🎬 Animations

### Built-in Tailwind Animations

```css
animate-pulse       /* Radial overlay, badge dots */
animate-bounce      /* Floating icons */
animate-spin-slow   /* Coin icon (custom) */
```

### Custom Animations

```css
/* In globals.css or tailwind.config.ts */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
```

### Animation Delays

```tsx
style={{ animationDelay: '0.5s' }}  /* Trophy */
style={{ animationDelay: '0.3s' }}  /* Percentage badge */
style={{ animationDelay: '1s' }}    /* Dollar sign */
```

---

## 📦 Component Patterns

### 1. Hero Section Structure

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]">
  {/* Layer 1: Animated overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(...)] animate-pulse" />
  
  {/* Layer 2: Floating orbs */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Orbs here */}
  </div>
  
  {/* Layer 3: Floating icons */}
  {/* Icons positioned absolutely */}
  
  {/* Layer 4: Content (highest z-index) */}
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    {/* Content here */}
  </div>
</section>
```

### 2. Glassmorphism Cards

```tsx
<div className="bg-white/15 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 shadow-xl">
  {/* Card content */}
</div>
```

**Usage**: Feature cards, stats, modals

### 3. Icon Containers

```tsx
<div className="w-12 h-12 bg-gradient-to-br from-[COLOR1] to-[COLOR2] rounded-xl flex items-center justify-center shadow-xl rotate-[ANGLE] backdrop-blur-sm border-2 border-white/30">
  <Icon className="w-6 h-6 text-white drop-shadow-lg" />
</div>
```

**Rotation Angles**: `-12deg`, `6deg`, `12deg` for playful asymmetry

---

## 📱 Responsive Design

### Breakpoints (Tailwind Default)

```css
sm: 640px   /* Mobile landscape, small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Responsive Patterns

```tsx
{/* Text Size */}
className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"

{/* Spacing */}
className="px-4 sm:px-6 lg:px-8"

{/* Visibility */}
className="hidden md:block"  /* Hide on mobile */
className="block md:hidden"  /* Show only on mobile */

{/* Layout */}
className="flex flex-col sm:flex-row"  /* Stack on mobile, row on desktop */
```

---

## 🎯 Implementation Checklist

When creating a new page, ensure:

### ✅ Colors
- [ ] Background uses ocean blue gradient (`from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]`)
- [ ] Primary CTAs use amber gradient (`from-[#FFBC57] to-[#FF9500]`)
- [ ] Text uses white with appropriate opacity (`text-white/90`)
- [ ] Accents use cyan (`#00FFF0`) for highlights

### ✅ Typography
- [ ] Font is Plus Jakarta Sans
- [ ] Headings use `font-black` or `font-bold`
- [ ] Body text uses `font-medium` (500 weight)
- [ ] Proper responsive sizing (`text-5xl sm:text-6xl md:text-7xl`)

### ✅ Visual Elements
- [ ] Floating orbs for ambient background
- [ ] Radial gradient overlay with `animate-pulse`
- [ ] Floating icons with appropriate animations
- [ ] Glassmorphic badges/cards where appropriate

### ✅ Buttons
- [ ] Primary CTA has hard shadow (`shadow-[0_8px_0_0_...]`)
- [ ] Hover state lifts button (`hover:-translate-y-1`)
- [ ] Active state presses button (`active:translate-y-2`)
- [ ] Icon animations on hover

### ✅ Animations
- [ ] Use `animate-bounce` for floating elements
- [ ] Use `animate-pulse` for attention-grabbing elements
- [ ] Add `animationDelay` for staggered effects
- [ ] Smooth transitions (`transition-all duration-200`)

### ✅ Responsive
- [ ] Mobile-first approach
- [ ] Test on `sm`, `md`, `lg` breakpoints
- [ ] Hide decorative elements on mobile if needed
- [ ] Ensure touch targets are 44x44px minimum

---

## 🚀 Quick Start Template

```tsx
'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Icon1, Icon2 } from 'lucide-react';

export default function NewPage() {
  return (
    <>
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]">
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-24">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Your Headline
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Your description
          </p>
          
          <Link
            href="/action"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_0_0_rgba(255,149,0,0.4)] hover:shadow-[0_12px_0_0_rgba(255,149,0,0.4)] hover:-translate-y-1 active:translate-y-2 active:shadow-[0_4px_0_0_rgba(255,149,0,0.4)] transition-all duration-200 border-2 border-white/20"
          >
            Call to Action
          </Link>
        </div>
      </section>
    </>
  );
}
```

---

## 📚 Reference Files

- **Baseline Design**: `/app/page.tsx`
- **Navbar Component**: `/components/Navbar.tsx`
- **Tailwind Config**: `/tailwind.config.ts`
- **Global Styles**: `/app/globals.css`

---

**Design System Version**: 2.0 (Ocean Blue)  
**Last Audit**: January 30, 2026  
**Status**: ✅ Production Ready
