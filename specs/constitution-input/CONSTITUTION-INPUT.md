# CONSTITUTION-INPUT.md
# Copy-paste the text below into Claude Code when running /sp.constitution

## What to Run:
```
/sp.constitution
```

## Then paste this as your input:

---

Project: SafeMGM — AI-Powered Public Safety Intelligence Platform for Montgomery, Alabama.
This is a 48-hour solo hackathon project for the World Wide Vibes Hackathon (GenAI.Works Academy).
Target: $5,000 grand prize. Challenge track: Public Safety, Emergency Response & City Analytics.

## Immutable Principles

### Tech Stack (Non-Negotiable)
- Next.js 15 with App Router and TypeScript strict mode
- Tailwind CSS with shadcn/ui for all UI components
- Leaflet + react-leaflet for maps (NO SSR — always use dynamic import with ssr: false)
- Google Gemini 2.5 Flash via @ai-sdk/google as primary AI model
- Vercel AI SDK (`ai` package) for all streaming responses using streamText and useChat
- Bright Data SERP API for real-time news scraping (MANDATORY — worth 3 bonus points)
- Recharts for all data visualizations
- papaparse for CSV parsing
- Deployment on Vercel with maxDuration: 60 for AI routes

### Code Quality Standards
- TypeScript strict mode everywhere, no `any` types, no `as any` casts
- All API routes wrapped in try/catch with graceful error responses
- Every client component must handle three states: loading (skeleton), error (friendly message), and empty (clear messaging)
- Use absolute imports: @/components/, @/lib/, @/types/
- Server Components by default; "use client" only for interactive elements (map, chat, charts)
- CSS variables for all theme colors — no hardcoded hex values in components
- All environment variables accessed via process.env, never exposed to client

### Architecture Constraints
- Single-page dashboard application — no routing needed beyond the main page
- All AI responses must stream — never return a full response all at once
- Montgomery city data loaded from local CSV/GeoJSON files in src/data/ (pre-downloaded)
- Bright Data integration must be visible in the UI (dedicated News Panel with "Powered by Bright Data" badge)
- Bright Data fetch failures must never break the app — always gracefully degrade
- Map must center on Montgomery, AL (32.3668, -86.2999) with dark-themed tiles

### Design Standards
- Dark theme mandatory — "Command Center Noir" aesthetic
- Color palette: bg #0a0a0f, cards #12121a, accent teal #00d4aa, warning #ff6b35, danger #ef4444
- Typography: JetBrains Mono for stats/numbers, Plus Jakarta Sans for body text (Google Fonts)
- All animations CSS-only, staggered on page load, subtle not distracting
- Mobile-responsive: three-column grid on desktop, stacked on mobile

### Hackathon-Specific Rules
- Every feature must serve the demo — if it doesn't demo well, skip it
- No user authentication, no database, no complex state management
- Build for the judges: Montgomery city officials and a Bright Data DevRel engineer
- README must sell the project (problem, solution, data sources, commercialization)
- Git commit after each completed feature with descriptive messages

### Error Handling & Resilience
- Gemini API rate limits: Show friendly retry message, never crash
- Bright Data unavailable: News panel shows "temporarily unavailable", chat continues without news
- Missing data files: App must still boot with sample/fallback data
- Network offline: Top banner notification, cached data still works

---
