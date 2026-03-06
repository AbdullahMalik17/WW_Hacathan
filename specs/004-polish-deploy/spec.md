# Feature Specification: Polish, Deploy & Demo Preparation

**Feature Branch**: `004-polish-deploy`
**Created**: 2026-03-06
**Status**: Draft
**Input**: Elevate SafeMGM from prototype to "hackathon winner" with visual polish, bulletproof error handling, and production deployment.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visual Excellence & Animations (Priority: P1)

A judge opens the SafeMGM URL. The dashboard doesn't just "appear"; it reveals itself through a series of staggered, smooth fade-up animations. Stats cards reveal first, followed by the map, then the chat terminal, and finally the news feed. High-severity markers on the map pulse gently, drawing attention to critical areas.

**Why this priority**: First impressions are everything in a hackathon. Visual polish signals quality and attention to detail.

**Independent Test**: Refresh the page. Observe the 0.1s stagger delay between panels. Ensure no layout shift during animation.

**Acceptance Scenarios**:
1. **Given** the dashboard, **When** it loads, **Then** panels animate in sequence (stats → map → chat → news).
2. **Given** the map, **When** a high-severity marker is rendered, **Then** it has a visible pulse animation.
3. **Given** stats cards, **When** they appear, **Then** the numbers have a subtle opacity count-up effect.

---

### User Story 2 — Bulletproof Resilience (Priority: P1)

During the live demo, the Gemini API hits a rate limit. Instead of a blank screen or a console error, the ChatPanel shows a friendly "SafeMGM is thinking... Please try again in a moment" message with a prominent "Retry" button. If the user's internet drops, a top banner appears notifying them they are offline.

**Why this priority**: Demos are high-pressure environments. The app must handle failures without breaking the presenter's flow.

**Independent Test**: Mock a 429 error from `/api/chat`. Verify the retry UI appears and works. Simulate offline mode in dev tools.

**Acceptance Scenarios**:
1. **Given** a failed AI request, **When** the error occurs, **Then** a friendly error state with a retry option is displayed.
2. **Given** missing news data, **When** Bright Data fails, **Then** the news panel shows "News temporarily unavailable" while the rest of the app remains functional.
3. **Given** a network disconnection, **When** offline, **Then** a global notification banner is visible.

---

### User Story 3 — Judge-Ready Documentation (Priority: P2)

A judge visits the GitHub repository. The README immediately explains why SafeMGM exists (the problem), how it solves it (the solution), and how it can be commercialized. Bright Data, Google Gemini, and the City of Montgomery are prominently credited.

**Why this priority**: Judges often spend more time reading the README than clicking around the app. It must sell the vision.

**Independent Test**: Read README.md. Ensure it covers all 7 required sections (Tagline, Problem, Solution, Track, Data Sources, Tech Stack, Commercialization).

**Acceptance Scenarios**:
1. **Given** the repo root, **When** README.md is viewed, **Then** it includes high-quality screenshots and Bright Data attribution.
2. **Given** the "Commercialization" section, **When** read, **Then** it clearly states the city-agnostic SaaS potential for 3,000+ cities.

---

### User Story 4 — Production Deployment (Priority: P1)

The developer pushes the code to GitHub. Vercel automatically deploys the site. The live URL supports all features, including streaming chat (with `maxDuration: 60`), interactive mapping, and real-time news fetching.

**Why this priority**: A project doesn't exist if it's not live. Production verification is the final hurdle.

**Independent Test**: Visit the live Vercel URL. Perform one "Happy Path" demo flow: Check stats → ask a question → see news update → zoom map.

**Acceptance Scenarios**:
1. **Given** the Vercel environment, **When** deployed, **Then** `vercel.json` ensures the chat route does not timeout (60s limit).
2. **Given** the production site, **When** loaded, **Then** it maintains the dark theme and responsive layout without SSR errors.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-401**: System MUST implement staggered CSS animations (`0.1s` increments) for dashboard panel entry.
- **FR-402**: System MUST add CSS pulse animations for `severity: high` markers on the `SafetyMap`.
- **FR-403**: System MUST implement global offline detection and a top-level "Offline" notification banner.
- **FR-404**: System MUST implement standardized Error/Empty states for `StatsCards`, `TrendChart`, `SafetyMap`, `ChatPanel`, and `NewsPanel`.
- **FR-405**: System MUST provide a "Retry" mechanism for AI chat failures.
- **FR-406**: System MUST create a comprehensive `README.md` with problem/solution/commercialization/attribution.
- **FR-407**: System MUST configure `vercel.json` with `maxDuration: 60` for AI routes.
- **FR-408**: System MUST style all scrollbars to be thin and dark-themed (`--border` color).
- **FR-409**: System MUST add teal "glow" focus effects to all interactive inputs.

### Key Entities

- **VisualPolish**: `animation-delay`, `keyframes`, `box-shadow` (glow), `scrollbar-width`.
- **ResilienceStates**: `Loading (Skeleton)`, `Error (Retry)`, `Empty (No Data)`.
- **ProductionConfig**: `vercel.json`, environment variables, build scripts.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-401**: All 5 panels reveal within 1 second of initial load.
- **SC-402**: Every component has a dedicated `ErrorState` sub-component verified by manual error injection.
- **SC-403**: `README.md` contains at least 500 words of "judge-ready" content.
- **SC-404**: Live Vercel URL loads in under 5 seconds on a standard 4G connection.
- **SC-405**: Zero unhandled promise rejections in the production console.
- **SC-406**: Mobile responsiveness verified on iPhone and Android viewport sizes.

---

## Assumptions

- Vercel is the chosen deployment platform.
- The user has a GitHub repository connected to Vercel.
- Environment variables will be manually added to the Vercel dashboard.
- Assets (screenshots) will be generated after Feature 3 is finalized and before Feature 4 completes.
