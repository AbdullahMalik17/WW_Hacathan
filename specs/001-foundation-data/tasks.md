---
description: "Task list for Feature 1 — Project Foundation & Data Pipeline"
---

# Tasks: Project Foundation & Data Pipeline

**Branch**: `001-foundation-data`
**Input**: `specs/001-foundation-data/plan.md` + `specs/001-foundation-data/spec.md`
**Prerequisites**: plan.md ✅ | spec.md ✅
**Tests**: Not requested — no test tasks generated

---

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[US#]**: Maps to user story in spec.md
- No story label = Setup or Foundational phase

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize the Next.js 15 project and install all dependencies. Nothing else can start until this is done.

- [x] T001 Initialize Next.js 15 project at repo root with TypeScript, Tailwind CSS, App Router, and `src/` directory using `npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-git --yes`
- [x] T002 [P] Install all feature dependencies: `npm install ai @ai-sdk/google @ai-sdk/openai leaflet react-leaflet recharts papaparse lucide-react`
- [x] T003 [P] Install type definitions: `npm install -D @types/leaflet @types/papaparse`
- [x] T004 [P] Initialize shadcn/ui with default style and slate base: `npx shadcn@latest init -d`; then add components: `npx shadcn@latest add card button input scroll-area tabs badge skeleton separator`
- [x] T005 [P] Configure `tsconfig.json` — verify `"strict": true` and add path aliases: `"@/*": ["./src/*"]`
- [x] T006 [P] Create `.env.example` at repo root with placeholders: `GOOGLE_GEMINI_API_KEY=`, `OPENAI_API_KEY=`, `BRIGHT_DATA_API_TOKEN=`, `BRIGHT_DATA_SERP_ZONE=`
- [x] T007 [P] Verify `.env.local` is listed in `.gitignore`; add it if missing

**Checkpoint**: `npm install` completes with no errors → proceed to Phase 2

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the shared type definitions and data directory that all user story phases depend on. MUST be complete before Phase 3+.

⚠️ **CRITICAL**: No user story work can begin until this phase is complete.

- [x] T008 Create `src/types/index.ts` — define all 7 TypeScript types with strict field definitions:
  - `EmergencyCall`: `{ callType: string; dateTime: string; lat: number; lng: number; priority: string; disposition: string; responseUnit?: string }`
  - `CrimeIncident`: `{ offenseType: string; date: string; lat: number; lng: number; neighborhood: string; status: string; caseId?: string }`
  - `NewsArticle`: `{ title: string; link: string; snippet: string; source: string; date: string }`
  - `MapPoint`: `{ lat: number; lng: number; type: string; severity: 'low' | 'medium' | 'high'; label: string }`
  - `TrendDataPoint`: `{ month: string; calls911: number; crimeIncidents: number }`
  - `SafetyAnalysis`: `{ safetyScore: number; topIncidentTypes: string[]; trendDirection: 'improving' | 'worsening' | 'stable'; recentIncidentCount: number; summary: string; recommendations: string[] }`
  - `DashboardFilters`: `{ neighborhood: string | null; dateRange: { start: string; end: string } | null; incidentType: string | null }`
- [x] T009 [P] Create `src/data/` directory; place or generate `911-calls.csv` (200+ rows) with columns: `callType`, `dateTime`, `lat`, `lng`, `priority`, `disposition`, `responseUnit` — use realistic Montgomery data (neighborhoods: Cloverdale, Midtown, East Montgomery, West Montgomery, Capitol Heights; call types: DISTURBANCE, TRAFFIC STOP, BURGLARY, ASSAULT, WELFARE CHECK, SUSPICIOUS PERSON)
- [x] T010 [P] Create or generate `src/data/crime-stats.csv` (200+ rows) with columns: `offenseType`, `date`, `lat`, `lng`, `neighborhood`, `status`, `caseId` — use consistent Montgomery neighborhoods and realistic offense types (BURGLARY, THEFT, ASSAULT, VANDALISM, ROBBERY)
- [x] T011 [P] Create or generate `src/data/crime-mapping.geojson` as a valid GeoJSON FeatureCollection — each Feature has `geometry.coordinates: [lng, lat]` and `properties: { incidentType, date, description }`
- [x] T012 [P] Create `src/lib/utils.ts` — export `cn()` utility using `clsx` and `tailwind-merge` (standard shadcn/ui utility): `export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }`

**Checkpoint**: All 7 types compile, data files exist in `src/data/` → user story phases can begin

---

## Phase 3: User Story 1 — Project Bootstraps Without Errors (Priority: P1) 🎯 MVP

**Goal**: Developer runs `npm install && npm run dev` and the app loads on localhost:3000 with no errors.

**Independent Test**: `npm run dev` → browser opens localhost:3000 → page loads → zero console errors → zero terminal errors

- [x] T013 [US1] Configure `src/app/globals.css` — import Google Fonts (JetBrains Mono, Plus Jakarta Sans via `@import`), define all CSS variables from constitution: `--bg-primary: #0a0a0f`, `--bg-secondary: #12121a`, `--bg-tertiary: #1a1a2e`, `--accent-primary: #00d4aa`, `--accent-warning: #ff6b35`, `--accent-danger: #ef4444`, `--text-primary: #e4e4e7`, `--text-secondary: #71717a`, `--border: #27272a`; set `body { background-color: var(--bg-primary); color: var(--text-primary); }`
- [x] T014 [US1] Configure `src/app/layout.tsx` — import Plus Jakarta Sans and JetBrains Mono from `next/font/google`; apply font variables to `<html>`; set `metadata.title = "SafeMGM"` and `metadata.description = "AI-Powered Public Safety Intelligence for Montgomery, AL"`
- [x] T015 [US1] Create minimal `src/app/page.tsx` (Server Component — no `"use client"`) — render a `<main>` with text "SafeMGM — Loading..." using `var(--text-primary)` color; no interactive elements
- [x] T016 [US1] Configure `next.config.ts` — no special config needed for F1; ensure `output` is not set to `export` (must be default for API routes)

**Checkpoint**: `npm run dev` starts → localhost:3000 renders "SafeMGM — Loading..." with dark background → zero errors ✅

---

## Phase 4: User Story 2 — Data API Returns Montgomery Data (Priority: P1)

**Goal**: `GET /api/data?dataset=911` returns a JSON array of typed 911 call records.

**Independent Test**: Dev server running → `curl "localhost:3000/api/data?dataset=911&limit=5"` → JSON array with ≥ 1 record → all fields present (callType, dateTime, lat, lng, priority, disposition)

- [x] T017 [US2] Implement data loading in `src/lib/montgomery-data.ts` — create server-only module (add `import 'server-only'` guard); use `fs.readFileSync` + `path.join(process.cwd(), 'src/data', filename)`; implement `load911Calls(): EmergencyCall[]` using papaparse with `header: true, dynamicTyping: true`; map CSV column aliases to canonical `EmergencyCall` fields
- [x] T018 [US2] Implement `loadCrimeStats(): CrimeIncident[]` in `src/lib/montgomery-data.ts` — same papaparse pattern; map CSV columns to `CrimeIncident` fields; wrap in try/catch returning `[]` on file-not-found
- [x] T019 [US2] Implement `loadCrimeMapping(): MapPoint[]` in `src/lib/montgomery-data.ts` — `JSON.parse` the GeoJSON file; map each Feature's `geometry.coordinates` and `properties` to `MapPoint` type; wrap in try/catch returning `[]` on error
- [x] T020 [US2] Implement filtering functions in `src/lib/montgomery-data.ts`:
  - `filterByNeighborhood<T extends EmergencyCall | CrimeIncident>(data: T[], neighborhood: string): T[]`
  - `filterByDateRange<T extends EmergencyCall | CrimeIncident>(data: T[], start: string, end: string): T[]`
  - `filterByIncidentType<T extends EmergencyCall | CrimeIncident>(data: T[], type: string): T[]`
- [x] T021 [US2] Create `src/app/api/data/route.ts` — export `GET(request: Request)` handler; parse `dataset`, `neighborhood`, `limit` from `request.url` using `URL`; load and filter appropriate dataset; apply limit; return `NextResponse.json(results)`; return `NextResponse.json({ error: 'Invalid dataset' }, { status: 400 })` for unknown dataset values; wrap entire handler in try/catch returning `{ error: 'Internal error' }` with status 500 on unexpected failures

**Checkpoint**: `GET /api/data?dataset=911` → JSON array ✅ | `GET /api/data?dataset=crime&neighborhood=Midtown` → filtered results ✅ | `GET /api/data?dataset=invalid` → 400 error ✅

---

## Phase 5: User Story 3 — Data Processing Aggregations (Priority: P2)

**Goal**: Aggregation functions in `montgomery-data.ts` return correctly shaped statistical summaries.

**Independent Test**: Import and call each function with loaded data → each returns a non-empty, correctly typed result

- [x] T022 [P] [US3] Implement `getTopCrimeTypes(data: CrimeIncident[], limit = 10): { type: string; count: number }[]` in `src/lib/montgomery-data.ts` — count occurrences of `offenseType`, sort descending, return top `limit` results
- [x] T023 [P] [US3] Implement `getHourlyDistribution(calls: EmergencyCall[]): { hour: number; count: number }[]` in `src/lib/montgomery-data.ts` — parse `dateTime` field; bucket by 0–23 hour; return 24-element array sorted by hour
- [x] T024 [P] [US3] Implement `getMonthlyTrends(calls: EmergencyCall[], crimes: CrimeIncident[]): TrendDataPoint[]` in `src/lib/montgomery-data.ts` — group both datasets by YYYY-MM; return `TrendDataPoint[]` sorted chronologically; use last 12 months if more data available
- [x] T025 [US3] Implement `buildAIContext(filters?: DashboardFilters): string` in `src/lib/montgomery-data.ts` — load all datasets; apply filters if provided; format as structured text including: total counts, top crime types, hourly peak, monthly trend summary, sample recent incidents; enforce ≤ 50,000 character limit by truncating at nearest complete sentence with `\n[Data truncated — showing representative sample]`
- [x] T026 [US3] Implement `toGeoJSON(points: MapPoint[]): GeoJSON.FeatureCollection` in `src/lib/montgomery-data.ts` — map each `MapPoint` to a GeoJSON Feature with `type: 'Feature'`, `geometry: { type: 'Point', coordinates: [lng, lat] }`, and `properties: { type, severity, label }`; add `import type { FeatureCollection } from 'geojson'` (from `@types/geojson` included with TypeScript)

**Checkpoint**: Call each function manually in a test script or verify via API response → all return correctly typed, non-empty results ✅

---

## Phase 6: User Story 4 — TypeScript Strict Mode Compliance (Priority: P2)

**Goal**: `npx tsc --noEmit` exits with code 0 and zero errors across the entire codebase.

**Independent Test**: `npx tsc --noEmit` → zero output → exit code 0

- [x] T027 [US4] Run `npx tsc --noEmit` from project root; fix any type errors surfaced — common issues: missing return type annotations, implicit `any` in papaparse callbacks, GeoJSON type imports, `process.env` type narrowing
- [x] T028 [P] [US4] Verify path aliases resolve: ensure `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }` and all imports using `@/types`, `@/lib`, `@/components` resolve without errors

**Checkpoint**: `npx tsc --noEmit` → exit code 0 → zero type errors ✅

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation before committing Feature 1.

- [x] T029 [P] If sample data was used (real Montgomery files unavailable): create `DECISIONS.md` at repo root documenting: "Montgomery open data CSV files were unavailable at build time. Realistic sample data with 200+ rows and matching schema was generated. Column names match the expected portal format. Live data can be substituted by replacing files in `src/data/`."
- [ ] T030 [P] Run `npm run build` — verify production build succeeds with zero TypeScript errors and zero Next.js warnings
- [ ] T031 Final integration check: start `npm run dev` → verify `GET /api/data?dataset=911&limit=10` returns data → verify `buildAIContext()` output is under 50,000 chars → verify `.env.example` is committed → verify `.env.local` is NOT committed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion — **BLOCKS Phases 3–6**
- **Phase 3 (US1)**: Depends on Phase 2 — can start after T008–T012
- **Phase 4 (US2)**: Depends on Phase 2 — can start in parallel with Phase 3
- **Phase 5 (US3)**: Depends on Phase 4 (T017–T019 must exist for aggregations to work)
- **Phase 6 (US4)**: Depends on Phases 3–5 (validates all code written)
- **Phase 7 (Polish)**: Depends on all phases complete

### Within Each Phase — Task Dependencies

```
T001 → T002, T003, T004, T005, T006, T007   (T002–T007 parallel after T001)
T008 → T009, T010, T011, T012               (T009–T012 parallel after T008)
T013 → T014 → T015 → T016                   (sequential layout setup)
T017 → T018, T019                           (T018, T019 parallel after T017)
T020 (depends on T017–T019 types)
T021 (depends on T017–T020)
T022, T023, T024 (parallel — different functions in same file)
T025 (depends on T022–T024)
T026 (independent of T022–T025)
T027, T028 (parallel — different concerns)
T029, T030 parallel → T031
```

### Parallel Opportunities

```bash
# Phase 1 parallel group (after T001):
T002 Install runtime deps
T003 Install type defs
T004 shadcn/ui init
T005 tsconfig paths
T006 .env.example
T007 .gitignore

# Phase 2 parallel group (after T008):
T009 911-calls.csv
T010 crime-stats.csv
T011 crime-mapping.geojson
T012 utils.ts

# Phase 5 parallel group (within US3):
T022 getTopCrimeTypes()
T023 getHourlyDistribution()
T024 getMonthlyTrends()
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup → `npm install` works
2. Complete Phase 2: Foundational → types + data files ready
3. Complete Phase 3: US1 → `npm run dev` works
4. Complete Phase 4: US2 → `/api/data` returns real data
5. **STOP and VALIDATE**: Does the API return correctly typed data? ✅
6. Commit: `git add -A && git commit -m "feat: Feature 1 MVP — foundation, types, data API"`

### Full Delivery (All User Stories)

Continue from MVP:

7. Complete Phase 5: US3 → aggregation functions ready for Feature 3 (stats cards, trend chart)
8. Complete Phase 6: US4 → TypeScript clean
9. Complete Phase 7: Polish → build verified, DECISIONS.md if needed
10. Final commit: `git add -A && git commit -m "feat: Feature 1 complete — foundation, data pipeline, base API"`

---

## Notes

- `[P]` tasks touch different files — safe to implement in parallel
- `montgomery-data.ts` is server-only — never import it in a `"use client"` component
- All env vars referenced in later features — `.env.example` committed now saves time later
- Sample data rows must use consistent neighborhood spellings — future filtering depends on exact string matches
- GeoJSON coordinates are `[lng, lat]` (longitude first) — Leaflet expects `[lat, lng]` — conversion happens in `toGeoJSON()` or in the map component (document the convention)
- Commit after each checkpoint, not just at the end
