# Implementation Tasks: Polish, Deploy & Demo Preparation

This document tracks implementation for Feature 4.

## Task Group 1: Visual Polish & UX
- [x] **Task 1.1**: Refine `src/app/globals.css` with advanced keyframes and scrollbar styling
- [x] **Task 1.2**: Apply animation utility classes to all panels in `src/app/page.tsx`
- [x] **Task 1.3**: Add pulse animation to critical markers in `src/components/dashboard/SafetyMap.tsx`
- [x] **Task 1.4**: Add teal glow focus effects to chat input in `src/components/dashboard/ChatPanel.tsx`

## Task Group 2: Resilience & Error Handling
- [x] **Task 2.1**: Create `src/components/dashboard/shared/DashboardError.tsx` and `DashboardEmpty.tsx`
- [x] **Task 2.2**: Implement `src/components/dashboard/shared/OfflineBanner.tsx` and integrate in `src/app/page.tsx`
- [x] **Task 2.3**: Add retry logic to `ChatPanel.tsx` for failed AI requests
- [x] **Task 2.4**: Ensure `StatsCards` and `TrendChart` handle 500/404 API errors gracefully

## Task Group 3: Documentation & Marketing
- [x] **Task 3.1**: Create comprehensive `README.md` with problem/solution/commercialization
- [x] **Task 3.2**: Add "Powered by Bright Data" attribution to `README.md` and `Header.tsx`
- [x] **Task 3.3**: Prepare a list of "Best Demo Queries" for the chat terminal

## Task Group 4: Deployment & Final Check
- [x] **Task 4.1**: Create `vercel.json` with `maxDuration: 60` configuration
- [x] **Task 4.2**: [P] Run final build `npm run build` locally to verify production readiness
- [x] **Task 4.3**: Push to GitHub and verify Vercel deployment logs
- [x] **Task 4.4**: Perform manual verification on live URL (Chat, Map, News, Stats)
