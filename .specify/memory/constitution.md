<!--
=== SYNC IMPACT REPORT ===
Version change: 1.0.0 → 1.0.1 (patch update)
Modified principles: 
  - Section I (Tech Stack): Clarified Gemini model to include 1.5/2.0 Flash versions for SDK compatibility.
Added sections: None
Removed sections: None
Templates reviewed:
  ✅ .specify/templates/plan-template.md — Synced.
  ✅ .specify/templates/tasks-template.md — Synced.
  ✅ .specify/templates/spec-template.md — Synced.
  ✅ .specify/templates/adr-template.md — Synced.
  ✅ .specify/templates/phr-template.prompt.md — Synced.
Deferred TODOs: none
===========================
-->

# SafeMGM Constitution

<!-- AI-Powered Public Safety Intelligence Platform for Montgomery, Alabama -->

## Core Principles

### I. Tech Stack (Non-Negotiable)

All code MUST use only the approved stack below. No alternative libraries are permitted without a documented ADR and user consent.

- **Framework:** Next.js 15 with App Router and TypeScript strict mode
- **Styling:** Tailwind CSS with shadcn/ui for all UI components
- **Map:** Leaflet + react-leaflet — MUST always be dynamically imported with `ssr: false`
- **AI Primary:** Google Gemini 1.5 Flash or 2.0 Flash via `@ai-sdk/google` (prefer `gemini-1.5-flash` for stability or `gemini-2.0-flash-exp` for latest features)
- **AI Streaming:** Vercel AI SDK (`ai` package) — all streaming responses MUST use `streamText` and `useChat`
- **Web Scraping:** Bright Data SERP API — MANDATORY integration (worth 3 bonus points)
- **Charts:** Recharts for all data visualizations
- **CSV Parsing:** papaparse
- **Deployment:** Vercel with `maxDuration: 60` configured for all AI routes

### II. Code Quality Standards

All generated code MUST comply with the following standards without exception:

- TypeScript strict mode everywhere — `any` types and `as any` casts are PROHIBITED
- All API routes MUST be wrapped in try/catch with graceful, user-friendly error responses
- Every client component MUST handle three states: loading (skeleton), error (friendly message), empty (clear messaging)
- Absolute imports MUST be used: `@/components/`, `@/lib/`, `@/types/`
- Server Components are the default; `"use client"` MUST only be used for interactive elements (map, chat, charts)
- CSS variables MUST be used for all theme colors — hardcoded hex values in components are PROHIBITED
- Environment variables MUST be accessed via `process.env` and MUST NEVER be exposed to the client

### III. Architecture Constraints

The following constraints are non-negotiable for the hackathon scope:

- Application MUST be a single-page dashboard — no routing beyond the main page
- All AI responses MUST stream — full-response (non-streaming) returns are PROHIBITED
- Montgomery city data MUST be loaded from local CSV/GeoJSON files in `src/data/`
- Bright Data integration MUST be visible in the UI via a dedicated News Panel with a "Powered by Bright Data" badge
- Bright Data fetch failures MUST NEVER break the application — graceful degradation is required
- Map MUST center on Montgomery, AL (32.3668, -86.2999) with dark-themed CartoDB tiles

### IV. Design Standards — "Command Center Noir"

The visual identity is mandatory and MUST NOT be overridden:

- Dark theme REQUIRED — aesthetic: Bloomberg Terminal meets urban safety ops center
- **Color palette — defined as CSS variables (no hardcoded hex in components):**
  - `--bg-primary: #0a0a0f` (near-black background)
  - `--bg-secondary: #12121a` (card backgrounds)
  - `--bg-tertiary: #1a1a2e` (hover states)
  - `--accent-primary: #00d4aa` (teal — primary safety accent)
  - `--accent-warning: #ff6b35` (orange — alert level)
  - `--accent-danger: #ef4444` (red — critical level)
  - `--text-primary: #e4e4e7`
  - `--text-secondary: #71717a`
  - `--border: #27272a`
- **Typography:** JetBrains Mono for stats/numbers; Plus Jakarta Sans for body text (both via Google Fonts)
- **Animations:** CSS-only; staggered on page load; MUST be subtle — not distracting
- **Responsive layout:** Three-column grid on desktop (`lg` breakpoint); single column stacked on mobile

### V. Hackathon-Specific Rules

Rules that govern prioritization and scope for the 48-hour timeline:

- Every feature MUST serve the demo — features that don't demo well SHOULD be dropped
- No user authentication, no database, no complex state management — PROHIBITED for scope
- Primary audience: Montgomery city officials and Bright Data DevRel engineer Rafael Levi
- README MUST cover: problem statement, solution, data sources, tech stack, commercialization path, Bright Data attribution
- Git commit MUST be made after each completed feature with a descriptive message
- **Demo target:** 4-minute scripted flow — AI chat + Bright Data news + map + stats

### VI. Error Handling & Resilience

Every component MUST be resilient for live demo conditions:

- **Gemini API rate limits:** MUST show a friendly retry message — crashing is PROHIBITED
- **Bright Data unavailable:** News panel MUST show "temporarily unavailable" — chat MUST continue working without news context
- **Missing data files:** App MUST boot using sample/fallback data (200+ row minimum) — blank states are PROHIBITED
- **Network offline:** MUST show a top banner notification; cached/fallback data MUST still render
- **Universal component pattern:** Every component MUST follow:
  ```
  if (loading) return <Skeleton />;
  if (error)   return <ErrorState />;
  if (empty)   return <EmptyState />;
  return <Content />;
  ```

---

## Project Identity

| Field | Value |
|-------|-------|
| **Project** | SafeMGM |
| **Hackathon** | World Wide Vibes Hackathon (GenAI.Works Academy) |
| **Prize Target** | $5,000 Grand Prize |
| **Track** | Public Safety, Emergency Response & City Analytics |
| **Developer** | Abdullah Malik (@AbdullahMalik17) |
| **Repo** | https://github.com/AbdullahMalik17/WW_Hacathan |
| **Timeline** | 48 hours, solo developer |

---

## Scoring Strategy

| Criterion | Max | Target | How |
|-----------|-----|--------|-----|
| Relevance | 10 | 9 | Public Safety track, 3+ Montgomery datasets, challenge-aligned features |
| Quality/Design | 10 | 9 | Dark dashboard, streaming chat, interactive map, polished UI |
| Originality | 5 | 4 | AI safety analysis + live Bright Data news enrichment |
| Social Value | 5 | 5 | Democratizes public safety data access for residents |
| Commercialization | 5 | 4 | City-agnostic SaaS — 3,000+ US cities with open data portals |
| Bright Data Bonus | 3 | 3 | Visible attribution, real SERP API integration, judge Rafael Levi |
| **TOTAL** | **38** | **34** | |

---

## Development Workflow

```
/sp.constitution → /sp.specify → /sp.clarify → /sp.plan → /sp.tasks → /sp.implement → validate → commit
```

### Feature Sequence (execute in order)

| # | Feature | Short Name | Estimated Hours |
|---|---------|------------|-----------------|
| 1 | Project Foundation & Data Pipeline | `001-foundation-data` | 0–4 |
| 2 | AI Engine & Bright Data Integration | `002-ai-engine` | 4–10 |
| 3 | Dashboard Frontend | `003-dashboard-ui` | 16–30 |
| 4 | Polish, Deploy & Demo | `004-polish-deploy` | 30–44 |

---

## Environment Variables

```env
GOOGLE_GEMINI_API_KEY=     # From aistudio.google.com
OPENAI_API_KEY=            # Fallback — from platform.openai.com
BRIGHT_DATA_API_TOKEN=     # From brightdata.com/cp/start
BRIGHT_DATA_SERP_ZONE=     # SERP zone name from Bright Data dashboard
```

All variables MUST be in `.env.local` (gitignored). `.env.example` with placeholder values MUST be committed.

---

## Governance

- This constitution MUST supersede all other practices for the SafeMGM project
- Amendments MUST be documented with decision and tradeoffs before being applied
- All generated code MUST comply with Section I (Tech Stack) — no alternative libraries without ADR + consent
- Compliance MUST be verified at each feature commit checkpoint
- Bright Data integration and attribution are MANDATORY and non-negotiable
- **Versioning policy:**
  - MAJOR: Backward-incompatible governance or principle removals/redefinitions
  - MINOR: New principle or section added, or materially expanded guidance
  - PATCH: Clarifications, wording, typo fixes
- **Amendment procedure:** Edit this file → increment version → update `Last Amended` date → document change in Sync Impact Report → commit

**Version**: 1.0.1 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
