# Tasks: AI Engine & Bright Data Integration

**Input**: Design documents from `specs/002-ai-engine-bright-data/`
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup

- [X] T001 Verify API keys in `.env.local` (GOOGLE_GEMINI_API_KEY, BRIGHT_DATA_API_TOKEN)
- [X] T002 Confirm dependencies are installed (`ai`, `@ai-sdk/google`, `papaparse`) via `package.json`

## Phase 2: Foundational

- [X] T003 Define `NewsArticle` and `SafetyAnalysis` interfaces in `src/types/index.ts`
- [X] T004 [P] Create Google Gemini provider instance in `src/lib/gemini.ts`
- [X] T005 [P] Create Bright Data client skeleton in `src/lib/brightdata.ts`

## Phase 3: User Story 1 - Streaming AI Chat with Montgomery Data (Priority: P1)

**Goal**: Enable a streaming chat that cites real Montgomery safety statistics.

**Independent Test**: `POST /api/chat` with query about call types returns a streamed response with numbers.

- [X] T006 [US1] Implement `SAFE_MGM_SYSTEM_PROMPT` with persona and citation rules in `src/lib/gemini.ts`
- [X] T007 [US1] Implement `analyzeData` for streaming text completion in `src/lib/gemini.ts`
- [X] T008 [US1] Create `POST /api/chat` route with `streamText` in `src/app/api/chat/route.ts`
- [X] T009 [US1] Integrate `buildAIContext()` from `src/lib/montgomery-data.ts` into chat route in `src/app/api/chat/route.ts`
- [X] T010 [US1] Set `maxDuration = 60` for chat route in `src/app/api/chat/route.ts`

## Phase 4: User Story 3 - Graceful Degradation (Priority: P1)

**Goal**: Ensure the app remains functional even if external APIs fail or are missing.

**Independent Test**: Chat works without `BRIGHT_DATA_API_TOKEN` configured.

- [X] T011 [US3] Wrap Gemini calls in try/catch to handle rate limits in `src/app/api/chat/route.ts`
- [X] T012 [US3] Implement logic to return user-friendly error messages on AI failure in `src/app/api/chat/route.ts`
- [X] T013 [US3] Ensure `src/lib/brightdata.ts` returns empty arrays instead of throwing on API errors

## Phase 5: User Story 2 - Real-time News Enrichment via Bright Data (Priority: P2)

**Goal**: Enrich AI responses with live Montgomery news via Bright Data SERP API.

**Independent Test**: `GET /api/news?q=safety` returns JSON array of articles.

- [X] T014 [P] [US2] Implement query cleaning helper (stopwords/append "Montgomery") in `src/lib/brightdata.ts`
- [X] T015 [US2] Implement `fetchMontgomeryNews` via Bright Data SERP API in `src/lib/brightdata.ts`
- [X] T016 [US2] Integrate `fetchMontgomeryNews` enrichment into chat flow in `src/app/api/chat/route.ts`
- [X] T017 [US2] Implement `scrapeWebPage` via Web Unlocker in `src/lib/brightdata.ts`
- [X] T018 [US2] Create `GET /api/news` route in `src/app/api/news/route.ts`

## Phase 6: User Story 4 - Structured Safety Analysis (Priority: P2)

**Goal**: Provide structured JSON output for programmatic safety assessments.

**Independent Test**: Call `getStructuredAnalysis()` and verify JSON matches `SafetyAnalysis` type.

- [X] T019 [US4] Implement `getStructuredAnalysis` with JSON schema enforcement in `src/lib/gemini.ts`

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T020 Run `npx tsc --noEmit` to verify type safety across all new files
- [X] T021 Validate all API responses match expected formats using `curl` or Postman
- [X] T022 Document Bright Data integration details in `README.md` (if applicable)

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)** must be completed before any User Story.
2. **User Story 1 (US1)** and **User Story 3 (US3)** are P1 and should be prioritized.
3. **User Story 2 (US2)** depends on the chat infrastructure from US1.
4. **User Story 4 (US4)** is independent of the chat route but requires the Gemini client from Phase 2.

## Parallel Execution Examples

### Parallel US1 Models/Clients
- T004 [P] Create Gemini provider instance in `src/lib/gemini.ts`
- T005 [P] Create Bright Data client skeleton in `src/lib/brightdata.ts`

### Parallel US2 Helpers
- T014 [P] Implement query cleaning helper in `src/lib/brightdata.ts`
- T017 [US2] Implement `scrapeWebPage` in `src/lib/brightdata.ts`
