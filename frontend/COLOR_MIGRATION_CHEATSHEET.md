# Color Migration Cheatsheet - Quick Reference

## 🎨 Find & Replace Guide

Use VS Code's "Find in Files" (Ctrl+Shift+F) to replace across all pages quickly.

### Background Colors

```bash
# Slate → Stone (warmer blacks)
bg-slate-900     → bg-stone-900
bg-slate-900/80  → bg-stone-900/80
bg-slate-900/50  → bg-stone-900/50

bg-slate-800     → bg-stone-800
bg-slate-800/50  → bg-stone-800/50
bg-slate-800/40  → bg-stone-800/40

bg-slate-700     → bg-stone-700
bg-slate-700/50  → bg-stone-700/50
bg-slate-700/30  → bg-stone-700/30
```

### Border Colors

```bash
border-slate-700      → border-stone-700
border-slate-700/50   → border-stone-700/50
border-slate-600      → border-stone-600
border-slate-600/50   → border-stone-600/50
```

### Text Colors

```bash
text-slate-400   → text-stone-400
text-slate-300   → text-stone-300
text-slate-200   → text-stone-200
```

### Primary Color (Blue → Amber)

```bash
# Solid colors
bg-blue-500      → bg-amber-500
bg-blue-600      → bg-amber-600
bg-blue-400      → bg-amber-400

text-blue-500    → text-amber-500
text-blue-400    → text-amber-400

border-blue-500  → border-amber-500
```

### Secondary Color (Purple → Teal/Orange)

```bash
# Purple becomes teal for accents
bg-purple-500/20   → bg-teal-500/20
bg-purple-500      → bg-teal-500

# Purple becomes orange in gradients
to-purple-600      → to-orange-600
to-purple-500      → to-orange-500
```

### Gradients

```bash
# Primary gradients (blue-purple → amber-orange)
from-blue-500 to-purple-600    → from-amber-500 to-orange-600
from-blue-400 to-purple-400    → from-amber-400 to-orange-400

# Badge/pill gradients
from-blue-500/20 to-purple-500/20   → from-amber-500/20 to-orange-500/20

# Icon gradients
from-blue-500 to-blue-600      → from-amber-500 to-amber-600
```

### Shadow Colors

```bash
shadow-blue-500/25    → shadow-amber-500/25
shadow-blue-500/50    → shadow-amber-500/50
hover:shadow-blue-500/25   → hover:shadow-amber-500/25
```

### Hover States

```bash
hover:border-blue-500/50    → hover:border-amber-500/50
hover:bg-slate-800/70       → hover:bg-stone-800/70
hover:bg-slate-700/30       → hover:bg-stone-700/30
```

### Ring/Focus States

```bash
ring-blue-500      → ring-amber-500
focus:ring-blue-500   → focus:ring-amber-500
```

---

## 🚀 VS Code Bulk Replace Instructions

1. Open VS Code
2. Press `Ctrl+Shift+H` (Find and Replace in Files)
3. Set "Files to include" to: `app/**/*.tsx`
4. Copy-paste replacements from above
5. Click "Replace All" for each pair
6. Review changes with Git diff before committing

**Pro tip**: Do background colors first, then borders, then text, then gradients.

---

## 🎯 Button Migration Pattern

### Old Button (Before)
```tsx
<Link
  href="/dashboard"
  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all"
>
  Mulai Sekarang
</Link>
```

### New Button (After)
```tsx
import { Button } from '@/components/ui/Button';

<Link href="/dashboard">
  <Button variant="primary" size="lg">
    Mulai Sekarang
  </Button>
</Link>
```

**Benefits**:
- ✅ Automatic tactile feedback (press-down)
- ✅ Consistent styling across app
- ✅ Accessible (focus states, keyboard nav)
- ✅ Hard shadows with hover elevation

---

## 📦 Component Import Cheatsheet

```tsx
// At top of file
import { Button } from '@/components/ui/Button';
import { Skeleton, SkeletonStatCard } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
```

### Button Variants
```tsx
<Button variant="primary">Primary CTA</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Tertiary Action</Button>
<Button variant="ghost">Inline Link</Button>
<Button variant="success">Confirm</Button>
<Button variant="danger">Delete</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Loading States
```tsx
{loading ? (
  <div className="grid grid-cols-4 gap-6">
    <SkeletonStatCard />
    <SkeletonStatCard />
    <SkeletonStatCard />
    <SkeletonStatCard />
  </div>
) : (
  // Real content
)}
```

### Empty States
```tsx
{positions.length === 0 ? (
  <EmptyState
    title="Belum ada posisi aktif"
    description="Mulai investasi pertama..."
    action={<Button>Mulai Sekarang</Button>}
  />
) : (
  // Position list
)}
```

---

## ⚡ Quick Win Checklist

For each page file:

- [ ] Replace all `slate-` with `stone-`
- [ ] Replace all `blue-` with `amber-`
- [ ] Replace all `purple-` with `orange-` or `teal-`
- [ ] Update gradients: `blue-purple` → `amber-orange`
- [ ] Add tactile feedback: `active:translate-y-0 active:shadow-none`
- [ ] Test in browser

---

## 🎨 Color Usage Guide

### When to Use Each Color

**Amber/Gold (Primary)**:
- Main CTAs ("Mulai Sekarang", "Create Group")
- Important highlights
- Success states (profits, gains)
- Logo gradient

**Teal (Secondary)**:
- Secondary actions ("Learn More", "Cancel")
- Info badges
- Links
- Icon backgrounds

**Green (Success)**:
- Positive numbers (APY, gains)
- Completed states
- Checkmarks, success messages

**Red (Danger)**:
- Destructive actions ("Delete", "Logout")
- Negative numbers (losses)
- Errors, warnings

**Stone (Neutral)**:
- Backgrounds, cards
- Borders
- Secondary text

---

## 📏 Typography Quick Reference

```tsx
// New sizes (from tailwind.config.ts)
className="text-mega"          // 48px, weight 800 - Hero titles
className="text-ultra-heading" // 32px, weight 800 - Page titles
className="text-heading"       // 24px, weight 700 - Section headers
className="text-subheading"    // 20px, weight 600 - Card titles
className="text-body"          // 16px, weight 500 - Body text
className="text-small"         // 14px, weight 500 - Labels
className="text-button"        // 18px, weight 600 - Buttons
```

---

## 🛠 Testing Checklist

After migration:

- [ ] Run `npm run dev`
- [ ] Check landing page (already done)
- [ ] Check dashboard
- [ ] Check solo strategy pages
- [ ] Check nabung-bareng pages
- [ ] Check profile page
- [ ] Check missions page
- [ ] Test all buttons (hover + click)
- [ ] Test forms (input focus states)
- [ ] Test modals/dialogs
- [ ] Test on mobile (responsive)

---

## 💡 Pro Tips

1. **Use Git**: Commit after each page so you can revert if needed
2. **Visual Diff**: Use VS Code's Git diff to review changes
3. **Test Browser**: Keep browser open with auto-refresh
4. **One Page at a Time**: Don't bulk replace everything - test incrementally
5. **Check Console**: Watch for missing imports or classname errors

---

**Estimated Time per Page**: 5-10 minutes
**Total Pages**: ~12 pages
**Total Migration Time**: 1-2 hours

Good luck! 🚀
