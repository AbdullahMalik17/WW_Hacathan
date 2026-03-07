---
id: "004"
title: Create montgomery-data.ts core data library
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: 001-foundation-data
branch: main
user: architext
command: implement montgomery-data.ts
labels: ["data-library","csv-parsing","geojson","filtering","aggregation","server-only"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/lib/montgomery-data.ts
tests:
  - none (manual verification of file creation and line count)
---

## Prompt

You are implementing the core data library for SafeMGM — an AI-powered public safety dashboard for Montgomery, Alabama.

Your ONLY job is to create ONE file: `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/lib/montgomery-data.ts`

This is a server-only module that loads, parses, filters, and aggregates Montgomery public safety data from CSV/GeoJSON files. It must be complete and production-ready.

[Full spec provided including types from src/types/index.ts and exact file content to write.]

## Response snapshot

Created `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/lib/montgomery-data.ts` with 314 lines. The file implements:

- `readDataFile(filename)` — safe fs.readFileSync with try/catch returning empty string on failure
- `load911Calls()` — parses 911-calls.csv via PapaParse with multi-casing header fallbacks, filters invalid rows
- `loadCrimeStats()` — parses crime-stats.csv via PapaParse with multi-casing header fallbacks, filters invalid rows
- `loadCrimeMapping()` — parses crime-mapping.geojson, maps GeoJSON features to MapPoint with severity classification
- `getSeverity(type)` — classifies incident types into low/medium/high severity
- `filterByNeighborhood<T>()` — generic filter for CrimeIncident neighborhood field
- `filterByDateRange<T>()` — generic date range filter over dateTime or date fields
- `filterByIncidentType<T>()` — generic type filter over callType or offenseType fields
- `applyFilters()` — composes all three filters via DashboardFilters object
- `getTopCrimeTypes()` — frequency map + sort, returns top N types
- `getHourlyDistribution()` — 24-bucket UTC hour distribution for 911 calls
- `getMonthlyTrends()` — YYYY-MM keyed trend aggregation, returns last 12 months as TrendDataPoint[]
- `buildAIContext()` — assembles structured 50K-capped plain text context string for AI consumption
- `getTopNeighborhoods()` — frequency map + sort for neighborhoods
- `toGeoJSON()` — converts MapPoint[] to GeoJSONFeatureCollection

## Outcome

- Impact: Core server-only data module for SafeMGM dashboard is complete; all data loading, filtering, and aggregation functions are available for Next.js Server Components and API routes
- Tests: No automated tests run; file created and verified at line 314
- Files: src/lib/montgomery-data.ts (314 lines, new file)
- Next prompts: Wire data functions into dashboard Server Components; add unit tests for filter/aggregation logic; seed src/data/ CSV and GeoJSON files with real Montgomery data
- Reflection: File exactly matches the provided specification. Multi-casing header fallbacks ensure resilience against inconsistent CSV column naming from real-world data sources.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add memoization/caching layer (e.g., module-level Map cache keyed by filename mtime) to avoid repeated fs.readFileSync on hot paths
