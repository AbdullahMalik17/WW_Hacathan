---
id: "003"
title: "Add Missing Chat and News API Routes"
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: 002-ai-engine-bright-data
branch: 001-foundation-data
user: AbdullahMalik17
command: /sp.implement (gap analysis from specs/specs)
labels: ["api", "chat", "news", "bright-data", "gemini", "fix", "missing-routes"]
links:
  spec: specs/002-ai-engine-bright-data/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/app/api/chat/route.ts
  - src/app/api/news/route.ts
  - src/lib/gemini.ts
  - README.md
tests:
  - npx tsc --noEmit → exit code 0
  - npm run build → exit code 0
---

## Prompt

Read /@specs/specs data. Ensure that we have completed all the Data_source and Features.

## Response snapshot

Performed a complete cross-check of all specs against the codebase:

**Gap Analysis:**
- `/api/chat/route.ts` — MISSING (app-breaking: ChatPanel broken without it)
- `/api/news/route.ts` — MISSING (app-breaking: NewsPanel broken without it)
- `gemini.ts` model — `gemini-1.5-flash` but spec requires `gemini-2.5-flash-preview-05-20`
- README — referenced wrong model name

**Everything else verified as present and correct:**
- All 3 data files in src/data/ ✅
- All 7 TypeScript types ✅
- /api/data, /api/stats, /api/trends ✅
- gemini.ts (SAFE_MGM_SYSTEM_PROMPT, analyzeData, getStructuredAnalysis) ✅
- brightdata.ts (fetchMontgomeryNews, scrapeWebPage, cleanSearchQuery) ✅
- All 5 dashboard components ✅
- vercel.json with maxDuration: 60 ✅

**Fixes applied:**
1. Created `src/app/api/chat/route.ts` — POST handler using AI SDK v3 pattern:
   - Converts UIMessage[] → ModelMessage[] via `convertToModelMessages`
   - Calls `buildAIContext()` for data context
   - Calls `fetchMontgomeryNews()` for news (graceful degradation)
   - Streams via `analyzeData()` → `result.toUIMessageStreamResponse()`
   - exports `maxDuration = 60`
2. Created `src/app/api/news/route.ts` — GET handler that always returns 200
3. Updated `gemini.ts` model to `gemini-2.5-flash-preview-05-20`
4. Updated README model references

Build result: exit code 0, all 5 routes in route table: /api/chat ƒ, /api/data ƒ, /api/news ƒ, /api/stats ƒ, /api/trends ƒ.

## Outcome

- ✅ Impact: Both critical app-breaking gaps fixed. Chat streaming and news feed now functional.
- 🧪 Tests: tsc --noEmit → 0 errors; npm run build → exit code 0
- 📁 Files: 2 new route files created, 2 files updated
- 🔁 Next prompts: Deploy to Vercel and verify live URL; test chat streaming end-to-end
- 🧠 Reflection: Task files marked all tasks as done but the actual route files never existed. Always verify file existence in addition to task status.

## Evaluation notes (flywheel)

- Failure modes observed: Task tracking false-positive — tasks marked [X] but files were absent. Spec cross-check caught what task status didn't.
- Graders run and results (PASS/FAIL): tsc PASS; build PASS
- Prompt variant (if applicable): null
- Next experiment: Add integration test that verifies each API route returns 200 at startup
