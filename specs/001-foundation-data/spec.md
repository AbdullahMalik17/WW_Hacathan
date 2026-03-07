# Feature Specification: Project Foundation & Data Pipeline

**Feature Branch**: `001-foundation-data`
**Created**: 2026-03-06
**Status**: Draft
**Input**: Feature 1 of SafeMGM — establish Next.js 15 project infrastructure and Montgomery public safety data ingestion layer

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Project Bootstraps Without Errors (Priority: P1)

A developer clones the SafeMGM repository, installs dependencies, and starts the development server. The app loads on localhost:3000 with no errors in the terminal or browser console.

**Why this priority**: Without a working dev environment, no other feature can be built or tested. This is the absolute foundation.

**Independent Test**: Clone repo → `npm install` → `npm run dev` → visit localhost:3000. If the page loads with no errors, this story passes independently.

**Acceptance Scenarios**:

1. **Given** a freshly cloned repo with no `node_modules`, **When** the developer runs `npm install`, **Then** all packages install successfully with no peer dependency errors
2. **Given** installed dependencies, **When** the developer runs `npm run dev`, **Then** the server starts on port 3000 with no TypeScript or compilation errors
3. **Given** the running dev server, **When** a browser visits localhost:3000, **Then** the page loads (even if minimal) with no console errors

---

### User Story 2 — Data API Returns Montgomery 911 Call Data (Priority: P1)

A developer or automated test calls the `/api/data` endpoint with `dataset=911` and receives a JSON array of typed 911 call records from the Montgomery dataset.

**Why this priority**: The data API is the backbone every other feature depends on. AI chat, map markers, and stats cards all query this endpoint.

**Independent Test**: With dev server running, `GET /api/data?dataset=911&limit=10` returns a JSON array with at least 1 record containing typed fields (callType, dateTime, lat, lng, priority, disposition).

**Acceptance Scenarios**:

1. **Given** the dev server is running, **When** a GET request is made to `/api/data?dataset=911`, **Then** the response is a JSON array with correctly typed 911 call records
2. **Given** a request with `limit=5`, **When** the endpoint processes it, **Then** at most 5 records are returned
3. **Given** a request with `dataset=crime&neighborhood=downtown`, **When** the endpoint processes it, **Then** only crime records matching the downtown neighborhood filter are returned
4. **Given** Montgomery CSV files are absent from `src/data/`, **When** the endpoint is called, **Then** the app returns realistic sample data (200+ rows) rather than crashing

---

### User Story 3 — Data Processing Functions Aggregate Correctly (Priority: P2)

The `montgomery-data.ts` library correctly aggregates raw CSV/GeoJSON data into statistical summaries used by the dashboard (top crime types, hourly distribution, monthly trends, AI context string).

**Why this priority**: The aggregation functions feed the stats cards and trend chart directly. If they're wrong, every derived metric in the UI is wrong.

**Independent Test**: Call `getTopCrimeTypes()`, `getHourlyDistribution()`, `getMonthlyTrends()`, and `buildAIContext()` with sample data. Each returns a correctly shaped, non-empty result.

**Acceptance Scenarios**:

1. **Given** a loaded dataset of 911 calls, **When** `getTopCrimeTypes()` is called, **Then** it returns an array of `{ type: string, count: number }` sorted by count descending
2. **Given** a loaded dataset, **When** `buildAIContext()` is called, **Then** it returns a string under 50,000 characters containing formatted Montgomery safety data
3. **Given** crime data with date fields, **When** `getMonthlyTrends()` is called, **Then** it returns 12 monthly data points with call counts and crime counts

---

### User Story 4 — TypeScript Compiles in Strict Mode (Priority: P2)

All TypeScript type definitions in `src/types/index.ts` and all library files compile with zero errors under `tsc --strict`.

**Why this priority**: TypeScript safety is a non-negotiable constitutional requirement. Type errors in development cascade into runtime failures.

**Independent Test**: Run `npx tsc --noEmit`. Zero errors output.

**Acceptance Scenarios**:

1. **Given** the full codebase, **When** `npx tsc --noEmit` is run, **Then** the process exits with code 0 and no error output
2. **Given** the type definitions, **When** a developer tries to assign an incorrect type (e.g., `string` to a `number` field), **Then** TypeScript surfaces a compile-time error

---

### Edge Cases

- What happens when Montgomery CSV files contain malformed rows (missing lat/lng, empty fields)? → Parser skips invalid rows and logs a warning; valid rows are still returned
- What happens when `limit` parameter exceeds total available records? → Return all available records without error
- What happens when `neighborhood` filter matches nothing? → Return empty array `[]` with 200 status, not a 404 or 500
- What happens when `buildAIContext()` raw data exceeds 50K characters? → Truncate to 50K characters with a trailing ellipsis and a note about truncation
- What happens when both `dataset=911` and `dataset=crime` files are missing? → Return sample data for the requested dataset type with a response header indicating fallback mode

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST initialize as a Next.js 15 App Router project with TypeScript strict mode enabled
- **FR-002**: System MUST include all required dependencies: `ai`, `@ai-sdk/google`, `@ai-sdk/openai`, `leaflet`, `react-leaflet`, `recharts`, `papaparse`, `lucide-react`, and associated type definitions
- **FR-003**: System MUST include shadcn/ui initialized with components: `card`, `button`, `input`, `scroll-area`, `tabs`, `badge`, `skeleton`, `separator`
- **FR-004**: System MUST load and parse Montgomery 911 Calls data (CSV) from `src/data/` with fields: callType, dateTime, lat, lng, priority, disposition
- **FR-005**: System MUST load and parse Montgomery Crime Statistics data (CSV) from `src/data/` with fields: offenseType, date, lat, lng, neighborhood, status
- **FR-006**: System MUST load and parse Montgomery Crime Mapping data (GeoJSON) from `src/data/` with incident types and coordinates
- **FR-007**: System MUST expose a `buildAIContext(filters?)` function that returns a formatted string under 50,000 characters suitable for Gemini's context window
- **FR-008**: System MUST expose filtering functions: filter by neighborhood, date range, and incident type
- **FR-009**: System MUST expose aggregation functions: `getTopCrimeTypes()`, `getHourlyDistribution()`, `getMonthlyTrends()`
- **FR-010**: System MUST expose a `toGeoJSON()` conversion function for rendering data on the map
- **FR-011**: System MUST define TypeScript types: `EmergencyCall`, `CrimeIncident`, `NewsArticle`, `MapPoint`, `TrendDataPoint`, `SafetyAnalysis`, `DashboardFilters`
- **FR-012**: System MUST provide a `/api/data` GET endpoint accepting query params: `dataset` (911 | crime | mapping), `neighborhood` (string), `limit` (number)
- **FR-013**: System MUST return filtered Montgomery data as a typed JSON array from `/api/data`
- **FR-014**: System MUST include a `.env.example` file with placeholders for: `GOOGLE_GEMINI_API_KEY`, `OPENAI_API_KEY`, `BRIGHT_DATA_API_TOKEN`, `BRIGHT_DATA_SERP_ZONE`
- **FR-015**: System MUST ensure `.env.local` is listed in `.gitignore` (never committed)
- **FR-016**: System MUST fall back to realistic sample data (200+ rows, matching schema) if real Montgomery files are absent from `src/data/`

### Key Entities

- **EmergencyCall**: Represents a 911 call record — callType, dateTime (ISO string), lat (number), lng (number), priority (string), disposition (string), responseUnit (string?)
- **CrimeIncident**: Represents a crime record — offenseType, date (ISO string), lat (number), lng (number), neighborhood (string), status (string), caseId (string?)
- **NewsArticle**: Represents a scraped news article — title, link, snippet, source, date (used by Feature 2, defined here)
- **MapPoint**: Represents a map marker — lat (number), lng (number), type (string), severity ('low' | 'medium' | 'high'), label (string)
- **TrendDataPoint**: Represents one month in the trend chart — month (string), calls911 (number), crimeIncidents (number)
- **SafetyAnalysis**: Represents AI structured output — safetyScore (1–100), topIncidentTypes (string[]), trendDirection ('improving' | 'worsening' | 'stable'), recentIncidentCount (number), summary (string), recommendations (string[])
- **DashboardFilters**: Represents user-selected filters — neighborhood (string | null), dateRange ({ start: string; end: string } | null), incidentType (string | null)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer can clone the repo, run two commands (`npm install` && `npm run dev`), and have a working dev server in under 3 minutes
- **SC-002**: The `/api/data?dataset=911` endpoint returns at least 200 records with all required typed fields present
- **SC-003**: The `buildAIContext()` function consistently returns a string between 1,000 and 50,000 characters across all filter combinations
- **SC-004**: Running `npx tsc --noEmit` produces zero errors
- **SC-005**: The `/api/data?dataset=crime&neighborhood=downtown` endpoint returns only records matching the neighborhood filter (0% false positives)
- **SC-006**: All 7 TypeScript types are importable from `@/types` with no compilation warnings

---

## Assumptions

- Montgomery open data CSV files will be manually downloaded and placed in `src/data/` before Feature 2 work begins; if unavailable, sample data with identical schema and 200+ rows will be substituted
- CSV column names from the Montgomery portal may vary slightly from expected names — the data loading layer will map known column aliases to canonical field names
- The `/api/data` endpoint is server-side only; no client-side data fetching of raw CSV files
- shadcn/ui will be initialized with the `default` style and `slate` base color to align with the dark theme (overridden via CSS variables per the constitution)
- No authentication or rate limiting is needed for the `/api/data` route in the hackathon context
- Sample fallback data, if used, will be documented in a `DECISIONS.md` file at the repo root
