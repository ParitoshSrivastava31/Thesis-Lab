# ThesisLab — Complete Implementation Guide
### *The Investment Constellation Engine*

> **Who this doc is for:** You, working in a code editor with an AI assistant (Cursor, Windsurf, Claude Code, etc.). This doc is your source of truth. Paste sections of it directly into your AI assistant as context when building each feature. Everything here is intentional — follow it precisely for the best result.

---

## TABLE OF CONTENTS

1. [Product Vision (Refined)](#1-product-vision-refined)
2. [Design System](#2-design-system)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Database Schema](#5-database-schema)
6. [Page-by-Page Walkthrough](#6-page-by-page-walkthrough)
7. [Core Features — Deep Spec](#7-core-features--deep-spec)
8. [Simulation Engine — Math & Logic](#8-simulation-engine--math--logic)
9. [Component Library](#9-component-library)
10. [Build Sprints (5 Weeks)](#10-build-sprints-5-weeks)
11. [AI Prompts for Code Editor](#11-ai-prompts-for-code-editor)

---

## 1. PRODUCT VISION (REFINED)

### What ThesisLab Actually Is

ThesisLab is a **structured belief modeling tool** for investors who think probabilistically. It does one thing brilliantly: it takes your investment thesis — which normally lives as scattered notes, gut feelings, and slide decks — and turns it into a living, mathematically-connected graph that you can stress-test, version, and share.

### The Core Insight (Don't Lose This)

Most investors have beliefs. Few have *structured* beliefs. When you ask a typical angel investor "what's your AI infrastructure thesis?" they'll tell you a story. ThesisLab forces them to answer a harder question: "What are the 8 assumptions behind that story, how confident are you in each, and which one — if wrong — kills the whole thesis?"

That tension between story and structure is the product's soul.

### Refined Feature Set vs. Original Blueprint

| Original Blueprint | Refined Decision | Reason |
|---|---|---|
| 3D constellation via React Three Fiber | **Keep, but make it toggleable** | 3D is the wow factor, but 2D mode needed for mobile/accessibility |
| Monte Carlo in Phase 2 | **Move simplified version to MVP** | Without it, the product feels like a mood board, not an engine |
| AI-assisted structuring as optional | **Include as "Thesis Parser" in Pro** | Massive retention driver — users paste their thesis, AI structures it |
| Version history | **Core MVP feature** | This is the stickiness engine. Do not cut it. |
| Calibration tracker | **Phase 2, but design for it now** | Design the data model from day 1 to support it |
| Collaboration | **Phase 3** | Don't over-engineer early |

### The Emotional Arc of a User Session

1. **Enter** → They see their constellation. It's beautiful. They feel smart.
2. **Stress test** → They drag a probability slider down. Nodes dim. The thesis strength score drops. Their stomach tightens a little.
3. **Discover** → The sensitivity mode highlights which node matters most. It's not what they expected.
4. **Articulate** → They export a scenario report. It's professional. They send it to their co-investor.
5. **Return** → A week later, something changed in the market. They come back to update their probabilities. The version history shows the drift.

This arc drives every design decision below.

---

## 2. DESIGN SYSTEM

### Aesthetic Direction: "Orbital Intelligence"

Not cyberpunk. Not corporate dashboard. Think: **a high-resolution map of invisible forces**. The visual language of gravitational lensing, network topology, and precision instrumentation. It should feel like the tool a serious quant would use if they had taste.

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-void: #05060A;         /* deepest background — almost black with blue undertone */
  --bg-surface: #0C0E18;      /* card surfaces */
  --bg-elevated: #131628;     /* modals, panels */
  --bg-border: #1E2235;       /* subtle borders */

  /* Primary Brand */
  --brand-primary: #4B7BFF;   /* electric blue — primary actions, active nodes */
  --brand-glow: #4B7BFF33;    /* blue glow (20% opacity) for halos */
  --brand-pulse: #7B9FFF;     /* lighter blue for pulsing animations */

  /* Node Type Colors */
  --node-macro: #4B7BFF;      /* macro factors — blue */
  --node-sector: #A855F7;     /* sector trends — purple */
  --node-company: #22D3EE;    /* company-specific — cyan */
  --node-risk: #F43F5E;       /* risk factors — red */
  --node-catalyst: #F59E0B;   /* catalysts — amber */
  --node-structural: #10B981; /* structural drivers — emerald */

  /* Thesis Strength Score */
  --score-strong: #10B981;    /* 70–100 — emerald */
  --score-moderate: #F59E0B;  /* 40–69 — amber */
  --score-weak: #F43F5E;      /* 0–39 — red */

  /* Text */
  --text-primary: #F0F2FF;    /* near-white with blue tint */
  --text-secondary: #8891B8;  /* muted text */
  --text-tertiary: #454D6D;   /* very muted, labels */

  /* Utility */
  --positive: #10B981;
  --negative: #F43F5E;
  --warning: #F59E0B;
  --neutral: #8891B8;
}
```

### Typography

```css
/* Import in layout.tsx */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

/* Also use locally via next/font */
```

| Use | Font | Weight | Notes |
|---|---|---|---|
| Page titles, hero | **Syne** | 700–800 | Wide, geometric, architectural |
| UI labels, nav | **Syne** | 400–600 | Same family keeps it cohesive |
| Numbers, scores, data | **JetBrains Mono** | 400–500 | Monospace makes numbers feel precise |
| Body / descriptions | **Syne** | 400 | Light weight at 0.95 opacity |
| Node labels in canvas | **JetBrains Mono** | 400 | Always monospace in the graph |

### Spacing Scale

```css
/* Use these only — no arbitrary values */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Motion Principles

Every animation in ThesisLab communicates something. Nothing decorates.

| Animation | Duration | Easing | What It Communicates |
|---|---|---|---|
| Node probability change → brightness | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Gradual confidence shift |
| Ripple propagation along edges | 800ms | `ease-in-out` | Causal chain |
| Score number tick | 400ms | `ease-out` | Precision calculation |
| Panel slide in/out | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Information arrival |
| Node pulse (idle) | 3000ms | `ease-in-out`, `infinite` | The thesis is alive |
| Sensitivity mode reveal | 500ms | staggered 50ms per node | Hierarchy emerging |
| Constellation orbit (3D idle) | 60000ms | `linear`, `infinite` | The universe turns |

### Glow Effects

This is what makes nodes feel alive. Use sparingly but precisely.

```css
/* Base node glow — applied to active node meshes */
.node-glow {
  filter: drop-shadow(0 0 6px var(--node-color)) 
          drop-shadow(0 0 18px var(--node-color-40));
}

/* Thesis core central glow */
.core-glow {
  box-shadow: 
    0 0 20px var(--brand-primary),
    0 0 60px var(--brand-glow),
    0 0 120px rgba(75, 123, 255, 0.08);
}

/* Panel borders — subtle luminescence */
.panel-border {
  border: 1px solid var(--bg-border);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
}
```

### Layout Grid

The app uses a **three-panel layout** on the Thesis View page. Everything else is standard.

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR (56px)                                       │
├──────────────┬─────────────────────┬────────────────┤
│  LEFT PANEL  │   CANVAS (CENTER)   │  RIGHT PANEL   │
│  (300px)     │   (flex-1)          │  (320px)       │
│              │                     │                │
│  Assumption  │   3D/2D             │  Node Details  │
│  List        │   Constellation     │  Strength      │
│              │                     │  Score         │
│  Scenario    │                     │  Sensitivity   │
│  Controls    │                     │                │
│              │                     │  Monte Carlo   │
│              │                     │  Chart         │
├──────────────┴─────────────────────┴────────────────┤
│  TIMELINE SLIDER (48px)                             │
└─────────────────────────────────────────────────────┘
```

---

## 3. TECH STACK

### Complete Stack with Versions

```
Framework:        Next.js 14 (App Router)
Language:         TypeScript 5.x (strict mode)
Styling:          Tailwind CSS 3.x + CSS variables
3D Rendering:     React Three Fiber (r3f) + @react-three/drei
2D Graph:         React Flow (fallback + mobile)
State:            Zustand 4.x (graph state) + TanStack Query (server state)
Animations:       Framer Motion 11
Database:         Supabase (Postgres + Auth + Row Level Security + Realtime)
Auth:             Supabase Auth (built-in — no extra package needed)
Payments:         Stripe
Charts:           Recharts (Monte Carlo distribution)
Forms:            React Hook Form + Zod
Deployment:       Vercel
```

### Why These Choices

- **Supabase** — Gives you Postgres, auth, row-level security, and auto-generated TypeScript types all in one. Perfect for a solo build. You write SQL directly and get a typed JS client back — no ORM overhead.
- **Supabase Auth over Clerk** — Zero extra cost, built into the same dashboard you're already using. Supports Google OAuth, magic links, and email/password out of the box.
- **Zustand over Redux** — The graph state is complex but doesn't need Redux overhead.
- **React Three Fiber over vanilla Three.js** — R3F makes the constellation maintainable. You'll need to add new node types over time.

### Installation

```bash
npx create-next-app@latest thesislab --typescript --tailwind --app
cd thesislab

# Core
npm install zustand @tanstack/react-query framer-motion

# 3D
npm install @react-three/fiber @react-three/drei three
npm install @types/three

# 2D fallback graph
npm install reactflow

# Supabase (DB + Auth — replaces Prisma + Clerk)
npm install @supabase/supabase-js @supabase/ssr

# Payments
npm install stripe @stripe/stripe-js

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Charts
npm install recharts

# Utilities
npm install clsx tailwind-merge date-fns nanoid
npm install @radix-ui/react-slider @radix-ui/react-tooltip @radix-ui/react-dialog
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only, never expose
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 4. PROJECT STRUCTURE

```
thesislab/
├── app/
│   ├── (marketing)/              # Public pages group
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/page.tsx
│   │   └── layout.tsx            # Marketing layout (no sidebar)
│   │
│   ├── (app)/                    # Authenticated app group
│   │   ├── dashboard/page.tsx
│   │   ├── thesis/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # Main thesis view (3-panel)
│   │   │   │   ├── compare/page.tsx
│   │   │   │   └── report/page.tsx
│   │   │   └── new/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx            # App layout (with sidebar/nav)
│   │
│   ├── api/
│   │   ├── thesis/
│   │   │   ├── route.ts          # GET all, POST create
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE single thesis
│   │   ├── nodes/route.ts
│   │   ├── edges/route.ts
│   │   ├── simulation/route.ts   # Run propagation engine
│   │   ├── monte-carlo/route.ts  # Run MC simulation
│   │   ├── scenarios/route.ts
│   │   └── webhooks/stripe/route.ts
│   │
│   ├── globals.css
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── canvas/
│   │   ├── ConstellationCanvas.tsx   # R3F scene root
│   │   ├── NodeMesh.tsx              # 3D node sphere
│   │   ├── EdgeLine.tsx              # 3D edge beam
│   │   ├── ConstellationCore.tsx     # Central thesis strength orb
│   │   ├── ParticleField.tsx         # Background particles
│   │   ├── CameraController.tsx      # Orbit controls
│   │   └── GraphCanvas2D.tsx         # React Flow fallback
│   │
│   ├── panels/
│   │   ├── LeftPanel.tsx
│   │   ├── RightPanel.tsx
│   │   ├── AssumptionList.tsx
│   │   ├── NodeDetail.tsx
│   │   ├── StrengthScore.tsx
│   │   ├── SensitivityPanel.tsx
│   │   └── MonteCarloChart.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Slider.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   ├── ConfidenceRing.tsx
│   │   ├── ScoreGauge.tsx
│   │   └── ProbabilityBadge.tsx
│   │
│   ├── dashboard/
│   │   ├── ThesisCard.tsx
│   │   ├── ThesisGrid.tsx
│   │   └── StatsBar.tsx
│   │
│   └── layout/
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── ThesisHeader.tsx
│
├── lib/
│   ├── simulation/
│   │   ├── propagation.ts        # Core graph propagation engine
│   │   ├── monteCarlo.ts         # MC runner
│   │   ├── scoring.ts            # Thesis strength scoring
│   │   └── sensitivity.ts        # Sensitivity analysis
│   │
│   ├── graph/
│   │   ├── layout.ts             # Force-directed layout algorithm
│   │   └── transform.ts          # DB model ↔ graph model transforms
│   │
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (singleton)
│   │   ├── server.ts             # Server Supabase client (for API routes / RSC)
│   │   └── middleware.ts         # Auth session refresh middleware
│   │
│   └── utils.ts                  # Shared utilities
│
├── store/
│   ├── graphStore.ts             # Zustand — node/edge state
│   ├── simulationStore.ts        # Zustand — simulation results
│   └── uiStore.ts                # Zustand — panel state, mode
│
├── types/
│   ├── thesis.ts
│   ├── graph.ts
│   └── simulation.ts
│
├── prisma/
│   └── schema.prisma
│
└── hooks/
    ├── useThesis.ts
    ├── useSimulation.ts
    ├── useGraph.ts
    └── useMonteCarlo.ts
```

---

## 5. DATABASE SCHEMA

ThesisLab uses Supabase's Postgres database. All tables are created via SQL in the Supabase SQL Editor. Auth is handled by `supabase.auth` — user records live in Supabase's managed `auth.users` table and you reference them via `auth.uid()` in RLS policies.

### Supabase Client Setup

```typescript
// lib/supabase/client.ts
// Use this in Client Components and browser-side code
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'   // generated types (see below)

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// lib/supabase/server.ts
// Use this in Server Components, API routes, and Server Actions
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

```typescript
// middleware.ts  (root of project)
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — CRITICAL: do not remove
  const { data: { user } } = await supabase.auth.getUser()

  // Protect /dashboard and /thesis routes
  if (!user && request.nextUrl.pathname.startsWith('/(app)')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### Auth Setup (Supabase Auth)

```typescript
// In your login page or auth component:
const supabase = createClient()

// Email + password sign up
await supabase.auth.signUp({ email, password })

// Email + password sign in
await supabase.auth.signInWithPassword({ email, password })

// Google OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${window.location.origin}/auth/callback` }
})

// Sign out
await supabase.auth.signOut()

// Get current user (server-side)
const { data: { user } } = await supabase.auth.getUser()
```

```typescript
// app/auth/callback/route.ts  — OAuth callback handler
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
```

### SQL Schema

Run this in your **Supabase SQL Editor** (Database → SQL Editor → New Query):

```sql
-- ─────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────

CREATE TYPE plan AS ENUM ('FREE', 'PRO', 'PREMIUM');
CREATE TYPE time_horizon AS ENUM ('ONE_YEAR', 'THREE_YEARS', 'FIVE_YEARS');
CREATE TYPE node_type AS ENUM (
  'MACRO_FACTOR', 'SECTOR_TREND', 'COMPANY_FACTOR',
  'RISK_FACTOR', 'CATALYST', 'STRUCTURAL_DRIVER'
);
CREATE TYPE confidence_level AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE time_relevance AS ENUM ('SHORT', 'MEDIUM', 'LONG');
CREATE TYPE edge_strength AS ENUM ('WEAK', 'MODERATE', 'STRONG', 'CRITICAL');
CREATE TYPE dependency_type AS ENUM ('CAUSAL', 'CORRELATED', 'CONDITIONAL');


-- ─────────────────────────────────────────────
-- PROFILES (extends auth.users)
-- ─────────────────────────────────────────────

CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  plan          plan NOT NULL DEFAULT 'FREE',
  stripe_customer_id TEXT UNIQUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ─────────────────────────────────────────────
-- THESES
-- ─────────────────────────────────────────────

CREATE TABLE theses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  statement       TEXT NOT NULL,
  description     TEXT,
  time_horizon    time_horizon NOT NULL DEFAULT 'THREE_YEARS',
  strength_score  FLOAT NOT NULL DEFAULT 0,
  is_public       BOOLEAN NOT NULL DEFAULT false,
  share_token     TEXT UNIQUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX theses_user_id_idx ON theses(user_id);


-- ─────────────────────────────────────────────
-- NODES
-- ─────────────────────────────────────────────

CREATE TABLE nodes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id         UUID NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  description       TEXT,
  evidence_links    TEXT[] NOT NULL DEFAULT '{}',
  notes             TEXT,

  -- Probabilistic properties
  probability       FLOAT NOT NULL DEFAULT 70 CHECK (probability BETWEEN 0 AND 100),
  confidence        confidence_level NOT NULL DEFAULT 'MEDIUM',
  time_relevance    time_relevance NOT NULL DEFAULT 'MEDIUM',
  node_type         node_type NOT NULL DEFAULT 'STRUCTURAL_DRIVER',

  -- Graph layout (persisted positions)
  pos_x             FLOAT NOT NULL DEFAULT 0,
  pos_y             FLOAT NOT NULL DEFAULT 0,
  pos_z             FLOAT NOT NULL DEFAULT 0,

  -- Computed / cached
  sensitivity_score FLOAT NOT NULL DEFAULT 0,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX nodes_thesis_id_idx ON nodes(thesis_id);


-- ─────────────────────────────────────────────
-- EDGES
-- ─────────────────────────────────────────────

CREATE TABLE edges (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id       UUID NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  from_node_id    UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  to_node_id      UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  strength        edge_strength NOT NULL DEFAULT 'MODERATE',
  dependency_type dependency_type NOT NULL DEFAULT 'CAUSAL',
  weight          FLOAT NOT NULL DEFAULT 0.5 CHECK (weight BETWEEN 0 AND 1),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT no_self_loops CHECK (from_node_id <> to_node_id),
  UNIQUE(thesis_id, from_node_id, to_node_id)
);

CREATE INDEX edges_thesis_id_idx ON edges(thesis_id);
CREATE INDEX edges_from_node_idx ON edges(from_node_id);
CREATE INDEX edges_to_node_idx ON edges(to_node_id);


-- ─────────────────────────────────────────────
-- SCENARIOS
-- ─────────────────────────────────────────────

CREATE TABLE scenarios (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id       UUID NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  description     TEXT,
  is_baseline     BOOLEAN NOT NULL DEFAULT false,
  node_snapshot   JSONB NOT NULL,      -- { [nodeId]: probability }
  strength_score  FLOAT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX scenarios_thesis_id_idx ON scenarios(thesis_id);


-- ─────────────────────────────────────────────
-- VERSIONS (auto-saved history)
-- ─────────────────────────────────────────────

CREATE TABLE versions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_id   UUID NOT NULL REFERENCES theses(id) ON DELETE CASCADE,
  snapshot    JSONB NOT NULL,    -- { nodes: [...], edges: [...], strengthScore }
  change_note TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX versions_thesis_id_idx ON versions(thesis_id);


-- ─────────────────────────────────────────────
-- SUBSCRIPTIONS
-- ─────────────────────────────────────────────

CREATE TABLE subscriptions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id  TEXT UNIQUE NOT NULL,
  plan                    plan NOT NULL,
  status                  TEXT NOT NULL,   -- 'active' | 'canceled' | 'past_due'
  current_period_end      TIMESTAMPTZ NOT NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─────────────────────────────────────────────
-- updated_at TRIGGER (apply to theses + nodes)
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER theses_updated_at BEFORE UPDATE ON theses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER nodes_updated_at BEFORE UPDATE ON nodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Row Level Security (RLS)

Run this immediately after the schema above. **RLS is what prevents users from accessing each other's data.** Never skip this.

```sql
-- ─────────────────────────────────────────────
-- ENABLE RLS ON ALL TABLES
-- ─────────────────────────────────────────────

ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE theses       ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE edges        ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios    ENABLE ROW LEVEL SECURITY;
ALTER TABLE versions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────
-- PROFILES POLICIES
-- ─────────────────────────────────────────────

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);


-- ─────────────────────────────────────────────
-- THESES POLICIES
-- ─────────────────────────────────────────────

-- Owner can do everything
CREATE POLICY "Owner full access on theses"
  ON theses FOR ALL USING (auth.uid() = user_id);

-- Anyone can read public theses (for share links)
CREATE POLICY "Public theses are readable by all"
  ON theses FOR SELECT USING (is_public = true);


-- ─────────────────────────────────────────────
-- NODES POLICIES
-- (inherit thesis ownership — join check)
-- ─────────────────────────────────────────────

CREATE POLICY "Owner full access on nodes"
  ON nodes FOR ALL USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = nodes.thesis_id
      AND theses.user_id = auth.uid()
    )
  );

CREATE POLICY "Public thesis nodes readable"
  ON nodes FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = nodes.thesis_id
      AND theses.is_public = true
    )
  );


-- ─────────────────────────────────────────────
-- EDGES POLICIES
-- ─────────────────────────────────────────────

CREATE POLICY "Owner full access on edges"
  ON edges FOR ALL USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = edges.thesis_id
      AND theses.user_id = auth.uid()
    )
  );

CREATE POLICY "Public thesis edges readable"
  ON edges FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = edges.thesis_id
      AND theses.is_public = true
    )
  );


-- ─────────────────────────────────────────────
-- SCENARIOS, VERSIONS, SUBSCRIPTIONS
-- ─────────────────────────────────────────────

CREATE POLICY "Owner full access on scenarios"
  ON scenarios FOR ALL USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = scenarios.thesis_id
      AND theses.user_id = auth.uid()
    )
  );

CREATE POLICY "Owner full access on versions"
  ON versions FOR ALL USING (
    EXISTS (
      SELECT 1 FROM theses
      WHERE theses.id = versions.thesis_id
      AND theses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);
```

### Generating TypeScript Types

After setting up your schema, generate fully-typed Supabase types with:

```bash
# Install Supabase CLI first
npm install -g supabase

# Login and link your project
supabase login
supabase link --project-ref your-project-ref

# Generate types → types/supabase.ts
supabase gen types typescript --linked > types/supabase.ts
```

This gives you `Database` — a complete type map for every table, used in the client setup above. Re-run this any time you change the schema.

### Example API Route (using Supabase server client)

```typescript
// app/api/thesis/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('theses')
    .select(`
      *,
      nodes(count),
      scenarios(count)
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const { data, error } = await supabase
    .from('theses')
    .insert({
      user_id: user.id,
      name: body.name,
      statement: body.statement,
      description: body.description,
      time_horizon: body.timeHorizon ?? 'THREE_YEARS',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
```

### Plan Gating Utility

```typescript
// lib/utils.ts
import { createClient } from '@/lib/supabase/server'

export async function getUserPlan(): Promise<'FREE' | 'PRO' | 'PREMIUM'> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 'FREE'

  const { data } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  return data?.plan ?? 'FREE'
}

export const PLAN_LIMITS = {
  FREE:    { maxTheses: 1, maxNodesPerThesis: 6,  canSaveScenarios: false },
  PRO:     { maxTheses: 999, maxNodesPerThesis: 999, canSaveScenarios: true },
  PREMIUM: { maxTheses: 999, maxNodesPerThesis: 999, canSaveScenarios: true },
}
```

---

## 6. PAGE-BY-PAGE WALKTHROUGH

### PAGE 1 — Landing Page (`/`)

**Goal:** Make someone lean forward in their chair within 5 seconds.

**Layout:**

```
NAVBAR
  ├── Logo: "ThesisLab" in Syne 700, white
  ├── Nav links: Features, Pricing (text-secondary, hover: white)
  └── CTA: "Start Modeling" — filled blue button

HERO SECTION (full viewport height)
  ├── Background: Deep void (#05060A) + animated particle field (subtle)
  ├── Subheadline (top, small): "FOR PROBABILISTIC INVESTORS"
  │   └── Syne 400, letter-spacing: 0.2em, text-tertiary, uppercase
  │
  ├── Headline (center):
  │   "Your thesis has hidden
  │    fault lines."
  │   └── Syne 800, 72px, text-primary, line-height: 1.1
  │
  ├── Sub-copy (below headline):
  │   "ThesisLab maps the structure of your belief.
  │    Find which assumption matters most."
  │   └── Syne 400, 20px, text-secondary
  │
  ├── CTA row:
  │   ├── Primary: "Build Your First Thesis →" (blue button)
  │   └── Secondary: "See a Live Example" (ghost button)
  │
  └── ANIMATED MINI-CONSTELLATION (below CTA)
      └── Small R3F canvas, 5–7 nodes, slowly rotating, auto-propagating
          demonstration with no interaction required.

SECTION 2: "HOW STRUCTURED IS YOUR THINKING?"
  ├── 3-column layout showing the transformation:
  │   LEFT: "Your thesis today" → scattered sticky notes illustration
  │   CENTER: → arrow with "ThesisLab"
  │   RIGHT: "Your thesis structured" → mini constellation
  └── Copy: "From narrative to network."

SECTION 3: FEATURE HIGHLIGHTS
  4-panel grid, each with a micro-animation on hover:
  ┌─────────────────────┐  ┌─────────────────────┐
  │  🔵 Constellation   │  │  📊 Strength Score  │
  │  Map your belief    │  │  Know if it holds   │
  │  as a living graph  │  │  before markets do  │
  └─────────────────────┘  └─────────────────────┘
  ┌─────────────────────┐  ┌─────────────────────┐
  │  ⚡ Sensitivity     │  │  📁 Version History │
  │  Find which node    │  │  Track how your     │
  │  kills your thesis  │  │  conviction drifts  │
  └─────────────────────┘  └─────────────────────┘

SECTION 4: SOCIAL PROOF
  "Built for investors who think in systems"
  ├── Small avatar + quote (placeholder initially)
  └── Logos of tools they use alongside (notion, obsidian, etc.)

SECTION 5: PRICING (see Pricing page for full spec)

FOOTER
  ├── Logo + tagline
  ├── Links: Terms, Privacy, Twitter/X
  └── "Built for serious investors."
```

**Design Notes:**
- The hero mini-constellation should auto-demo a "probability shift" every 4 seconds: one node dims, ripple travels, thesis core pulses. This is the product selling itself.
- Use `framer-motion` `viewport` prop on sections for scroll-triggered reveals.
- The headline font at 72px with Syne 800 at this palette will be genuinely striking.

---

### PAGE 2 — Dashboard (`/dashboard`)

**Goal:** Instant orientation. What are my theses? Which needs attention?

**Layout:**

```
NAVBAR (56px, fixed)
  ├── ThesisLab logo (left)
  ├── "Dashboard" breadcrumb
  └── Right: Plan badge + user avatar

HEADER ROW (padding: 40px 0 24px)
  ├── "Your Theses" — Syne 700, 32px
  ├── Subtitle: "3 active · Avg strength: 72" (text-secondary)
  └── Right: "+ New Thesis" button (blue, filled)

STATS BAR (4 horizontal stat cards)
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │  3           │ │  72          │ │  14          │ │  2           │
  │  THESES      │ │  AVG SCORE   │ │  ASSUMPTIONS │ │  SCENARIOS   │
  │              │ │              │ │  TOTAL       │ │  SAVED       │
  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
  All cards: bg-surface, thin border, JetBrains Mono for the number, Syne label

THESIS GRID (below stats, 2–3 columns depending on viewport)
  Each ThesisCard:
  ┌────────────────────────────────────────┐
  │  [MINI CONSTELLATION PREVIEW]          │  ← 180px tall, non-interactive R3F scene
  │                                        │
  ├────────────────────────────────────────┤
  │  AI Infrastructure Bull Case          │  ← thesis name, Syne 600
  │  5Y horizon · 7 nodes · 3 edges       │  ← meta, text-secondary
  │                                        │
  │  STRENGTH: ████████░░ 78              │  ← progress bar + JetBrains Mono score
  │                                        │
  │  Modified 2 days ago                  │  ← text-tertiary
  │                                        │
  │  [Open] [Compare] [···]               │  ← action buttons
  └────────────────────────────────────────┘

EMPTY STATE (if no theses):
  Center of page:
  ├── Faint constellation illustration (SVG, not 3D for perf)
  ├── "Your constellation awaits."
  ├── "Start by defining your first investment thesis."
  └── "Create Thesis" button
```

**Interaction Notes:**
- The mini constellation preview on each card is a real but static R3F scene (no physics, no interaction). It uses the actual node/edge data.
- Hovering a card subtly lifts it (translateY: -4px) and brightens the constellation preview slightly.
- The strength bar animates in on load with a 400ms sweep.

---

### PAGE 3 — Thesis View (`/thesis/[id]`) ⭐ CORE PAGE

**Goal:** This is the product. Every other page exists to get users here.

**Full 3-Panel Layout:**

```
┌────────────────────────────────────────────────────────────────────┐
│ THESIS HEADER (48px)                                               │
│ ← Dashboard  |  "AI Infrastructure Bull Case"  |  [Save] [Share]  │
├───────────────┬────────────────────────────────┬───────────────────┤
│ LEFT PANEL    │ CONSTELLATION CANVAS           │ RIGHT PANEL       │
│ 300px         │ flex-1                         │ 320px             │
│               │                               │                   │
│ [Assumptions] │    ·  ·   ·                   │ NODE DETAIL       │
│ ─────────     │  ·   [○]─────[○]   ·          │ (when selected)   │
│ + Risk        │       \   /                   │ ─────────         │
│   [83%] RISK  │     ·  [●]  ·                 │ STRENGTH SCORE    │
│               │         \                     │ ─────────         │
│ + AI Compute  │          [○] ·                │ SENSITIVITY       │
│   [91%] MACRO │                               │ ─────────         │
│               │    rotate/orbit freely        │ MC DISTRIBUTION   │
│ + Regulation  │                               │                   │
│   [45%] RISK  │                               │                   │
│               │ ─────────────────────────     │                   │
│ + Hyperscaler │ [2D ↔ 3D] [Sensitivity]      │                   │
│   [78%] COMP  │ [Reset Camera] [Add Node +]   │                   │
│               │                               │                   │
│ ─────────     │                               │                   │
│ SCENARIOS     │                               │                   │
│ > Baseline    │                               │                   │
│   Bear Case   │                               │                   │
│ + New         │                               │                   │
│               │                               │                   │
│ ─────────     │                               │                   │
│ HISTORY       │                               │                   │
│ Today         │                               │                   │
│ 3 days ago    │                               │                   │
│ Last week     │                               │                   │
└───────────────┴────────────────────────────────┴───────────────────┘
│ TIMELINE SLIDER (48px)                                             │
│ |──────────────●────────────────| 2024 → 2027 → 2029             │
└────────────────────────────────────────────────────────────────────┘
```

**Left Panel — Assumption List:**

Each assumption row:
```
┌──────────────────────────────────┐
│ ◉ AI Compute Cost Decline        │  ← Node type icon (colored) + title
│   Macro Factor                   │  ← type label, text-tertiary
│   [▓▓▓▓▓▓▓▓▓░] 91%             │  ← mini probability bar + value (JetBrains Mono)
│   ● HIGH confidence              │  ← confidence dot indicator
└──────────────────────────────────┘
```
- Clicking a row selects the node (highlights it in canvas + loads Node Detail in right panel)
- Probability can be adjusted inline via a small slider that appears on hover
- Dragging the inline slider immediately triggers propagation animation in canvas

**Canvas Toolbar (bottom of canvas):**
```
[2D] [3D]  |  [Sensitivity Mode]  |  [Reset Camera]  |  [+ Add Node]  |  [Run MC]
```

**Right Panel — Three Sections:**

*Section 1: Node Detail (when node selected)*
```
NODE: AI Compute Cost Decline
Type: MACRO FACTOR  ·  SHORT-TERM relevance

Probability
[──────────────●────] 91%

Confidence: ● HIGH

Description:
"GPU pricing continues to fall 30–40% YoY
driven by competitive dynamics between
TSMC and Samsung at 3nm–2nm nodes."

Evidence Links:
→ SemiAnalysis Report Q3 2024
→ NVIDIA pricing trends

Impact on Thesis: +12.4 pts
Sensitivity Rank: #2 of 8
```

*Section 2: Thesis Strength Score (always visible)*
```
THESIS STRENGTH

      ╭────────────────╮
    ╱                    ╲
   │       72.4           │   ← JetBrains Mono, 48px, glowing
    ╲                    ╱    in score color (amber at 72)
      ╰────────────────╯
      STABILITY RING ← animated ring around score

▓▓▓▓▓▓▓▓▓░  72.4/100
Moderate — 2 risk clusters detected
```

*Section 3: Monte Carlo Distribution*
```
MC SIMULATION (500 iterations)
─────────────────────────────
        █
      █ █ █
    █ █ █ █ █
  █ █ █ █ █ █ █
──────────────────
58        72   91

P10: 58  |  P50: 72  |  P90: 91
```
→ Recharts AreaChart with gradient fill in brand blue

---

### PAGE 4 — Add / Edit Node Modal

Triggered by "+ Add Node" or clicking a node's edit button.

```
┌─────────────────────────────────────────────────┐
│  Add Assumption                             ✕   │
│                                                 │
│  Title *                                        │
│  ┌───────────────────────────────────────────┐ │
│  │ e.g. "AI compute cost declines 40% YoY"  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Node Type *                                    │
│  [◉ Macro] [○ Sector] [○ Company]              │
│  [○ Risk]  [○ Catalyst] [○ Structural]         │
│                                                 │
│  Probability: 70%                               │
│  [───────────────────●────────────] 0 ── 100   │
│                                                 │
│  Confidence Level                               │
│  [○ Low]  [◉ Medium]  [○ High]                 │
│                                                 │
│  Time Relevance                                 │
│  [○ Short < 6mo]  [◉ Medium 6m–2y]  [○ Long]  │
│                                                 │
│  Description (optional)                         │
│  ┌───────────────────────────────────────────┐ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Evidence Links                                 │
│  ┌──────────────────────────────────┐ [+ Add] │ │
│  │ https://...                      │         │ │
│  └──────────────────────────────────┘         │ │
│                                                 │
│  [Cancel]                    [Add Assumption]  │
└─────────────────────────────────────────────────┘
```

---

### PAGE 5 — Scenario Comparison (`/thesis/[id]/compare`)

**Layout:**

```
HEADER: "Scenario Comparison"
  ← Back to thesis  |  [Export Report]

SCENARIO SELECTOR ROW:
  [Baseline ▼]  vs  [Bear Case ▼]

SPLIT VIEW:
┌───────────────────────┬───────────────────────┐
│  BASELINE             │  BEAR CASE            │
│  Score: 72.4          │  Score: 41.2          │
│                       │                       │
│  [Constellation A]    │  [Constellation B]    │
│  (non-interactive,    │  (same view angle,    │
│   auto-rotated)       │   same layout)        │
└───────────────────────┴───────────────────────┘

DELTA HEATMAP:
A table showing each node, its probability in both scenarios, and the delta:

Node                  | Baseline | Bear | Delta
──────────────────────|──────────|──────|──────
AI Compute Decline    |   91%    |  91% |  ±0
Regulation            |   45%    |  22% |  -23 ↓ (red)
Hyperscaler Demand    |   78%    |  40% |  -38 ↓ (red)
Developer Adoption    |   88%    |  88% |  ±0

NARRATIVE SUMMARY (AI-generated for Pro users):
"The Bear Case thesis is primarily driven by a significant shift in
Regulation probability (45% → 22%) which propagates through
Hyperscaler Demand, reducing overall thesis strength by 31.2 points."
```

---

### PAGE 6 — Scenario Report (`/thesis/[id]/report`)

A cleanly formatted, printable/shareable view:

```
THESISLAB REPORT
─────────────────────────────────────────
THESIS: AI Infrastructure Bull Case
Generated: Jan 15, 2025  |  Time Horizon: 5Y

THESIS STATEMENT
"AI infrastructure spend will continue to accelerate driven by
enterprise adoption, decreasing compute costs, and favorable
regulatory conditions through 2029."

STRENGTH SCORE: 72.4 / 100  [MODERATE]

────────────────────────────────────────
ASSUMPTION BREAKDOWN (8 assumptions)

#  Assumption              Type      P(%)  Confidence
1  AI Compute Cost Decline  Macro    91    HIGH
2  Enterprise AI Adoption   Sector   84    HIGH
3  Regulatory Stability     Risk     45    LOW     ⚠️
4  Hyperscaler Demand        Company  78    MEDIUM
...

KEY RISK ZONES
→ Regulation (45%, LOW confidence) is the highest-sensitivity risk node.
  A 20-point drop here reduces thesis strength by ~14 points.

PROBABILITY DISTRIBUTION (500 Monte Carlo iterations)
P10: 58  |  P50: 72  |  P90: 91

STRUCTURAL VULNERABILITIES
→ 3 of 8 assumptions have LOW or MEDIUM confidence
→ Risk cluster detected: Regulation → Hyperscaler → Revenue (chain)

────────────────────────────────────────
[Share Link]   [Export PDF]   [Copy]
```

---

### PAGE 7 — Analytics (`/analytics`)

For Pro+ users. Shows cross-thesis patterns.

```
HEADER: "Calibration & Analytics"

TABS: [Calibration] [Bias Index] [Confidence Drift]

TAB: CALIBRATION (Phase 2 — design now, build later)
  "Rate your past assumptions"
  For each saved scenario older than X days:
  ┌────────────────────────────────────────┐
  │ "AI Compute Decline" (from Jan 2024)  │
  │ You predicted: 91%                    │
  │ Did this play out?                    │
  │ [Yes, fully] [Partially] [No] [Skip]  │
  └────────────────────────────────────────┘

TAB: BIAS INDEX
  Overconfidence Score: 71/100
  "You tend to assign HIGH confidence
   to assumptions that underperform."
  Radar chart: Overconfidence / Underconfidence / Recency Bias

TAB: CONFIDENCE DRIFT
  Line chart showing average thesis strength over time
  across all theses.
```

---

## 7. CORE FEATURES — DEEP SPEC

### Feature 1: Constellation Canvas (3D)

**Technology:** React Three Fiber + `@react-three/drei`

**Node rendering:**
```typescript
// Each node is a sphere mesh
// Radius scales with sensitivity score (base: 0.3, max: 0.55)
// Material: MeshStandardMaterial with emissive color matching node type
// Emissive intensity = probability / 100 (so low probability nodes are dim)

const emissiveIntensity = node.probability / 100;
const radius = 0.3 + (node.sensitivityScore / 100) * 0.25;
```

**Edge rendering:**
- Use `Line` from `@react-three/drei`
- Line color matches the source node's type color
- Line opacity = edge weight (0.25 to 1.0)
- Animate using a `dashOffset` shader trick for a "flowing" appearance on active edges

**Interaction:**
- Click a node → `onPointerDown` → dispatch to `graphStore` → right panel updates
- Hover → node scale: 1.0 → 1.15, tooltip appears (use HTML overlay, not 3D text)
- Orbit: `<OrbitControls>` from drei — `enablePan={false}`, `minDistance={3}`, `maxDistance={15}`

**Constellation Core (central orb):**
- Always rendered at position (0, 0, 0)
- Sphere radius: 0.4
- Color interpolates between risk colors based on thesis strength score
- Emissive intensity pulses at 3s interval using `useFrame`
- Surrounded by a `<Torus>` ring that rotates — represents stability

**Sensitivity Mode:**
When active, all nodes except the top 3 most impactful dim to 20% opacity. The top 3 increase in scale and emissive intensity. Edge lines pulse from high-impact nodes outward.

### Feature 2: Propagation Engine

See Section 8 for full math. The UX flow:

1. User drags probability slider on a node (or inline in left panel)
2. `graphStore.updateNodeProbability(nodeId, newValue)` is called
3. This triggers `runPropagation(graph, changedNodeId)` from `lib/simulation/propagation.ts`
4. The engine returns updated probabilities for all affected nodes
5. `graphStore` updates all node probabilities
6. The constellation canvas reacts (emissive intensity changes) — animated via `useFrame` lerping toward target values
7. `scoringEngine.calculate(graph)` computes new thesis strength
8. Right panel score updates with count-up animation

This entire loop should complete and begin animating within **100ms** of the slider move.

### Feature 3: Version History

**When a version is saved:**
- Auto-save: Triggered 2 seconds after any change (debounced)
- Manual: User clicks "Save Version" and optionally adds a note

**Version diff view:**
In left panel, clicking a past version shows a "ghost" of the constellation — nodes that changed are highlighted with before/after probability displayed.

**Data:** The `Version.snapshot` JSON stores the complete node and edge state. Never store deltas — always full snapshots. Storage cost is minimal given the small data size per snapshot.

### Feature 4: Edge Creation (In-Canvas)

To connect two nodes:
1. User holds `Shift` and clicks source node → it glows, cursor changes to crosshair
2. User clicks target node → edge creation modal appears
3. User sets: Strength (Weak/Moderate/Strong/Critical) + Dependency Type
4. Confirms → edge is created and propagation runs immediately

**Touch support:** On mobile, long-press opens a context menu: "Connect from here" / "Edit" / "Delete"

### Feature 5: Thesis Parser (Pro — Phase 2)

User pastes raw thesis text. Claude API extracts:
- Key assumptions as node titles + suggested types
- Probable dependencies between assumptions
- Suggested initial probabilities based on language signals ("confident", "possible", "critical risk")

Returns structured JSON that populates the graph. User reviews before confirming.

**Prompt to Claude API:**
```
You are a structured investment thesis analyzer. Given the following thesis text, extract:
1. 5–12 discrete assumptions (things that must be true for the thesis to work)
2. For each assumption: title (max 8 words), type, initial probability (50–90%), confidence level
3. Dependencies between assumptions (which ones causally link)

Return JSON only. No explanation.
```

---

## 8. SIMULATION ENGINE — MATH & LOGIC

### Core Propagation Algorithm

```typescript
// lib/simulation/propagation.ts

interface GraphNode {
  id: string;
  probability: number;  // 0–100
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface GraphEdge {
  fromNodeId: string;
  toNodeId: string;
  weight: number;       // 0.0 – 1.0
  dependencyType: 'CAUSAL' | 'CORRELATED' | 'CONDITIONAL';
}

/**
 * Propagates the effect of changing one node's probability through the graph.
 * Returns a map of nodeId → new probability for all affected nodes.
 */
export function runPropagation(
  nodes: GraphNode[],
  edges: GraphEdge[],
  changedNodeId: string,
  originalProbability: number,
  newProbability: number
): Map<string, number> {
  const delta = (newProbability - originalProbability) / 100;
  const updates = new Map<string, number>();
  const visited = new Set<string>();
  
  // BFS from changed node
  const queue: Array<{ nodeId: string; propagatedDelta: number }> = [
    { nodeId: changedNodeId, propagatedDelta: delta }
  ];

  while (queue.length > 0) {
    const { nodeId, propagatedDelta } = queue.shift()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    // Find all outgoing edges from this node
    const outgoingEdges = edges.filter(e => e.fromNodeId === nodeId);

    for (const edge of outgoingEdges) {
      const targetNode = nodes.find(n => n.id === edge.toNodeId);
      if (!targetNode) continue;

      // Calculate propagated impact with decay
      const decayFactor = 0.6; // Each hop loses 40% influence
      const effectMultiplier = getEffectMultiplier(edge.dependencyType);
      const propagatedEffect = propagatedDelta * edge.weight * decayFactor * effectMultiplier;

      const currentProb = updates.get(edge.toNodeId) ?? targetNode.probability;
      const newProb = Math.max(0, Math.min(100, currentProb + (propagatedEffect * 100)));
      
      updates.set(edge.toNodeId, newProb);

      // Continue propagating if effect is still meaningful (> 1%)
      if (Math.abs(propagatedEffect) > 0.01) {
        queue.push({
          nodeId: edge.toNodeId,
          propagatedDelta: propagatedEffect
        });
      }
    }
  }

  return updates;
}

function getEffectMultiplier(type: string): number {
  switch (type) {
    case 'CAUSAL': return 1.0;
    case 'CORRELATED': return 0.7;
    case 'CONDITIONAL': return 0.5;
    default: return 0.7;
  }
}
```

### Thesis Strength Scoring

```typescript
// lib/simulation/scoring.ts

const CONFIDENCE_WEIGHT = {
  HIGH: 1.0,
  MEDIUM: 0.8,
  LOW: 0.6,
};

/**
 * Computes overall thesis strength (0–100).
 *
 * Formula:
 * 1. Compute weighted average of all node probabilities
 *    (weight = edge centrality + confidence weight)
 * 2. Apply risk cluster penalty (if >2 risk nodes with P < 50%)
 * 3. Apply confidence volatility penalty
 */
export function calculateThesisStrength(
  nodes: GraphNode[],
  edges: GraphEdge[]
): number {
  if (nodes.length === 0) return 0;

  // Step 1: Compute node centrality (how many edges touch each node)
  const centralityMap = new Map<string, number>();
  for (const node of nodes) {
    const edgeCount = edges.filter(
      e => e.fromNodeId === node.id || e.toNodeId === node.id
    ).length;
    centralityMap.set(node.id, Math.max(1, edgeCount));
  }

  // Step 2: Weighted average
  let totalWeight = 0;
  let weightedSum = 0;

  for (const node of nodes) {
    const centrality = centralityMap.get(node.id) ?? 1;
    const confidenceW = CONFIDENCE_WEIGHT[node.confidence];
    const weight = centrality * confidenceW;

    weightedSum += (node.probability / 100) * weight;
    totalWeight += weight;
  }

  const baseScore = (weightedSum / totalWeight) * 100;

  // Step 3: Risk cluster penalty
  const riskNodes = nodes.filter(
    n => n.nodeType === 'RISK_FACTOR' && n.probability < 50
  );
  const riskPenalty = Math.min(15, riskNodes.length * 5);

  // Step 4: Confidence volatility penalty (many LOW confidence nodes)
  const lowConfidenceCount = nodes.filter(n => n.confidence === 'LOW').length;
  const volatilityPenalty = Math.min(10, (lowConfidenceCount / nodes.length) * 20);

  const finalScore = Math.max(0, Math.min(100, 
    baseScore - riskPenalty - volatilityPenalty
  ));

  return Math.round(finalScore * 10) / 10; // round to 1 decimal
}
```

### Sensitivity Analysis

```typescript
// lib/simulation/sensitivity.ts

/**
 * For each node, measure its impact on thesis strength by
 * running a "what if P = 0?" simulation and measuring score delta.
 * Returns nodes sorted by impact, highest first.
 */
export function runSensitivityAnalysis(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Array<{ nodeId: string; impactScore: number; impactPercent: number }> {
  const baseScore = calculateThesisStrength(nodes, edges);
  const results = [];

  for (const node of nodes) {
    // Simulate node failing (probability → 0)
    const modifiedNodes = nodes.map(n =>
      n.id === node.id ? { ...n, probability: 0 } : n
    );
    
    // Also propagate this failure
    const propagated = runPropagation(nodes, edges, node.id, node.probability, 0);
    const fullyModifiedNodes = modifiedNodes.map(n => ({
      ...n,
      probability: propagated.get(n.id) ?? n.probability
    }));

    const stressScore = calculateThesisStrength(fullyModifiedNodes, edges);
    const impact = baseScore - stressScore;

    results.push({
      nodeId: node.id,
      impactScore: impact,
      impactPercent: (impact / baseScore) * 100
    });
  }

  return results.sort((a, b) => b.impactScore - a.impactScore);
}
```

### Monte Carlo Simulation

```typescript
// lib/simulation/monteCarlo.ts

/**
 * Runs N Monte Carlo iterations, each time adding Gaussian noise
 * to each node probability based on its confidence level.
 * Returns the distribution of thesis strength scores.
 */
export function runMonteCarlo(
  nodes: GraphNode[],
  edges: GraphEdge[],
  iterations: number = 500
): { scores: number[]; p10: number; p50: number; p90: number } {
  const CONFIDENCE_SIGMA = {
    LOW: 15,     // High variance
    MEDIUM: 8,   // Moderate variance
    HIGH: 3,     // Low variance
  };

  const scores: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const noisyNodes = nodes.map(node => ({
      ...node,
      probability: Math.max(0, Math.min(100,
        node.probability + gaussianNoise(0, CONFIDENCE_SIGMA[node.confidence])
      ))
    }));

    scores.push(calculateThesisStrength(noisyNodes, edges));
  }

  scores.sort((a, b) => a - b);

  return {
    scores,
    p10: scores[Math.floor(iterations * 0.1)],
    p50: scores[Math.floor(iterations * 0.5)],
    p90: scores[Math.floor(iterations * 0.9)],
  };
}

function gaussianNoise(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  return mean + stdDev * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
```

---

## 9. COMPONENT LIBRARY

### Zustand Store Structure

```typescript
// store/graphStore.ts
import { create } from 'zustand';

interface GraphStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  
  // Actions
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectNode: (nodeId: string | null) => void;
  updateNodeProbability: (nodeId: string, probability: number) => void;
  addNode: (node: Omit<Node, 'id'>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Omit<Edge, 'id'>) => void;
  removeEdge: (edgeId: string) => void;
}
```

```typescript
// store/simulationStore.ts
interface SimulationStore {
  thesisStrength: number;
  sensitivityRanking: Array<{ nodeId: string; impactScore: number }>;
  monteCarloResult: { scores: number[]; p10: number; p50: number; p90: number } | null;
  isRunning: boolean;
  
  runPropagation: (changedNodeId: string, newProbability: number) => void;
  runSensitivity: () => void;
  runMonteCarlo: () => Promise<void>;
}
```

```typescript
// store/uiStore.ts
interface UIStore {
  mode: '3D' | '2D';
  isSensitivityMode: boolean;
  activePanel: 'node-detail' | 'strength' | null;
  isAddNodeOpen: boolean;
  
  setMode: (mode: '3D' | '2D') => void;
  toggleSensitivityMode: () => void;
  openAddNode: () => void;
  closeAddNode: () => void;
}
```

### Key UI Components

**ProbabilitySlider:**
```tsx
// Radix UI Slider under the hood, custom styled
// Shows live percentage as you drag
// Color changes: green (>70), amber (40–70), red (<40)
<ProbabilitySlider
  value={node.probability}
  onChange={(val) => store.updateNodeProbability(node.id, val)}
  disabled={!canEdit}
/>
```

**StrengthGauge:**
```tsx
// Circular gauge using SVG arc
// Score displayed in JetBrains Mono
// Color interpolates based on score:
//   0–39: --score-weak (red)
//   40–69: --score-moderate (amber)
//   70–100: --score-strong (emerald)
// Pulsing ring animation when score changes
<StrengthGauge score={72.4} previousScore={68.1} />
```

**NodeBadge:**
```tsx
// Small colored badge showing node type
// e.g. "MACRO" in blue, "RISK" in red
<NodeBadge type="RISK_FACTOR" />
```

**ConfidenceIndicator:**
```tsx
// Three dots, filled based on confidence
// LOW: ●○○  MEDIUM: ●●○  HIGH: ●●●
<ConfidenceIndicator level="MEDIUM" />
```

---

## 10. BUILD SPRINTS (5 WEEKS)

### Week 1: Foundation + Data Layer
**Goal:** Working app shell with auth, DB, and basic thesis CRUD.

- [ ] Next.js project setup with TypeScript + Tailwind
- [ ] Create Supabase project at supabase.com → copy URL + anon key to `.env.local`
- [ ] Run SQL schema in Supabase SQL Editor (all tables + enums)
- [ ] Run RLS policies in Supabase SQL Editor immediately after
- [ ] Install `@supabase/supabase-js @supabase/ssr` — set up `lib/supabase/client.ts` + `lib/supabase/server.ts`
- [ ] Set up `middleware.ts` for session refresh + route protection
- [ ] Enable auth providers in Supabase Dashboard: Email/Password + Google OAuth
- [ ] Set up `app/auth/callback/route.ts` for OAuth redirect handling
- [ ] Generate TypeScript types: `supabase gen types typescript --linked > types/supabase.ts`
- [ ] Design system: `globals.css` with all CSS variables, Syne + JetBrains Mono fonts
- [ ] Layout components: Navbar, Sidebar, root layout
- [ ] Login / Signup pages using Supabase Auth
- [ ] Dashboard page: ThesisCard, ThesisGrid (no canvas yet — placeholder)
- [ ] Thesis CRUD API routes using Supabase server client
- [ ] New Thesis modal (React Hook Form + Zod)

**Deliverable:** Can sign up, log in (email + Google), create/list/delete theses. RLS confirmed — opening a thesis URL while logged out shows 401. Design tokens applied.

---

### Week 2: Canvas + 3D Constellation
**Goal:** The wow factor lives. Nodes and edges render in 3D.

- [ ] Install R3F + drei
- [ ] `ConstellationCanvas.tsx` — base scene, lighting, background
- [ ] `ParticleField.tsx` — subtle background stars
- [ ] `NodeMesh.tsx` — sphere with type color, emissive based on probability
- [ ] `EdgeLine.tsx` — line between nodes, weight as opacity
- [ ] `ConstellationCore.tsx` — central thesis orb
- [ ] `CameraController.tsx` — orbit controls configured
- [ ] 2D fallback: `GraphCanvas2D.tsx` using React Flow
- [ ] Mode toggle: 2D ↔ 3D
- [ ] Node selection: click → selectedNodeId updates

**Deliverable:** Thesis opens to a real 3D graph. Clicking nodes works.

---

### Week 3: Simulation Engine + Left/Right Panels
**Goal:** The product actually does something smart.

- [ ] `lib/simulation/propagation.ts` — core BFS propagation
- [ ] `lib/simulation/scoring.ts` — thesis strength calculation
- [ ] Zustand stores: graphStore + simulationStore
- [ ] Left Panel: AssumptionList with inline probability sliders
- [ ] Slider → propagation → canvas animation loop
- [ ] Right Panel: NodeDetail, StrengthScore (with animated gauge)
- [ ] `lib/simulation/sensitivity.ts` — sensitivity analysis
- [ ] Sensitivity Mode UI in canvas + right panel

**Deliverable:** Change a slider → ripple animates → score updates. Sensitivity mode highlights the critical node.

---

### Week 4: Scenarios + MC + Version History
**Goal:** The product is sticky now.

- [ ] Monte Carlo runner (`lib/simulation/monteCarlo.ts`)
- [ ] MC distribution chart (Recharts AreaChart) in right panel
- [ ] Scenario save/load (Scenario model)
- [ ] Scenario comparison page (split view)
- [ ] Delta heatmap table
- [ ] Version auto-save (debounced, 2s)
- [ ] Version history in left panel
- [ ] Version diff visualization
- [ ] Shareable link generation (shareToken)

**Deliverable:** Can save scenarios, compare them, see history, share a link.

---

### Week 5: Polish + Landing Page + Stripe
**Goal:** Ship-ready. Looks elite.

- [ ] Landing page — hero, mini-constellation demo, features, pricing
- [ ] Pricing page + Stripe integration
- [ ] Plan gating (Free: 1 thesis, limited nodes; Pro: unlimited)
- [ ] Scenario Report page (formatted, shareable)
- [ ] Animation pass: check every transition, tune easing
- [ ] Mobile responsiveness (2D mode forced on mobile, simplified layout)
- [ ] Error states, loading skeletons for all async content
- [ ] Empty states (dashboard, new thesis)
- [ ] Performance audit: constellation with 10+ nodes must stay 60fps

**Deliverable:** Ready to post on X/Twitter. Demo-able. Chargeable.

---

## 11. AI PROMPTS FOR CODE EDITOR

Use these as starting prompts in Cursor/Windsurf/Claude Code. Always include relevant context from this doc.

---

**Prompt: Create the Constellation Canvas**
```
Build a React Three Fiber component called ConstellationCanvas.tsx for a product 
called ThesisLab. Design system: dark background #05060A, node colors based on 
type (MACRO: #4B7BFF, RISK: #F43F5E, CATALYST: #F59E0B, SECTOR: #A855F7, 
COMPANY: #22D3EE, STRUCTURAL: #10B981). 

Each node is a sphere mesh. Radius = 0.3 + (sensitivityScore/100 * 0.25). 
Emissive intensity = probability/100. Clicking a node calls onNodeSelect(nodeId).

Edges are thin lines with opacity = edge.weight (0.25–1.0). Include OrbitControls 
(no panning, minDistance: 3, maxDistance: 15). Include a central thesis orb at 
(0,0,0) that pulses using useFrame. Add subtle background particle field.

Use TypeScript. Accept props: nodes, edges, selectedNodeId, onNodeSelect, 
isSensitivityMode (when true, dim all nodes except top 3 sensitivityRanking nodes).
```

---

**Prompt: Build the Propagation Engine**
```
Build lib/simulation/propagation.ts for ThesisLab — an investment thesis 
modeling tool. Implement BFS graph propagation:

When a node's probability changes by delta%, traverse all outgoing edges and 
update connected node probabilities. Use decay factor 0.6 per hop. Multiply by 
edge.weight (0.0–1.0). Apply effectMultiplier: CAUSAL=1.0, CORRELATED=0.7, 
CONDITIONAL=0.5. Stop propagating if |effect| < 0.01.

Also implement calculateThesisStrength(nodes, edges): weighted average of 
probabilities where weight = edgeCentrality × confidenceWeight 
(HIGH=1.0, MEDIUM=0.8, LOW=0.6). Apply risk penalty (max 15pts) and 
volatility penalty (max 10pts). Return 0–100 to 1 decimal.

Full TypeScript with documented interfaces.
```

---

**Prompt: Build the Left Panel**
```
Build LeftPanel.tsx for ThesisLab. Three sections with accordion-style headers:

1. ASSUMPTIONS — list of nodes. Each row: type icon (colored dot), title, 
   node type label, mini probability bar, confidence dots. Clicking selects node.
   Hovering shows a small probability slider inline. Changing slider value calls 
   store.updateNodeProbability(). Use Zustand graphStore.

2. SCENARIOS — list of saved scenarios. Active scenario highlighted. 
   "+ New Scenario" button saves current state.

3. HISTORY — list of version timestamps. Clicking a version shows diff overlay.

Design: bg #0C0E18, border-right 1px solid #1E2235, width 300px. Font: Syne 
for labels, JetBrains Mono for probability percentages. Scrollable within panel.
Include collapse toggle for each section.
```

---

**Prompt: Build the Monte Carlo Chart**
```
Build MonteCarloChart.tsx using Recharts for ThesisLab. 

Display a probability distribution of thesis strength scores from a Monte Carlo 
simulation (array of 500 numbers). Use AreaChart with:
- Gradient fill in #4B7BFF (50% → 0% opacity bottom)
- X axis: 0–100 (thesis strength)  
- Y axis: frequency count
- Three vertical reference lines: P10, P50, P90 with labels
- Tooltip showing "Strength: X, Frequency: Y"
- No grid lines, minimal axis ticks
- Dark theme: bg transparent, text #8891B8

Panel header: "MONTE CARLO · 500 iterations"
Below chart: three stat boxes showing P10 / P50 / P90 in JetBrains Mono.
Show a "Run Simulation" button if results are null. Loading spinner while running.
Props: result: { scores: number[], p10, p50, p90 } | null, onRun: () => void, isLoading: boolean
```

---

**Prompt: Build the Thesis Strength Gauge**
```
Build StrengthGauge.tsx — a circular SVG gauge for ThesisLab displaying 
thesis strength score (0–100).

Specs:
- Circular arc progress indicator (270° arc, not full circle)
- Score color: 0–39 = #F43F5E, 40–69 = #F59E0B, 70–100 = #10B981
- Score number centered in JetBrains Mono, 48px, in score color
- Label below: "THESIS STRENGTH" in Syne 400, 10px, #454D6D uppercase
- Animated count-up when score changes (use framer-motion animate)
- Pulsing ring around the gauge SVG using CSS animation
- Descriptive text below score: "Strong", "Moderate", or "Weak · N risks detected"
- Size: 200×200px

Props: score: number, previousScore: number | null
```

---

**Prompt: Build the Landing Page Hero**
```
Build the hero section of ThesisLab's landing page in Next.js/TypeScript.

Design system: bg #05060A, font Syne (from Google Fonts), text primary #F0F2FF, 
secondary #8891B8. Full viewport height. Centered content.

Elements (top to bottom):
1. Small label: "FOR PROBABILISTIC INVESTORS" — Syne 400, 11px, letter-spacing 
   0.2em, uppercase, color #454D6D
2. Headline (2 lines): "Your thesis has hidden / fault lines." — Syne 800, 72px, 
   #F0F2FF, line-height 1.1, max-width 700px
3. Sub-copy: "ThesisLab maps the structure of your belief. Find which assumption 
   matters most." — Syne 400, 20px, #8891B8, margin-top 24px
4. CTA row (margin-top 40px):
   - Primary button: "Build Your First Thesis →" — bg #4B7BFF, Syne 600, padding 
     16px 32px, rounded-lg, hover: brightness(1.15), transition 200ms
   - Ghost button: "See a Live Demo" — border 1px #1E2235, same size, hover: bg #131628
5. Mini constellation canvas below (400px tall) — import and render 
   ConstellationCanvas with demo data (5 hardcoded nodes, 4 edges). Auto-rotating. 
   No interaction. Mask bottom with gradient fade to bg.

Animate elements in with framer-motion staggered reveal on mount.
```

---

**Prompt: Build Supabase Auth Flow**
```
Build the auth flow for ThesisLab using @supabase/ssr and Next.js App Router.

Files needed:
1. app/(auth)/login/page.tsx — email/password + Google OAuth sign-in form
2. app/(auth)/signup/page.tsx — email/password sign-up
3. app/auth/callback/route.ts — OAuth code exchange handler
4. lib/supabase/client.ts — createBrowserClient singleton
5. lib/supabase/server.ts — createServerClient using next/headers cookies
6. middleware.ts — session refresh on every request, redirect unauthenticated 
   users away from /dashboard and /thesis/* to /login

Design: same dark theme (#05060A background), Syne font, centered card layout 
(bg: #0C0E18, border: 1px solid #1E2235, max-width 400px, border-radius 12px).
Form inputs: dark bg (#131628), border #1E2235, focus: border #4B7BFF + glow.
Primary button: #4B7BFF. Google button: white text, Google icon, border #1E2235.

After sign-in: redirect to /dashboard.
After sign-up: show "Check your email" confirmation state.
```

---

*End of ThesisLab Implementation Guide v1.0*
*Last updated: February 2026*
*Refer to this document when prompting your AI code editor for each feature.*
