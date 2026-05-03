# Riviera 2026 — Project Context

> **Theme:** Arabian Nights · Mystical Desert Fantasy · Luxury Cinematic Storytelling
> **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v3 + Framer Motion + GSAP

---

## Quick Summary

Riviera 2026 is the official website for the annual techno-cultural fest of Haldia Institute of Technology (HIT).
The entire frontend is designed around an **Arabian Nights** dark fantasy aesthetic — warm golds, cinematic black backgrounds, glass morphism cards, floating lanterns, crescent moon, desert fog particles, and premium micro-animations.

---

## Tech Stack

| Layer         | Technology                                        |
|---------------|---------------------------------------------------|
| Framework     | **Next.js 16.1.6** (App Router, `app/` directory) |
| Language      | **TypeScript 5**                                  |
| Styling       | **Tailwind CSS 3.4** + **Vanilla CSS** (globals.css design tokens) |
| Animation     | **Framer Motion 12** (component-level) + **GSAP** (cinematic/scroll-level) |
| Icons         | **Lucide React**                                  |
| Fonts         | **Cinzel** (headings), **El Messiri** (Arabian accents), **Inter** (body) |
| Database      | **Supabase** (PostgreSQL)                         |
| Auth          | Custom JWT-based (bcrypt hashed passwords)        |
| Payments      | **Razorpay**                                      |
| Hosting       | **Vercel**                                        |

---

## Directory Structure

```
riveria_hit_main/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, ThemeProvider, Navbar, atmospheric layers)
│   ├── page.tsx                  # Homepage (Hero → Registration → Events → Schedule → Activities → Gallery → Sponsors → Footer)
│   ├── globals.css               # Master stylesheet (design tokens, glass morphism, buttons, animations)
│   ├── admin/                    # Admin dashboard (separate NavBar, CRUD management)
│   ├── api/                      # API routes
│   │   ├── admin/                # Protected admin APIs (events, gallery, schedule, sponsors, activities, settings, contact, login)
│   │   ├── public/               # Public APIs (events, gallery, schedule, sponsors, activities, settings)
│   │   ├── auth/                 # Auth endpoints (register, login, reset-password)
│   │   ├── contact/              # Contact form submission
│   │   ├── cron/                 # Scheduled tasks
│   │   └── payment/              # Razorpay integration
│   ├── auth/                     # Auth pages
│   ├── contact/                  # Contact page
│   ├── gallery/                  # Full gallery page
│   ├── login/                    # Login page
│   ├── register/                 # Registration page
│   └── test-payment/             # Payment testing
│
├── components/                   # All UI components
│   ├── Hero.tsx                  # Cinematic hero (541 lines) — moon, lanterns, fog, stars, parallax, intro sequence
│   ├── Navbar.tsx                # Floating glass navbar with gold accents, theme toggle, mobile menu
│   ├── RegistrationSection.tsx   # Registration CTA section with info cards
│   ├── UpcomingEvents.tsx        # 3D carousel event cards with auto-play
│   ├── Schedule.tsx              # Day-tabbed timeline with gold gradient line
│   ├── Activities.tsx            # Grid of activity glass cards with icons
│   ├── Gallery.tsx               # Image carousel with depth/parallax
│   ├── Sponsors.tsx              # Animated sponsor grid with spring layout
│   ├── Contact.tsx               # Contact form (red gradient card)
│   ├── Footer.tsx                # Footer with brand, links, contact info
│   └── ui/                       # Reusable UI primitives
│       ├── FogLayer.tsx          # Cinematic fog blobs (CSS animated radial gradients)
│       ├── ParticleLayer.tsx     # Canvas-based floating gold ember particles
│       ├── MouseGlow.tsx         # Custom cursor with gold core, aura, ember trail, click ripple
│       ├── SectionWrapper.tsx    # Section with glow, pattern, noise, entrance animation
│       ├── SectionHeading.tsx    # Cinzel heading + gold accent + decorative line + subtitle
│       ├── GlassCard.tsx         # Glass morphism card with staggered entrance + hover lift
│       ├── GlowButton.tsx        # Animated button with shimmer sweep
│       └── ThemeToggle.tsx       # Night/Day theme switcher
│
├── lib/                          # Shared utilities & config
│   ├── motionPresets.ts          # Framer Motion variants (fadeUp, cinematicReveal, glowPulse, etc.)
│   ├── gsapPresets.ts            # GSAP utilities (hero timeline, ScrollTrigger, parallax, cursor smoothing)
│   ├── theme.tsx                 # ThemeProvider context (night/day toggle)
│   ├── supabase.ts               # Supabase client
│   ├── jwt.ts                    # JWT auth helpers
│   ├── admin-auth.ts             # Admin auth middleware
│   ├── helpers.ts                # General helpers
│   ├── validators.ts             # Input validation
│   ├── razorpay.ts               # Razorpay client
│   └── types.ts                  # TypeScript interfaces
│
├── public/                       # Static assets
│   ├── riviera-logo.jpeg         # Logo
│   ├── gallery1-4.jpg            # Fallback gallery images
│   └── fire-bg.png               # Background texture
│
├── tailwind.config.ts            # Extended with Arabian theme (colors, fonts, keyframes, shadows)
├── package.json                  # Dependencies
└── vercel.json                   # Vercel deployment config
```

---

## Design System (CSS Custom Properties)

All design tokens live in `app/globals.css` under `:root, .theme-night` and `.theme-day`.

### Color Palette

| Token               | Night Mode         | Purpose                  |
|----------------------|--------------------|--------------------------|
| `--bg-primary`       | `#050505`          | Page background          |
| `--bg-secondary`     | `#0a0808`          | Section alt background   |
| `--surface-primary`  | `#0e0b09`          | Card/surface background  |
| `--surface-glass`    | `rgba(20,15,10,0.65)` | Glass morphism bg     |
| `--gold-primary`     | `#D4A017`          | Primary accent           |
| `--gold-deep`        | `#8B5E00`          | Dark gold                |
| `--gold-light`       | `#F0D078`          | Light gold               |
| `--gold-dim`         | `rgba(212,160,23,0.15)` | Subtle gold bg      |
| `--accent-red`       | `#FF383C`          | Action/CTA accent        |
| `--accent-purple`    | `#6A0DAD`          | Atmospheric accent       |
| `--text-primary`     | `#F5EDE0`          | Main text (warm white)   |
| `--text-muted`       | `#9A8B78`          | Secondary text           |
| `--text-dim`         | `#6B5D4D`          | Tertiary text            |

### Font Variables

| Variable           | Font        | Usage                          |
|--------------------|-------------|--------------------------------|
| `--font-heading`   | Cinzel      | All section headings, titles   |
| `--font-arabian`   | El Messiri  | Decorative Arabian accents     |
| `--font-body`      | Inter       | Body text, UI elements         |

### Key CSS Classes

| Class                 | Purpose                                        |
|-----------------------|------------------------------------------------|
| `.glass-card`         | Standard glass morphism card                   |
| `.glass-card-premium` | Premium variant with gold gradient border      |
| `.btn-gold`           | Primary gold gradient button with shimmer      |
| `.btn-outline-gold`   | Outline gold button                            |
| `.section-container`  | Max-width centered container with padding      |
| `.section-py`         | Standard section vertical padding              |
| `.section-heading`    | Section heading typography styles              |
| `.text-gradient-gold` | Gold gradient text                             |
| `.bg-glow-arabian`    | Radial gold aura glow overlay                  |
| `.bg-noise`           | Film grain texture overlay                     |
| `.bg-pattern-arabian` | Subtle Islamic geometric dot pattern           |

### CSS Animations

| Animation             | Description                                   |
|-----------------------|-----------------------------------------------|
| `glow-pulse`          | Breathing opacity pulse (stars, glows)        |
| `fog-drift`           | Horizontal fog movement with opacity shift    |
| `ember-drift`         | Vertical particle rise with fade              |
| `float`               | Gentle vertical floating motion               |
| `shimmer`             | Horizontal shimmer sweep                      |
| `spin-slow`           | Slow continuous rotation                      |
| `gallery-scroll`      | Infinite horizontal scroll for galleries      |

---

## Animation Architecture

### CRITICAL RULE: Library Separation

**Never animate the same CSS property on the same element with both GSAP and Framer Motion.**

| Library          | Responsibility                                                  |
|------------------|-----------------------------------------------------------------|
| **Framer Motion** | Component-level: hover, tap, whileInView, stagger, card animations, button interactions, navbar transitions, text reveals |
| **GSAP**         | Section-level: hero intro timeline, ScrollTrigger parallax, fog drift, lantern floating loops, cursor smoothing, ambient world motion, cinematic timeline choreography |

### Framer Motion Presets (`lib/motionPresets.ts`)

**Easing curves:** `expoOut`, `spring`, `cinematic`, `smooth`, `dramatic`
**Timing:** `fast (0.2s)`, `base (0.35s)`, `medium (0.5s)`, `slow (0.7s)`, `cinematic (1.2s)`
**Stagger:** `fast (0.05)`, `base (0.08)`, `medium (0.12)`, `slow (0.18)`

**Variants:**
- `fadeUp` / `fadeUpBlur` — standard entrance animations
- `cinematicReveal` — scale + fade + blur reveal
- `staggerContainer` / `staggerContainerSlow` — parent stagger wrappers
- `floatingMotion` — idle float for decorative elements
- `glowPulse` — breathing aura effect
- `magicalHover` — levitation + glow bloom
- `cinematicIntro` — blur-to-clear text entrance
- `shimmerSweep` — button background shimmer
- `cardVariants` — staggered card entrance
- `textReveal` — per-character/word text reveal
- `sectionEntrance` — section fade-up
- `hoverLift` / `hoverGlow` / `hoverMagnetic` — hover presets
- `tapShrink` — tap feedback

**Viewport configs:** `viewport` (margin: -80px, once), `viewportTight` (margin: -40px, once)

### GSAP Presets (`lib/gsapPresets.ts`)

**Easing strings:** `cinematic (power4.out)`, `smooth (power2.inOut)`, `expo (expo.out)`, `elastic`, `gentle (sine.inOut)`, `drift (sine.out)`

**Functions:**
- `buildHeroTimeline(refs)` — Cinematic hero intro sequence (fog → moon → palace → lanterns → particles)
- `attachLanternFloat(el, options)` — Infinite floating loop with natural sway
- `attachMoonPulse(el)` — Moon aura breathing animation
- `attachParallax(el, trigger, speed)` — ScrollTrigger parallax
- `attachSectionReveal(container, options)` — ScrollTrigger staggered reveal for `[data-reveal]` children
- `attachScrollGlow(trigger)` — Scroll-driven glow intensity modulation
- `initGsapCursor(elements)` — Smooth cursor interpolation with core/aura lag
- `animateFogBlob(el, options)` — Organic fog drift animation
- `attachGlowBreathing(el, duration)` — Ambient glow pulse
- `killAllScrollTriggers()` — Cleanup on unmount

---

## Component Patterns

### Data Fetching Pattern

All public-facing components follow the same pattern:
1. Initialize with **fallback data** (hardcoded)
2. `useEffect` on mount → `fetch("/api/public/...")` 
3. If API returns data, update state; if error, keep fallback
4. This ensures the site always renders even without a database

### Section Component Pattern

Most sections follow:
```tsx
<SectionWrapper id="section-id" withPattern>
  <SectionHeading text="Normal" accent="GoldText" arabianText="✦ Decorative ✦" subtitle="..." />
  {/* Content */}
</SectionWrapper>
```

### Theme System

- Two themes: `night` (default, dark) and `day` (light, warm parchment)
- Toggled via `ThemeToggle` component in Navbar
- Theme class (`theme-night` / `theme-day`) applied to `<html>`
- All components use CSS custom properties → automatic theme switching
- Persisted to `localStorage` as `riviera-theme`

---

## Global Atmospheric Layers (in `layout.tsx`)

These are fixed-position layers rendered at the root level:

1. **FogLayer** (`z-[1]`) — 3 CSS-animated radial gradient blobs creating drifting fog
2. **ParticleLayer** (`z-[2]`) — Canvas-based floating gold ember particles (GPU-accelerated)
3. **MouseGlow** (`z-[50]`) — Custom cursor with gold core, aura, ember trail, click ripple (desktop only)
4. **Navbar** — Fixed floating glass navbar at top

---

## Homepage Section Order

```
Hero → RegistrationSection → UpcomingEvents → Schedule → Activities → Gallery → Sponsors → Footer
```

---

## Hero Section Architecture

The hero is the most complex component (541 lines). It features:

- **Intro sequence:** 3 narrative lines appear sequentially (Framer Motion), then fade to main content
- **Split layout:** Left = storytelling content, Right = cinematic visual world
- **Visual elements:** Crescent moon (SVG), floating lanterns (5), desert fog wisps, geometric rings, floating embers, stars
- **Parallax:** `useScroll` + `useTransform` for moon, palace, content, and right panel
- **Mouse reactivity:** Normalized mouse position drives a glow layer
- **Palace silhouette:** Full-width SVG at bottom with gold edge glow
- **CTA buttons:** "Enter The Realm" (primary, rounded pill with icon) + "Discover The Festival" (outline)

---

## Key Dependencies

```json
{
  "framer-motion": "^12.34.2",
  "gsap": "latest",
  "lucide-react": "^0.574.0",
  "next": "16.1.6",
  "react": "19.2.3",
  "@supabase/supabase-js": "^2.95.3",
  "razorpay": "^2.9.6",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.3"
}
```

---

## API Route Structure

### Public APIs (no auth required)
- `GET /api/public/events` — List events
- `GET /api/public/gallery` — List gallery albums with images
- `GET /api/public/schedule` — Get schedule grouped by day
- `GET /api/public/sponsors` — List sponsors
- `GET /api/public/activities` — List activities
- `GET /api/public/settings` — Get site settings (dates, venue, contact info)

### Auth APIs
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login (returns JWT)
- `POST /api/auth/reset-password` — Password reset

### Admin APIs (JWT protected)
- `POST /api/admin/login` — Admin login
- CRUD endpoints for: events, gallery, schedule, sponsors, activities, settings, contact

---

## Important Conventions

1. **"use client"** — All components with interactivity are client components
2. **CSS variables over Tailwind** — Inline `style={{ color: "var(--text-primary)" }}` is preferred for theme-aware colors
3. **Framer Motion `motion.div`** — Used extensively for entrance animations, hover states, layout animations
4. **Gold as primary accent** — Everything revolves around the gold palette; red is secondary
5. **Glass morphism** — Cards use backdrop-filter blur with semi-transparent backgrounds
6. **Cinematic naming** — Variables and functions use words like "cinematic", "magical", "luxurious"
7. **No placeholder images** — All images either come from the API or use fallback files in `/public`
8. **Responsive** — Mobile-first with breakpoints at `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
9. **Performance** — Prefer `transform`, `opacity`, `scale` over layout-heavy properties
10. **GPU acceleration** — Canvas for particles, `will-change-transform` on cursor elements, `force3D` in GSAP

---

## Active Animation Enhancement (Current Task)

The project is being upgraded with a **comprehensive GSAP + Framer Motion cinematic animation system** to transform it from a static modern website into a living cinematic Arabian fantasy-tech experience. Key additions include:

- GSAP-powered hero intro timeline choreography
- ScrollTrigger-based parallax and section reveals
- Enhanced fog, particle, and glow systems
- GSAP cursor smoothing with magnetic interactions
- Deeper Framer Motion variants for all component interactions
- Scroll-driven lighting and atmospheric shifts
