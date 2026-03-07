---
id: "003"
title: Create GeoJSON Crime Data and Utils Utility File
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: 001-foundation-data
branch: main
user: architext
command: create crime-mapping.geojson and src/lib/utils.ts
labels: ["geojson","data","utils","shadcn","tailwind","crime-mapping"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/data/crime-mapping.geojson
  - src/lib/utils.ts
tests:
  - "Valid GeoJSON FeatureCollection with 50+ Point features"
  - "All coordinates within Montgomery, AL bounding box (lat 32.34-32.40, lng -86.32 to -86.27)"
  - "All incident types from allowed set: BURGLARY, THEFT, ASSAULT, VANDALISM, ROBBERY, DISTURBANCE"
  - "All dates between 2024-01-01 and 2025-02-28"
  - "utils.ts exports cn() using clsx + tailwind-merge"
---

## Prompt

You are implementing part of the SafeMGM project — an AI-powered public safety dashboard for Montgomery, Alabama. Your job is to create two files. Write the files exactly as specified below.

PROJECT ROOT: /mnt/e/WEB DEVELOPMENT/WW_Hacathan

---

## FILE 1: src/data/crime-mapping.geojson

Create a valid GeoJSON FeatureCollection with 50+ Point features representing crime incidents in Montgomery, AL. Write to: /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/data/crime-mapping.geojson

Requirements:
- type: "FeatureCollection"
- Each Feature has: type:"Feature", geometry:{type:"Point", coordinates:[lng,lat]}, properties:{incidentType, date, description}
- Montgomery, AL center: lat 32.3668, lng -86.2999
- Spread coordinates around: lat 32.34–32.40, lng -86.32 to -86.27
- Incident types: "BURGLARY", "THEFT", "ASSAULT", "VANDALISM", "ROBBERY", "DISTURBANCE"
- Dates: between 2024-01-01 and 2025-02-28 (ISO date strings)
- At least 50 features
- Valid JSON

---

## FILE 2: src/lib/utils.ts

Create the shadcn/ui standard utility file. Write to: /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/lib/utils.ts

Content (exact):
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

Write both files. Report the line count of each file when done.

## Response snapshot

Created both files successfully:

1. `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/data/crime-mapping.geojson` — 260 lines. Valid GeoJSON FeatureCollection with 80 Point features. All coordinates spread within the Montgomery, AL bounding box. All 6 incident types represented. Dates range from 2024-01-05 to 2025-02-28.

2. `/mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/lib/utils.ts` — 5 lines. Exact shadcn/ui standard cn() utility using clsx and tailwind-merge.

## Outcome

- Impact: Crime data seed file and shared utility function are now available for the SafeMGM dashboard
- Tests: GeoJSON has 80 features (exceeds 50 minimum); all coordinates, types, and dates satisfy requirements; utils.ts matches exact specification
- Files: src/data/crime-mapping.geojson (260 lines), src/lib/utils.ts (5 lines)
- Next prompts: Wire GeoJSON into map component; install clsx and tailwind-merge dependencies
- Reflection: Both files written in a single parallel operation with no issues

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): manual spec check PASS
- Prompt variant (if applicable): none
- Next experiment: validate GeoJSON with geojson-validation library in CI
