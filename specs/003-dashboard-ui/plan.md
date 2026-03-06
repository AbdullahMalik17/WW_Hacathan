# Architectural Plan: Dashboard Frontend — Map, Chat, News, Stats & Charts

This plan outlines the frontend architecture for the SafeMGM dashboard, focusing on visual identity, responsive layout, and real-time AI/news integration.

## 1. Scope & Dependencies

### In Scope
- Layout implementation with CSS Grid in `src/app/page.tsx`.
- Dark theme styling and global CSS configuration.
- Shared dashboard state management (Query/Neighborhood/Filters).
- Leaflet-based interactive map for Montgomery safety data.
- Streaming chat interface with Vercel AI SDK.
- Real-time news panel fetching articles via Bright Data SERP API.
- Recharts implementation for public safety trends.

### Out of Scope
- Backend API implementation (covered in Feature 1 and 2).
- Multi-page routing (single-page dashboard only).
- User authentication.

### External Dependencies
- `react-leaflet` + `leaflet` for mapping.
- `ai` + `@ai-sdk/google` for streaming chat.
- `recharts` for charts.
- `lucide-react` for icons.
- `clsx` + `tailwind-merge` for utility styling.
- `shadcn/ui` components (already initialized).

---

## 2. Key Decisions & Rationale

### Responsive Grid Layout (CSS Grid)
- **Decision**: Use a three-column CSS Grid layout on desktop (`col-span-2`, `col-span-7`, `col-span-3`).
- **Rationale**: CSS Grid provides precise control over dashboard placement, allowing complex alignments while ensuring easy collapse into a single column for mobile.

### State Management: React useState
- **Decision**: Lift shared state (`activeQuery`, `selectedNeighborhood`, `filters`) to the top-level `page.tsx`.
- **Rationale**: Since the application is a single-page dashboard, native React state is sufficient for coordinating interactions between the Chat, Map, and News panels.

### Leaflet Hydration Fix (next/dynamic)
- **Decision**: Import `SafetyMap` using `next/dynamic` with `ssr: false`.
- **Rationale**: Leaflet depends on the `window` object, which is unavailable during SSR. Disabling SSR for the map component is standard practice to prevent hydration errors.

---

## 3. Interfaces & API Contracts

### `src/components/dashboard` Props
- `SafetyMap`: `data: MapPoint[]`, `onMarkerClick: (point: MapPoint) => void`.
- `ChatPanel`: `onQueryChange: (query: string) => void`.
- `NewsPanel`: `searchQuery: string`.
- `StatsCards`: `totalCalls: number`, `totalCrimes: number`, `topCrime: string`, `safetyScore: number`.
- `TrendChart`: `data: TrendDataPoint[]`.

---

## 4. Implementation Details

### `src/app/globals.css`
- Import Google Fonts: JetBrains Mono (400, 700) and Plus Jakarta Sans (400, 500, 700).
- Define CSS Variables for the "Command Center Noir" theme.
- Apply global defaults for dark mode and typography.

### `src/app/page.tsx`
- Implement the three-column grid.
- Fetch initial stats and chart data using `useEffect`.
- Coordinate state between Chat and News panels.

### `src/components/dashboard/SafetyMap.tsx`
- Setup Leaflet container with CartoDB dark matter tiles.
- Implement marker density clustering (using opacity) for密度 visualization.

---

## 5. Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Leaflet Hydration Mismatch | Medium | Strict use of dynamic imports and `ssr: false`. |
| Recharts Responsiveness | Low | Use `ResponsiveContainer` wrapper for all charts. |
| API Latency for News | Medium | Show skeleton loaders and ensure non-blocking fetch. |

---

## 6. Definition of Done

- [ ] All 5 dashboard panels visible and functional.
- [ ] Responsive design verified (Desktop grid, Mobile stack).
- [ ] "Command Center Noir" aesthetic applied via global CSS.
- [ ] Chat correctly updates the News panel state.
- [ ] TypeScript compiles without errors.
- [ ] Final PHR created.
