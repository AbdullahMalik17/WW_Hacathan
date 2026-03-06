# Implementation Tasks: Dashboard Frontend — Map, Chat, News, Stats & Charts

This document tracks implementation for Feature 3.

## Task Group 1: Global Styles & Layout
- [x] **Task 1.1**: Update `src/app/globals.css` with Google Fonts and CSS Variables
- [x] **Task 1.2**: Create `src/components/layout/Header.tsx` with logo and attribution
- [x] **Task 1.3**: Implement responsive grid layout in `src/app/page.tsx`
- [x] **Task 1.4**: Manage shared dashboard state in `src/app/page.tsx`

## Task Group 2: Core Panels Implementation
- [x] **Task 2.1**: Implement `StatsCards` in `src/components/dashboard/StatsCards.tsx`
- [x] **Task 2.2**: Implement `TrendChart` in `src/components/dashboard/TrendChart.tsx` using Recharts
- [x] **Task 2.3**: Implement `NewsPanel` in `src/components/dashboard/NewsPanel.tsx` with Bright Data branding
- [x] **Task 2.4**: Implement `ChatPanel` in `src/components/dashboard/ChatPanel.tsx` with streaming messages and suggested chips
- [x] **Task 2.5**: [P] Create skeleton loaders for all panels in `src/components/dashboard/`

## Task Group 3: Mapping & Visualization
- [x] **Task 3.1**: Create `SafetyMap` skeleton in `src/components/dashboard/SafetyMap.tsx`
- [x] **Task 3.2**: Configure Leaflet dynamic import and CartoDB dark matter tiles
- [x] **Task 3.3**: Render circle markers with type-based density and tooltips on the map
- [x] **Task 3.4**: Integrate map with neighborhood selection state

## Task Group 4: Integration & UX
- [x] **Task 4.1**: Link `ChatPanel` query changes to `NewsPanel` refresh
- [x] **Task 4.2**: Verify markdown rendering for AI messages in `ChatPanel`
- [x] **Task 4.3**: Ensure responsive stacking on mobile screens
- [x] **Task 4.4**: Final type verification and build check
