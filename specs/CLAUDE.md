# CLAUDE.md — SafeMGM Project Intelligence

## Project Identity
**SafeMGM** — AI-Powered Public Safety Intelligence Platform for Montgomery, Alabama
**Hackathon:** World Wide Vibes Hackathon (GenAI.Works Academy)
**Prize Target:** $5,000 Grand Prize
**Developer:** Abdullah Malik (@AbdullahMalik17)
**Repo:** https://github.com/AbdullahMalik17/WW_Hacathan
**Timeline:** 48 hours, solo developer

## Mission
Turn Montgomery's raw 911 and crime data into an AI-powered safety intelligence platform that any resident can query in plain English, enriched with real-time news via Bright Data.

---

## Development Methodology: SpecifyPlus SDD

This project uses **Panaversity's SpecifyPlus** (Spec-Driven Development) with Claude Code as the AI orchestrator. Every feature follows the strict SDD workflow:

```
/sp.constitution → /sp.specify → /sp.clarify → /sp.plan → /sp.tasks → /sp.implement
```

### Feature Breakdown (4 Features, Execute in Order)

| # | Feature Name | Short Name | What It Builds |
|---|-------------|------------|----------------|
| 1 | Project Foundation & Data Pipeline | `foundation-data` | Next.js setup, Montgomery data ingestion, types, base API |
| 2 | AI Engine & Bright Data Integration | `ai-engine` | Gemini streaming chat, Bright Data news scraping, API routes |
| 3 | Dashboard Frontend | `dashboard-ui` | Map, chat panel, news panel, stats cards, trend chart |
| 4 | Polish, Deploy & Demo | `polish-deploy` | Animations, error states, Vercel deploy, README, demo script |

### Workflow Per Feature
```bash
# In Claude Code, for each feature:
/sp.specify [description from specs/FEATURE-X-INPUT.md]
# → Review generated spec in specs/<feature>/spec.md
/sp.clarify
# → Refine any ambiguities
/sp.plan
# → Review implementation plan in specs/<feature>/plan.md
/sp.tasks
# → Review task breakdown in specs/<feature>/tasks.md
/sp.implement
# → Claude Code executes tasks one by one
# → Human validates at checkpoints
/sp.git.commit_pr
# → Commit and move to next feature
```

---

## Tech Stack (Locked — Feed This to Constitution)

- **Framework:** Next.js 15 (App Router) with TypeScript strict mode
- **Styling:** Tailwind CSS + shadcn/ui components
- **Map:** Leaflet + react-leaflet (NO Google Maps key needed)
- **AI Primary:** Google Gemini 2.5 Flash via `@ai-sdk/google`
- **AI Streaming:** Vercel AI SDK (`ai` package) with `useChat` hook
- **Web Scraping:** Bright Data SERP API + Web Unlocker (3 bonus points)
- **Charts:** Recharts for data visualization
- **Data Parsing:** papaparse for CSV processing
- **Deployment:** Vercel (frontend + API routes, `maxDuration: 60`)
- **Data Format:** CSV/GeoJSON files in `src/data/` + ArcGIS REST API

## Project Structure (Target)
```
WW_Hacathan/
├── CLAUDE.md                    # This file
├── .specify/                    # SpecifyPlus core (auto-generated)
│   ├── memory/
│   │   └── constitution.md      # Project principles
│   ├── scripts/bash/            # SDD automation scripts
│   └── templates/               # Spec/plan/task templates
├── .claude/
│   └── commands/                # /sp.* slash commands (auto-generated)
├── specs/                       # Feature specs (SDD-managed)
│   ├── 001-foundation-data/
│   ├── 002-ai-engine/
│   ├── 003-dashboard-ui/
│   └── 004-polish-deploy/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       ├── chat/route.ts    # Streaming AI chat
│   │       ├── news/route.ts    # Bright Data news
│   │       └── data/route.ts    # Montgomery data queries
│   ├── components/
│   │   ├── ui/                  # shadcn/ui
│   │   └── dashboard/
│   │       ├── SafetyMap.tsx
│   │       ├── ChatPanel.tsx
│   │       ├── NewsPanel.tsx
│   │       ├── StatsCards.tsx
│   │       └── TrendChart.tsx
│   ├── lib/
│   │   ├── gemini.ts            # Gemini client + system prompt
│   │   ├── brightdata.ts        # Bright Data client
│   │   ├── montgomery-data.ts   # Data loading + processing
│   │   └── utils.ts
│   ├── data/                    # Montgomery CSV/GeoJSON files
│   └── types/index.ts
├── public/
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

## Environment Variables
```env
GOOGLE_GEMINI_API_KEY=           # From aistudio.google.com
OPENAI_API_KEY=                  # Fallback — from platform.openai.com
BRIGHT_DATA_API_TOKEN=           # From brightdata.com/cp/start
BRIGHT_DATA_SERP_ZONE=           # SERP zone name
```

## Hackathon Scoring Strategy (33 possible + 3 bonus = 36)

| Criterion | Max | Target | How |
|-----------|-----|--------|-----|
| Relevance | 10 | 9 | Public Safety track, 3+ Montgomery datasets, challenge-aligned features |
| Quality/Design | 10 | 9 | Dark dashboard, streaming chat, interactive map, polished UI |
| Originality | 5 | 4 | AI safety analysis + live news enrichment = novel for Montgomery |
| Social Value | 5 | 5 | Public safety = universally valued, democratizes data access |
| Commercialization | 5 | 4 | City-agnostic SaaS, 3000+ US cities with open data portals |
| Bright Data Bonus | 3 | 3 | Visible news panel, clear attribution, real integration |
| **TOTAL** | **38** | **34** | |

## Demo Script (Build Toward This)
1. Open SafeMGM → Dark dashboard loads with Montgomery heatmap
2. "What are the most dangerous areas in Montgomery?" → AI streams analysis
3. "Tell me about safety near downtown" → AI briefing + news sidebar updates
4. Click map hotspot → Stats update, chat context changes
5. Close: "SafeMGM works for Montgomery today. Same architecture → any city."
