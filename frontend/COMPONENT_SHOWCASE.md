# KITA Gamification Components - Visual Showcase

**Design System**: ExportReadyAI-inspired with Indonesian warmth
**Color Palette**: 70% Blue-Teal, 20% Neutral Stone, 10% Amber

---

## 🎮 Component Gallery

### 1. XPBar Component

**Purpose**: Display user level and XP progress
**Variants**: Compact (navbar), Default (dashboard), Large (profile)

```tsx
// Compact - Navbar
<XPBar
  currentXP={350}
  levelXP={500}
  level={3}
  variant="compact"
/>
```

**Visual**:
```
┌────┬─────────────────┐
│ 3  │ ████████░░░░░░░ │  (70% filled blue bar)
└────┴─────────────────┘
```

```tsx
// Default - Dashboard
<XPBar
  currentXP={350}
  levelXP={500}
  level={3}
/>
```

**Visual**:
```
Level 3                     350 / 500 XP
┌─────────────────────────────────────┐
│ ████████████████████░░░░░░░░░░░░░░░ │  (shimmer animation)
└─────────────────────────────────────┘
```

```tsx
// Large - Profile
<XPBar
  currentXP={350}
  levelXP={500}
  level={3}
  variant="large"
/>
```

**Visual**:
```
┌───┐  Level 3                Selanjutnya
│ 3 │  350 / 500 XP            Level 4
└───┘

┌──────────────────────────────────────────┐
│ ████████████████████████████░░░░░░░░░░░░ │  (shimmer)
└──────────────────────────────────────────┘

70% menuju level selanjutnya
```

---

### 2. ToastNotification Component

**Purpose**: Celebrate achievements, XP gains, level ups
**Auto-dismiss**: 5 seconds
**Confetti**: Automatic on achievement/levelUp/streak

```tsx
const { showToast } = useToast();

// XP Gained
showToast({
  type: 'xp',
  title: 'XP Earned!',
  message: '+100 XP from First Trade'
});

// Achievement Unlocked
showToast({
  type: 'achievement',
  title: 'Badge Baru!',
  message: 'Diamond Hands 💎'
});

// Level Up
showToast({
  type: 'levelUp',
  title: 'Level Up!',
  message: 'Sekarang Level 5'
});

// Streak Milestone
showToast({
  type: 'streak',
  title: '7 Day Streak!',
  message: 'Keep it up! 🔥'
});
```

**Visual**:
```
┌───────────────────────────────────────┐
│ ┌────┐                             × │
│ │ ⭐ │  XP Earned!                   │
│ └────┘  +100 XP from First Trade     │
└───────────────────────────────────────┘
  (Appears top-right, fades out after 5s)
  (Confetti animation on achievement/levelUp)
```

---

### 3. AchievementBadge Component

**Purpose**: Display locked/unlocked achievement badges
**States**: Locked (grayscale + lock), Unlocked (colorful)
**Categories**: trading, social, streak, milestone

```tsx
// Unlocked Badge
<AchievementBadge
  title="First Trade"
  description="Complete your first trade"
  icon="🎯"
  unlocked={true}
  unlockedAt={new Date()}
  category="trading"
/>

// Locked Badge
<AchievementBadge
  title="Diamond Hands"
  description="Maintain 30 day streak"
  icon="💎"
  unlocked={false}
  category="streak"
/>
```

**Visual (Unlocked)**:
```
┌─────────────────────────┐
│                         │
│       ┌────────┐        │
│       │   🎯   │  (blue gradient bg)
│       └────────┘        │
│                         │
│     First Trade         │
│  Complete your first    │
│        trade            │
│                         │
│     30 Jan 2026         │  (unlock date)
└─────────────────────────┘
  (White bg, blue border, hard shadow)
```

**Visual (Locked)**:
```
┌─────────────────────────┐
│                         │
│       ┌────────┐        │
│       │   🔒   │  (gray bg)
│       └────────┘        │
│         🔒              │  (lock overlay)
│   Diamond Hands         │
│  Maintain 30 day        │
│       streak            │
└─────────────────────────┘
  (Dark bg, grayscale, 50% opacity)
```

---

### 4. StreakCounter Component

**Purpose**: Display current streak with fire emoji intensity
**Fire Levels**:
- 🔥 (1-6 days)
- 🔥🔥 (7-29 days)
- 🔥🔥🔥 (30+ days)

```tsx
<StreakCounter
  currentStreak={15}
  longestStreak={30}
/>
```

**Visual**:
```
┌──────────────────────────────────────────┐
│                                          │
│  ┌──────┐   STREAK AKTIF                │
│  │ 🔥🔥 │   15 Hari                      │
│  └──────┘   Terbaik: 30 hari            │
│    (orange gradient)                     │
│                                          │
│   Keren! Pertahankan terus! 💪          │  (motivational)
└──────────────────────────────────────────┘
  (White bg, blue border, hard shadow)
```

**Visual (30+ days)**:
```
┌──────────────────────────────────────────┐
│                                          │
│  ┌────────┐   STREAK AKTIF              │
│  │ 🔥🔥🔥 │   35 Hari                    │
│  └────────┘   Terbaik: 35 hari          │
│    (intense orange)                      │
│                                          │
│   LEGEND! Diamond Hands! 💎🔥            │
└──────────────────────────────────────────┘
```

---

### 5. MissionCard Component

**Purpose**: Display mission progress with XP reward
**Types**: daily (HARIAN), weekly (MINGGUAN), achievement (PENCAPAIAN)
**States**: In progress, Completed

```tsx
<MissionCard
  title="Buat 1 Trade Hari Ini"
  description="Execute your first trade of the day"
  xpReward={100}
  progress={0}
  total={1}
  icon="🎯"
  completed={false}
  type="daily"
/>
```

**Visual (In Progress)**:
```
┌────────────────────────────────────────────────┐
│                                                │
│  ┌────┐  Buat 1 Trade Hari Ini      +100 XP   │
│  │ 🎯 │  Execute your first trade              │
│  └────┘  of the day                            │
│    (blue gradient)                             │
│          ┌───────────────────────────┐         │
│          │ ████░░░░░░░░░░░░░░░░░░░░░ │ (shimmer)
│          └───────────────────────────┘         │
│          0 / 1                                 │
│                                                │
│                              [HARIAN]  (badge) │
└────────────────────────────────────────────────┘
  (White bg, blue border, hard shadow, hover lift)
```

**Visual (Completed)**:
```
┌────────────────────────────────────────────────┐
│                                                │
│  ┌────┐  Buat 1 Trade Hari Ini      +100 XP   │
│  │ ✅ │  Execute your first trade              │
│  └────┘  of the day                            │
│    (green bg)                                  │
│          ┌───────────────────────────┐         │
│          │ ████████████████████████████ │ (100%)
│          └───────────────────────────┘         │
│          1 / 1              ✨ Selesai!        │
│                                                │
│                              [HARIAN]          │
└────────────────────────────────────────────────┘
  (White bg, green border, green shadow)
```

---

### 6. Leaderboard Component

**Purpose**: Rank users by XP with medals for top 3
**Features**: Current user highlighting, compact XP display

```tsx
<Leaderboard
  entries={[
    { rank: 1, address: '0x123...', username: 'Alice', xp: 5000, level: 10 },
    { rank: 2, address: '0x456...', username: 'Bob', xp: 3500, level: 8 },
    { rank: 3, address: '0x789...', xp: 2800, level: 7 },
  ]}
  currentUserAddress="0x456..."
/>
```

**Visual**:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌────┐  👤  Alice              5.0K XP        │
│  │ 🥇 │      Level 10                           │
│  └────┘                                         │
│  (gold gradient)                                │
└─────────────────────────────────────────────────┘
  (Blue gradient bg, blue border for top 3)

┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌────┐  👤  Bob (Kamu)         3.5K XP        │
│  │ 🥈 │      Level 8                            │
│  └────┘                                         │
│  (silver gradient)                              │
└─────────────────────────────────────────────────┘
  (Ring highlight for current user)

┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌────┐  👤  0x789...           2.8K XP        │
│  │ 🥉 │      Level 7                            │
│  └────┘                                         │
│  (bronze gradient)                              │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Color Usage Examples

### Primary Blue-Teal (70%)
```tsx
// Progress bars
className="bg-gradient-to-r from-primary-500 to-primary-600"

// Card borders
className="border-primary-500/30"

// Icon backgrounds
className="bg-primary-500/20"

// Link hover
className="hover:text-primary-400"
```

### Secondary Amber (10% - CTAs Only)
```tsx
// Primary CTA button
className="bg-gradient-to-r from-secondary-500 to-secondary-600"

// Achievement unlock animations
celebrateAchievement() // Uses amber in confetti

// XP reward text
className="text-secondary-500 font-bold"
```

### Neutral Stone (20%)
```tsx
// Dark backgrounds
className="bg-stone-900"

// Card backgrounds
className="bg-white"

// Border
className="border-stone-200"

// Text
className="text-stone-600"
```

### Success Green
```tsx
// Completed missions
className="border-success-500"

// Profit display
className="text-success-600"
```

### Danger Red
```tsx
// Warnings
className="text-danger-500"

// Loss display
className="text-danger-600"
```

---

## 🎯 Component Composition Examples

### Dashboard Layout
```tsx
export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <XPBar currentXP={350} levelXP={500} level={3} variant="large" />
        </div>
        <StreakCounter currentStreak={15} longestStreak={30} />
      </div>

      {/* Active Missions */}
      <h2 className="text-2xl font-bold text-white mb-4">Misi Aktif</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <MissionCard
          title="Buat 1 Trade Hari Ini"
          description="Execute your first trade"
          xpReward={100}
          progress={0}
          total={1}
          icon="🎯"
          completed={false}
          type="daily"
        />
        <MissionCard
          title="Ajak 1 Teman"
          description="Invite a friend to join"
          xpReward={300}
          progress={0}
          total={1}
          icon="🤝"
          completed={false}
          type="weekly"
        />
      </div>

      {/* Recent Achievements */}
      <h2 className="text-2xl font-bold text-white mb-4">Badge Terbaru</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        <AchievementBadge
          title="First Trade"
          description="Complete first trade"
          icon="🎯"
          unlocked={true}
          category="trading"
        />
        <AchievementBadge
          title="Week Warrior"
          description="7 day streak"
          icon="🔥"
          unlocked={true}
          category="streak"
        />
        <AchievementBadge
          title="Diamond Hands"
          description="30 day streak"
          icon="💎"
          unlocked={false}
          category="streak"
        />
      </div>
    </div>
  );
}
```

---

## 🚀 Confetti Animations

### When to Use
```tsx
import {
  celebrateAchievement,
  celebrateLevelUp,
  celebrateStreak,
  celebrateMission,
  celebrateXP,
  celebrateReferral
} from '@/lib/confetti';

// Achievement unlocked
onAchievementUnlock(() => {
  celebrateAchievement(); // Multi-burst, 200 particles
  showToast({ type: 'achievement', title: 'Badge Unlocked!', ... });
});

// Level up
onLevelUp(() => {
  celebrateLevelUp(); // Firework from bottom
  showToast({ type: 'levelUp', title: 'Level Up!', ... });
});

// Streak milestone (7, 14, 30 days)
onStreakMilestone((days) => {
  celebrateStreak(days); // Fire emoji rain
  showToast({ type: 'streak', title: `${days} Day Streak!`, ... });
});

// Mission completed
onMissionComplete(() => {
  celebrateMission(); // Quick burst
  showToast({ type: 'mission', title: 'Misi Selesai!', ... });
});

// XP gained (small amounts)
onXPGain(() => {
  celebrateXP(); // Subtle 30-particle burst
});

// Referral success
onReferralSuccess(() => {
  celebrateReferral(); // 2-second side cannons
  showToast({ type: 'achievement', title: 'Referral Success!', ... });
});
```

---

## 📱 Responsive Behavior

### XPBar
- **Desktop (lg+)**: Compact variant in navbar
- **Mobile**: Hidden in navbar (save space), show in dashboard/profile

### StreakCounter
- **Desktop**: Full width in grid
- **Mobile**: Full width stack

### MissionCard
- **Desktop**: 2 columns
- **Mobile**: 1 column stack

### AchievementBadge
- **Desktop**: 3-5 columns in grid
- **Mobile**: 2-3 columns in grid

### Leaderboard
- **All screens**: Single column, scrollable

---

## ✅ Accessibility

### Keyboard Navigation
- All cards: Focusable with `tabIndex={0}`
- Toast close: `<button>` with aria-label

### Screen Readers
- XPBar: "Level 3, 350 out of 500 XP, 70% to next level"
- Achievement: "First Trade, unlocked on 30 Jan 2026"
- Mission: "Buat 1 Trade, 0 out of 1 completed, rewards 100 XP"

### Color Contrast
- ✅ Primary blue on white: 4.51:1 (WCAG AA)
- ✅ Amber on white: 3.02:1 (WCAG AA for large text)
- ✅ White on primary: 4.65:1 (WCAG AA)

---

**Ready to integrate into dashboard, missions, and profile pages!** 🚀
