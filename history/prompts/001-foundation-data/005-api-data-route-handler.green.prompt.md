---
id: 005
title: API Data Route Handler
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: 001-foundation-data
branch: main
user: unknown
command: create /api/data route handler
labels: ["api", "nextjs", "route-handler", "montgomery-data", "green"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/api/data/route.ts
tests:
  - none
---

## Prompt

Create ONE file: `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/api/data/route.ts`

This is a GET route handler that accepts query params (dataset, neighborhood, limit) and returns filtered Montgomery public safety data as JSON.

## Response snapshot

Created `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/api/data/route.ts` (69 lines). The route:
- Validates `dataset` param against allowed values `911`, `crime`, `mapping` (returns 400 on invalid)
- Caps `limit` at 10,000 (default 1,000)
- Applies `dateStart`/`dateEnd` and `incidentType` filters for `911` and `crime` datasets
- Applies `neighborhood` filter for `crime` dataset only
- Returns `MapPoint[]` sliced to limit for `mapping` dataset
- Catches all errors and returns 500 with descriptive message

## Outcome

- Impact: Next.js 15 API route enabling data access for SafeMGM public safety dashboard
- Tests: none added
- Files: src/app/api/data/route.ts (created, 69 lines)
- Next prompts: implement montgomery-data library functions, add frontend data fetching hooks
- Reflection: Straightforward route handler following Next.js 15 App Router conventions

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add unit tests for each dataset branch
