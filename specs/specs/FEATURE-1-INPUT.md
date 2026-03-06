# FEATURE-1-INPUT.md — Foundation & Data Pipeline
# Use this as input for /sp.specify in Claude Code

## What to Run:
```
/sp.specify
```

## Then paste this description:

---

Feature: Project Foundation & Data Pipeline

Build the core project infrastructure for SafeMGM: a Next.js 15 app with TypeScript, Tailwind CSS, and shadcn/ui. Install all required dependencies (ai, @ai-sdk/google, @ai-sdk/openai, leaflet, react-leaflet, recharts, papaparse, lucide-react, and their type definitions). Initialize shadcn/ui with card, button, input, scroll-area, tabs, badge, skeleton, separator components.

Create the data ingestion layer that loads Montgomery, Alabama public safety data from CSV and GeoJSON files stored in src/data/. The primary datasets are: 911 Calls (call type, date/time, lat/lng, priority, disposition), Crime Statistics (offense type, date, lat/lng, neighborhood, status), and Crime Mapping (GeoJSON with incident types and coordinates). These files are pre-downloaded from https://opendata.montgomeryal.gov.

Build a data processing library (src/lib/montgomery-data.ts) with functions to: load and parse each CSV/GeoJSON file with TypeScript types, filter data by neighborhood/date range/incident type, aggregate statistics (top crime types, hourly distribution, monthly trends), convert data to GeoJSON for map rendering, and build an AI context string (filtered and formatted data under 50K characters for feeding into Gemini's context window).

Create TypeScript type definitions (src/types/index.ts) for: EmergencyCall, CrimeIncident, NewsArticle, MapPoint, TrendDataPoint, SafetyAnalysis, and DashboardFilters.

Create a basic data API route at /api/data that accepts query parameters (dataset, neighborhood, limit) and returns filtered Montgomery data as JSON.

Set up .env.example with placeholders for GOOGLE_GEMINI_API_KEY, OPENAI_API_KEY, BRIGHT_DATA_API_TOKEN, BRIGHT_DATA_SERP_ZONE. Ensure .env.local is gitignored.

User scenarios:
1. Developer clones repo, runs npm install, npm run dev — app starts without errors
2. GET /api/data?dataset=911 returns 911 call data as JSON array with typed fields
3. GET /api/data?dataset=crime&neighborhood=downtown returns filtered crime data
4. Data processing functions return correct aggregations (top crime types, hourly patterns)
5. All TypeScript types compile with strict mode enabled

Acceptance criteria:
- npm run dev starts the app on localhost:3000 without errors
- All dependencies installed and importable
- At least 2 Montgomery data files loaded from src/data/
- /api/data endpoint returns real data with correct types
- buildAIContext() returns a formatted string under 50K characters
- No TypeScript errors in strict mode
- .env.example committed, .env.local gitignored

NOTE: If Montgomery portal data files are unavailable, create realistic sample data with matching schema (200+ rows minimum). Document this decision.

---
