# Implementation Plan: Dark Explorer Canvas & Snap Scrolling

## Summary
1. **Dark Explorer Canvas**: Change canvas background to `#1e1b2e` (dark violet-tinted gray) while keeping light mode elsewhere
2. **Full-page Snap Scrolling**: Add CSS snap scrolling between Hero, Explorer, and Marketplace sections

---

## Part 1: Dark Explorer Canvas

### Rationale for `#1e1b2e`
- Harmonizes with existing violet/teal accent palette
- Dark enough for strong contrast, but not pure black
- Makes node cards and selection glows "pop"
- Creates a focal point effect when scrolling to the explorer section

### File Changes

#### 1. `src/components/ExplorerCanvas.tsx`

**Line 319** - Change background:
```tsx
style={{ background: '#1e1b2e' }}
```

**Lines 321-324** - Increase ambient glow opacity:
```tsx
<div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] ambient-violet-dark rounded-full blur-[120px] opacity-60" />
<div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] ambient-teal-dark rounded-full blur-[120px] opacity-50" />
```

**Line 328** - Header gradient for standalone mode:
```tsx
<header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1e1b2e] via-[#1e1b2e]/95 to-transparent">
```
- Update text colors: `text-gray-900` → `text-white`, `text-gray-500` → `text-gray-400`

**Lines 392-395** - Controls dark styling:
```tsx
<Controls
  className="!bg-[#2a2640]/95 !border-[#3d3755] !rounded-xl !shadow-lg [&_button]:!bg-[#2a2640] [&_button]:!border-[#3d3755] [&_button]:hover:!bg-[#3d3755] [&_svg]:!fill-gray-300"
  showInteractive={false}
/>
```

**Lines 396-408** - MiniMap dark styling:
```tsx
maskColor="rgba(30, 27, 46, 0.85)"
className="!bg-[#2a2640]/95 !border-[#3d3755] !rounded-xl"
```

**Lines 294-299** - Edge colors for dark background:
```tsx
: hasActiveNode
  ? 'rgba(255,255,255,0.08)'  // was 'rgba(0,0,0,0.05)'
  : 'rgba(167, 139, 250, 0.35)', // was 0.25
```

**Lines 416-424** - Hints dark styling:
```tsx
<div className={`... glass-dark ...`}>
  <span className="text-gray-300">Click to focus</span>
  <span className="text-gray-500 mx-2">...</span>
  <span className="text-gray-300">Hover to explore</span>
</div>
```

**Line 428** - Reduce infinity symbol opacity:
```tsx
<div className="... text-[#2DD4BF]/15 ...">
```

---

#### 2. `src/components/ExplorerNode.tsx`

**Lines 32-57** - Enhance categoryStyles for contrast on dark background:
- Increase glow intensity (e.g., `0.3` → `0.5`, `0.25` → `0.4`)
- Increase border opacity (e.g., `/50` → `/60`)

**Line ~168** - Add drop shadow for better contrast:
```tsx
className={`... shadow-lg shadow-black/20 ...`}
```

---

#### 3. `src/components/Legend.tsx`

Full dark mode update:
```tsx
<div className="... bg-[#2a2640]/95 border border-[#3d3755] ...">
  <h3 className="text-white ...">
  <span className="text-gray-300">Core & Solvers</span>
  <span className="text-gray-300">MCP & Apps</span>
  <div className="... border-t border-[#3d3755]">
```

---

#### 4. `src/styles/globals.css`

Add after line 348:
```css
/* Dark mode ambient backgrounds */
.ambient-violet-dark {
  background: radial-gradient(ellipse at center, rgba(167, 139, 250, 0.25) 0%, transparent 70%);
}

.ambient-teal-dark {
  background: radial-gradient(ellipse at center, rgba(45, 212, 191, 0.2) 0%, transparent 70%);
}

/* Dark glass effect */
.glass-dark {
  background: rgba(42, 38, 64, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(61, 55, 85, 0.8);
}
```

---

#### 5. `src/components/LandingPage.tsx`

**Lines 10-14** - Update loading state background:
```tsx
<div className="w-full h-[750px] flex items-center justify-center" style={{ background: '#1e1b2e' }}>
```

---

## Part 2: Full-page Snap Scrolling

### File Changes

#### 1. `src/components/LandingPage.tsx`

**Line 68** - Add snap container:
```tsx
<div className="h-screen overflow-y-auto snap-y snap-mandatory" style={{ background: '#FFFFFF' }}>
```

**Line 142** - Hero section snap target:
```tsx
<section className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 snap-start snap-always">
```

**Line 233** - Explorer section snap target:
```tsx
<section id="explore" className="relative h-screen min-h-screen flex flex-col justify-center py-8 snap-start snap-always">
```
- Adjust inner layout: reduce `mb-8` to `mb-4`, make canvas container `flex-1`
- Add `maxHeight: 'calc(100vh - 180px)'` to canvas wrapper

**Line 265** - Marketplace section snap target:
```tsx
<section id="platform" className="min-h-screen py-16 bg-gray-50/50 snap-start">
```

**Line 362** - CTA section:
```tsx
<section className="py-16 snap-start">
```

---

#### 2. `src/styles/globals.css`

Add snap scrolling utilities (these may be provided by Tailwind, but add explicit CSS for reliability):
```css
/* Snap scrolling - ensure smooth behavior */
@media (max-width: 768px) {
  .snap-y {
    scroll-snap-type: y proximity; /* Less strict on mobile */
  }
}
```

---

## Critical Files to Modify

| File | Purpose |
|------|---------|
| `src/components/ExplorerCanvas.tsx` | Canvas background, controls, header, edges, hints |
| `src/components/ExplorerNode.tsx` | Node glow/shadow enhancement |
| `src/components/Legend.tsx` | Full dark mode styling |
| `src/components/LandingPage.tsx` | Snap scroll structure, loading state |
| `src/styles/globals.css` | Dark ambient classes, glass-dark |

---

## Implementation Order

1. `globals.css` - Add new CSS classes first
2. `ExplorerCanvas.tsx` - Core canvas dark mode
3. `ExplorerNode.tsx` - Enhanced node styling
4. `Legend.tsx` - Dark mode legend
5. `LandingPage.tsx` - Snap scrolling + loading state
6. Test transitions and responsiveness
