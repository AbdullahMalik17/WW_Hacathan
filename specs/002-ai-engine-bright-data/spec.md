# Feature Specification: AI Engine & Bright Data Integration

**Feature Branch**: `002-ai-engine-bright-data`
**Created**: 2026-03-06
**Status**: Draft
**Input**: Build the AI intelligence layer for SafeMGM using Google Gemini 2.5 Flash and Bright Data SERP API.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Streaming AI Chat with Montgomery Data (Priority: P1)

A user asks "What are the most common 911 calls in Montgomery?" in the chat. The AI responds in a streaming fashion, citing actual statistics from the Montgomery 911 dataset (e.g., "The most frequent call type is 'DISTURBANCE' with 450 incidents...").

**Why this priority**: This is the core "AI Engine" value proposition. Without real data grounding, it's just a generic chatbot.

**Independent Test**: `POST /api/chat` with a message asking about call types. Verify the response is a stream (`Transfer-Encoding: chunked`) and contains numbers that match the CSV data.

**Acceptance Scenarios**:
1. **Given** valid Montgomery data in `src/data/`, **When** a user asks for statistics, **Then** the AI response includes specific numbers (e.g., "123 incidents") rather than vague summaries.
2. **Given** a chat session, **When** the AI responds, **Then** the response is streamed to the client (not delivered as one large block).
3. **Given** a user question, **When** Gemini is called, **Then** it uses the "SafeMGM Public Safety Analyst" persona (professional, balanced, citations included).

---

### User Story 2 — Real-time News Enrichment via Bright Data (Priority: P2)

A user asks "Tell me about safety near downtown". The AI response includes both statistical data analysis AND recent news context (e.g., "Recent local news indicates a community meeting about... 📰").

**Why this priority**: News enrichment provides "real-time" context that static CSV data lacks, fulfilling the "latest GenAI" hackathon requirement.

**Independent Test**: With `BRIGHT_DATA_API_TOKEN` configured, check `GET /api/news?q=downtown`. It should return an array of articles with title, link, and snippet.

**Acceptance Scenarios**:
1. **Given** Bright Data is configured, **When** a user asks about a location, **Then** the AI context includes results from `fetchMontgomeryNews()`.
2. **Given** Bright Data returns news, **When** the AI responds, **Then** news-based facts are prefixed with a news emoji (e.g., 📰 or 🗞️).
3. **Given** a search query, **When** `fetchMontgomeryNews` is called, **Then** it appends "Montgomery Alabama" to the query automatically.

---

### User Story 3 — Graceful Degradation (Priority: P1)

If the Bright Data API key is missing or the service is down, the chat still works perfectly using only the Montgomery data context. The user sees a helpful response instead of a crash.

**Why this priority**: External API dependencies are fragile. The core app must be resilient.

**Independent Test**: Remove `BRIGHT_DATA_API_TOKEN` from `.env`. Call `/api/chat`. The AI should still respond based on Montgomery data without erroring.

**Acceptance Scenarios**:
1. **Given** Bright Data API fails (500 or timeout), **When** a user chats, **Then** the system catches the error and continues the AI stream without news context.
2. **Given** Gemini API is rate-limited, **When** a user chats, **Then** the API returns a friendly JSON error message (e.g., "AI is currently busy...") with a 429 or 503 status, not a raw stack trace.

---

### User Story 4 — Structured Safety Analysis (Priority: P2)

The system generates a structured safety report for a given location or time period, providing a safety score (1-100) and specific recommendations.

**Why this priority**: Structured output is essential for building dashboards and programmatic safety assessments beyond just chat.

**Independent Test**: Call `getStructuredAnalysis()` with a context string. Verify it returns valid JSON matching the `SafetyAnalysis` type.

**Acceptance Scenarios**:
1. **Given** a context string, **When** `getStructuredAnalysis()` is called, **Then** it returns JSON with: `safetyScore`, `topIncidentTypes`, `trendDirection`, `recentIncidentCount`, `summary`, and `recommendations`.
2. **Given** the structured analysis, **When** the AI assesses a high-crime area, **Then** the `safetyScore` is appropriately low and recommendations are specific.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-201**: System MUST create a Gemini API client in `src/lib/gemini.ts` using `@ai-sdk/google`.
- **FR-202**: System MUST implement a "SafeMGM Public Safety Analyst" persona via a system prompt (professional, citations required, no fabrication, balanced tone).
- **FR-203**: System MUST expose `analyzeData(dataContext, newsContext, userQuery)` for general text streaming.
- **FR-204**: System MUST expose `getStructuredAnalysis(context)` returning JSON-formatted safety metrics.
- **FR-205**: System MUST implement `src/lib/brightdata.ts` to fetch news using Bright Data SERP API.
- **FR-206**: System MUST append "Montgomery Alabama" to all Bright Data SERP queries.
- **FR-207**: System MUST parse Bright Data responses into a standardized `NewsArticle[]` format.
- **FR-208**: System MUST implement `scrapeWebPage(url)` using Bright Data Web Unlocker for secondary use.
- **FR-209**: System MUST provide a `POST /api/chat` endpoint that uses Vercel AI SDK's `streamText`.
- **FR-210**: System MUST set `maxDuration` to 60 seconds for the chat API route.
- **FR-211**: System MUST provide a `GET /api/news` endpoint that returns `NewsArticle[]` with a 200 status even on failure (graceful empty state).
- **FR-212**: System MUST include a keyword extraction helper to clean user queries for news searching.

### Key Entities

- **NewsArticle**: `title: string`, `link: string`, `snippet: string`, `source: string`, `date: string`.
- **SafetyAnalysis**: `safetyScore: number (1-100)`, `topIncidentTypes: string[]`, `trendDirection: 'improving' | 'worsening' | 'stable'`, `recentIncidentCount: number`, `summary: string`, `recommendations: string[]`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-201**: `POST /api/chat` returns a `Transfer-Encoding: chunked` response.
- **SC-202**: AI responses include at least one specific statistic (number) from the Montgomery dataset when relevant.
- **SC-203**: `GET /api/news?q=test` returns a JSON array of at least 1 article when a valid API key is provided.
- **SC-204**: Deleting the Bright Data API key does NOT result in a 500 error on the chat endpoint.
- **SC-205**: `getStructuredAnalysis` returns valid JSON that can be parsed into the `SafetyAnalysis` TypeScript interface.
- **SC-206**: Total response time for news enrichment (fetching + parsing) is under 5 seconds.

---

## Assumptions

- Google Gemini 2.5 Flash (or 1.5 Flash) is used as the primary model.
- Bright Data SERP API is available and configured via environment variables.
- Vercel AI SDK (`ai` package) is used for streaming and chat hook integration.
- The `buildAIContext()` function from `src/lib/montgomery-data.ts` is functional and returns accurate data.
- User queries are primarily in English.
