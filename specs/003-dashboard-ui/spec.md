# Feature Specification: Dashboard Frontend — Map, Chat, News, Stats & Charts

**Feature Branch**: `003-dashboard-ui`
**Created**: 2026-03-06
**Status**: Draft
**Input**: Build the complete SafeMGM dashboard interface following a "Command Center Noir" dark-themed aesthetic.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Dashboard Overview (Priority: P1)

A user opens the SafeMGM dashboard. All five panels (Map, Chat, News, Stats, Charts) are visible in a dark-themed grid layout. The map is centered on Montgomery, stats cards show real data, and the trend chart is rendered with teal and orange lines.

**Why this priority**: This is the primary UI entry point. It must be visually impactful and functional from the first load.

**Independent Test**: Visit localhost:3000. All 5 panels should be present and non-empty (or showing loading states). Verify the map is centered on [32.3668, -86.2999].

**Acceptance Scenarios**:
1. **Given** the app is running, **When** the page loads, **Then** a three-column grid layout is displayed on desktop.
2. **Given** the dashboard, **When** loading data, **Then** skeleton components are visible in all panels.
3. **Given** the map, **When** it initializes, **Then** it uses CartoDB dark matter tiles and shows markers for Montgomery incidents.

---

### User Story 2 — Interactive AI Chat & News Sync (Priority: P1)

A user types a question in the ChatPanel (e.g., "Tell me about safety near downtown"). The AI response streams in real-time, and the NewsPanel simultaneously refreshes to show recent news articles about "downtown Montgomery safety".

**Why this priority**: Demonstrates the core "AI + Data + News" integration which is the project's unique value.

**Independent Test**: Type a specific location in chat. Verify the AI response streams AND the NewsPanel's header or content updates to reflect that location.

**Acceptance Scenarios**:
1. **Given** the chat panel, **When** a user submits a message, **Then** the AI response is streamed with markdown formatting.
2. **Given** a chat message is sent, **When** the `onQueryChange` callback is triggered, **Then** the NewsPanel fetches new articles matching the user's query.
3. **Given** no messages, **When** the chat is empty, **Then** four suggested question chips are visible and clickable.

---

### User Story 3 — Responsive Design & Visual Identity (Priority: P2)

A user views the dashboard on a mobile device. The three-column grid automatically collapses into a single-column stacked layout that remains readable and functional.

**Why this priority**: Ensures the "Command Center" experience is available on mobile and follows constitutional design standards.

**Independent Test**: Resize browser to mobile width (< 1024px). Panels should stack vertically. Check `globals.css` for JetBrains Mono and Plus Jakarta Sans imports.

**Acceptance Scenarios**:
1. **Given** a mobile screen, **When** the dashboard renders, **Then** it uses a single-column layout.
2. **Given** the dashboard, **When** viewed, **Then** it follows the "Command Center Noir" color palette (near-black background, teal/orange/red accents).
3. **Given** stats and numbers, **When** displayed, **Then** they use JetBrains Mono typography.

---

### User Story 4 — Data Visualization & Map Interaction (Priority: P2)

A user clicks a marker on the SafetyMap. A popup appears showing incident details. The user also views the TrendChart to see how 911 calls compare to crime incidents over the last 12 months.

**Why this priority**: Provides the "deep dive" data exploration capability for city officials and residents.

**Independent Test**: Click a circle marker on the map to see a popup. Verify the TrendChart has two distinct data series (teal for 911, orange for crime).

**Acceptance Scenarios**:
1. **Given** the SafetyMap, **When** a marker is clicked, **Then** a popup displays the incident type and date.
2. **Given** the TrendChart, **When** hovering over the chart area, **Then** a tooltip shows exact counts for 911 calls and crime incidents.
3. **Given** the StatsCards, **When** crime incidents are displayed, **Then** a month-over-month change percentage is shown with a trend indicator.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-301**: System MUST implement a three-column responsive CSS Grid layout in `src/app/page.tsx`.
- **FR-302**: System MUST use CSS variables for the "Command Center Noir" color palette in `src/app/globals.css`.
- **FR-303**: System MUST implement `SafetyMap` component using `react-leaflet` with `next/dynamic` (`ssr: false`).
- **FR-304**: System MUST implement `ChatPanel` component using `useChat` hook and support suggested question chips.
- **FR-305**: System MUST implement `NewsPanel` component that updates its articles based on a `searchQuery` prop.
- **FR-306**: System MUST implement `StatsCards` component displaying Total 911 Calls, Crime Incidents, Top Crime Type, and Safety Score.
- **FR-307**: System MUST implement `TrendChart` component using `Recharts` showing 911 calls vs. crime incidents.
- **FR-308**: System MUST implement `Header` component with "Powered by Bright Data" branding.
- **FR-309**: System MUST manage `activeQuery` and `selectedNeighborhood` state at the page level for component interaction.
- **FR-310**: System MUST include skeleton loading states for all data-fetching components.
- **FR-311**: System MUST render AI chat responses with markdown support.
- **FR-312**: System MUST use JetBrains Mono for stats/numbers and Plus Jakarta Sans for body text.

### Key Entities

- **DashboardState**: `activeQuery: string`, `selectedNeighborhood: string | null`, `filters: DashboardFilters`.
- **ChartData**: `TrendDataPoint[]` (month, calls911, crimeIncidents).
- **StatsData**: `totalCalls: number`, `totalCrimes: number`, `topCrime: string`, `safetyScore: number`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-301**: Dashboard renders all 5 panels on the home page without runtime console errors.
- **SC-302**: Initial page load finishes in under 3 seconds on localhost.
- **SC-303**: Map correctly renders at least 50 markers from the Montgomery dataset.
- **SC-304**: Chat responses stream at a rate of at least 10 words per second.
- **SC-305**: News panel displays the "Powered by Bright Data" badge clearly (visible without scrolling).
- **SC-306**: Resizing the window to 375px wide results in a single-column layout with no horizontal overflow.
- **SC-307**: All 4 stats cards show non-zero numbers when valid data files are present.

---

## Assumptions

- The API routes `/api/data`, `/api/chat`, and `/api/news` are fully functional (implemented in Features 1 and 2).
- Font imports for JetBrains Mono and Plus Jakarta Sans are available via Google Fonts.
- The `react-leaflet` library is configured to work correctly with Next.js App Router using dynamic imports.
- Bright Data attribution is mandatory and must be visible in the Header and NewsPanel.
