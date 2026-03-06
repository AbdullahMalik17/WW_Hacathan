# SafeMGM Constitution
<!-- AI-Powered Public Safety Intelligence Platform for Montgomery, Alabama -->

## Core Principles

### I. Tech Stack (Non-Negotiable)
- **Framework:** Next.js 15 with App Router and TypeScript strict mode
- **Styling:** Tailwind CSS with shadcn/ui for all UI components
- **Map:** Leaflet + react-leaflet (NO SSR — always use dynamic import with `ssr: false`)
- **AI Primary:** Google Gemini 2.5 Flash via `@ai-sdk/google`
- **AI Streaming:** Vercel AI SDK (`ai` package) — all streaming responses use `streamText` and `useChat`
- **Web Scraping:** Bright Data SERP API (MANDATORY — worth 3 bonus points)
- **Charts:** Recharts for all data visualizations
- **CSV Parsing:** papaparse
- **Deployment:** Vercel with `maxDuration: 60` for AI routes

### II. Code Quality Standards
- TypeScript strict mode everywhere — no `any` types, no `as any` casts
- All API routes wrapped in try/catch with graceful error responses
- Every client component must handle three states: loading (skeleton), error (friendly message), empty (clear messaging)
- Use absolute imports: `@/components/`, `@/lib/`, `@/types/`
- Server Components by default; `"use client"` only for interactive elements (map, chat, charts)
- CSS variables for all theme colors — no hardcoded hex values in components
- All environment variables accessed via `process.env`, never exposed to client

### III. Architecture Constraints
- Single-page dashboard application — no routing beyond the main page
- All AI responses must stream — never return a full response all at once
- Montgomery city data loaded from local CSV/GeoJSON files in `src/data/` (pre-downloaded)
- Bright Data integration must be visible in the UI (dedicated News Panel with "Powered by Bright Data" badge)
- Bright Data fetch failures must never break the app — always gracefully degrade
- Map must center on Montgomery, AL (32.3668, -86.2999) with dark-themed tiles

### IV. Design Standards — "Command Center Noir"
- **Dark theme mandatory** — Bloomberg Terminal meets urban safety ops center aesthetic
- **Color palette (CSS variables):**
  - `--bg-primary: #0a0a0f` (near-black)
  - `--bg-secondary: #12121a` (cards)
  - `--bg-tertiary: #1a1a2e` (hover)
  - `--accent-primary: #00d4aa` (teal — safety)
  - `--accent-warning: #ff6b35` (orange alerts)
  - `--accent-danger: #ef4444` (red critical)
  - `--text-primary: #e4e4e7`
  - `--text-secondary: #71717a`
  - `--border: #27272a`
- **Typography:** JetBrains Mono for stats/numbers, Plus Jakarta Sans for body text (Google Fonts)
- **Animations:** CSS-only, staggered on page load, subtle not distracting
- **Responsive:** Three-column grid on desktop (`lg` breakpoint), single column stacked on mobile

### V. Hackathon-Specific Rules
- Every feature must serve the demo — if it doesn't demo well, skip it
- No user authentication, no database, no complex state management
- Build for the judges: Montgomery city officials and Bright Data DevRel engineer Rafael Levi
- README must sell the project (problem, solution, data sources, commercialization)
- Git commit after each completed feature with descriptive messages
- **Demo target:** 4-minute scripted flow showing AI chat + Bright Data news + map + stats

### VI. Error Handling & Resilience
- **Gemini API rate limits:** Show friendly retry message, never crash
- **Bright Data unavailable:** News panel shows "temporarily unavailable", chat continues without news context
- **Missing data files:** App must still boot with sample/fallback data (200+ row minimum)
- **Network offline:** Top banner notification, cached data still works
- **Pattern:** Every component follows `if (loading) return Skeleton; if (error) return ErrorState; if (empty) return EmptyState; return Content`

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

## Scoring Strategy

| Criterion | Max | Target | How |
|-----------|-----|--------|-----|
| Relevance | 10 | 9 | Public Safety track, 3+ Montgomery datasets |
| Quality/Design | 10 | 9 | Dark dashboard, streaming chat, interactive map |
| Originality | 5 | 4 | AI safety analysis + live Bright Data news enrichment |
| Social Value | 5 | 5 | Democratizes public safety data access |
| Commercialization | 5 | 4 | City-agnostic SaaS — 3,000+ US cities with open data |
| Bright Data Bonus | 3 | 3 | Visible attribution, real SERP API integration |
| **TOTAL** | **38** | **34** | |

## Development Workflow

```
/sp.constitution → /sp.specify → /sp.clarify → /sp.plan → /sp.tasks → /sp.implement → validate → commit
```

### Feature Sequence (execute in order)
| # | Feature | Short Name | Hours |
|---|---------|------------|-------|
| 1 | Project Foundation & Data Pipeline | `foundation-data` | 0–4 |
| 2 | AI Engine & Bright Data Integration | `ai-engine` | 4–10 |
| 3 | Dashboard Frontend | `dashboard-ui` | 16–30 |
| 4 | Polish, Deploy & Demo | `polish-deploy` | 30–44 |

## Environment Variables
```env
GOOGLE_GEMINI_API_KEY=     # From aistudio.google.com
OPENAI_API_KEY=            # Fallback — from platform.openai.com
BRIGHT_DATA_API_TOKEN=     # From brightdata.com/cp/start
BRIGHT_DATA_SERP_ZONE=     # SERP zone name
```

## Governance

- This constitution supersedes all other practices for the SafeMGM project
- No amendments without documenting the decision and tradeoffs
- All generated code must comply with Section I (Tech Stack) — no alternative libraries
- Compliance verified at each feature commit checkpoint
- Bright Data integration and attribution are mandatory and non-negotiable

**Version**: 1.0.0 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
