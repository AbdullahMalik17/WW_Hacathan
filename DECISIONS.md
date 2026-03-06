# SafeMGM — Implementation Decisions

## Feature 1: Foundation & Data Pipeline

### Decision 1: Sample Data Used for Montgomery Datasets

**Status:** Active
**Date:** 2026-03-06

**Context:**
The Montgomery open data portal (opendata.montgomeryal.gov) requires manual download of CSV/GeoJSON files. These were not available at implementation time.

**Decision:**
Realistic sample data was generated matching the expected schema from the portal documentation. Files created:
- `src/data/911-calls.csv` — 250 rows, Jan 2024 – Dec 2024
- `src/data/crime-stats.csv` — 195 rows, Jan 2024 – Feb 2025
- `src/data/crime-mapping.geojson` — 80 GeoJSON Point features

**Schema Match:**
Column names match the expected Montgomery portal fields exactly:
- 911 calls: `callType, dateTime, lat, lng, priority, disposition, responseUnit`
- Crime stats: `offenseType, date, lat, lng, neighborhood, status, caseId`
- Crime mapping: `incidentType, date, description` in GeoJSON `properties`

**To Replace with Real Data:**
Download CSV/GeoJSON files from https://opendata.montgomeryal.gov/datasets/911-calls, /crime-statistics-2, and /crime-mapping. Replace files in `src/data/`. The column aliasing in `montgomery-data.ts` handles common variants automatically.

**Neighborhoods Used:**
Cloverdale, Midtown, East Montgomery, West Montgomery, Capitol Heights

---

### Decision 2: Manual Next.js Scaffolding (No create-next-app)

**Status:** Active
**Date:** 2026-03-06

**Context:**
`create-next-app` rejected the project directory name "WW_Hacathan" because it contains uppercase letters (npm naming restriction).

**Decision:**
All Next.js configuration files were created manually:
- `package.json` (name: safemgm)
- `tsconfig.json` (strict: true, path aliases)
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.eslintrc.json`

**Impact:** Functionally equivalent to `create-next-app` output. Zero functional difference.

---

### Decision 3: shadcn/ui Manual Component Creation

**Status:** Active
**Date:** 2026-03-06

**Context:**
The `npx shadcn@latest init` CLI command requires interactive input which cannot run in the automated agent environment.

**Decision:**
Core shadcn/ui components (card, button, input, badge, skeleton) were created manually in `src/components/ui/` following the shadcn/ui patterns exactly. `components.json` was created for future `shadcn add` commands.

**Components Created:** card, button, input, badge, skeleton
**Remaining (for Feature 3):** scroll-area, tabs, separator — add as needed with `npx shadcn@latest add <component>`

---

### Decision 4: PowerShell Scripts Not Available in WSL2

**Status:** Informational
**Date:** 2026-03-06

**Context:**
The `.specify/scripts/powershell/` scripts require PowerShell (`pwsh`), which was not installed in the WSL2 environment.

**Decision:**
All script actions (branch creation, directory setup, spec file initialization) were replicated manually via bash. No functionality was lost.
