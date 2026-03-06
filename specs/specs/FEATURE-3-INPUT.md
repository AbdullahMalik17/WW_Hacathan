# FEATURE-3-INPUT.md — Dashboard Frontend
# Use this as input for /sp.specify in Claude Code

## What to Run:
```
/sp.specify
```

## Then paste this description:

---

Feature: Dashboard Frontend — Map, Chat, News, Stats & Charts

Build the complete SafeMGM dashboard interface following a "Command Center Noir" dark-themed aesthetic. This is a single-page application with five interconnected panels arranged in a responsive CSS Grid layout.

**Design Direction:**
Dark intelligence dashboard inspired by Bloomberg Terminal meets urban safety ops center. Color palette uses CSS variables: --bg-primary #0a0a0f (near-black), --bg-secondary #12121a (cards), --bg-tertiary #1a1a2e (hover), --accent-primary #00d4aa (teal for safety), --accent-warning #ff6b35 (orange alerts), --accent-danger #ef4444 (red critical), --text-primary #e4e4e7, --text-secondary #71717a, --border #27272a. Typography: JetBrains Mono for stats/numbers, Plus Jakarta Sans for body text (both from Google Fonts). Import these in globals.css.

**Layout (src/app/page.tsx):**
Three-column responsive grid. Left column (col-span-2): StatsCards stacked above TrendChart. Center column (col-span-7): SafetyMap above ChatPanel. Right column (col-span-3): NewsPanel full height. On mobile (below lg breakpoint): single column, stacked vertically. The page is a client component that manages shared state: activeQuery (string) updates the NewsPanel when chat sends messages, and selectedNeighborhood (string | null) for map-chat interaction.

**Component 1 — SafetyMap (src/components/dashboard/SafetyMap.tsx):**
Client component using react-leaflet. CRITICAL: Must be dynamically imported with next/dynamic and ssr: false to prevent hydration errors. Uses CartoDB dark matter tiles (https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png). Centered on Montgomery at [32.3668, -86.2999] zoom 12. Renders 911/crime data as CircleMarker components with colors by incident type and low opacity to create a density effect. Clicking a marker shows a popup with incident details. Map fills its grid area responsively. Include zoom controls.

**Component 2 — ChatPanel (src/components/dashboard/ChatPanel.tsx):**
Client component using Vercel AI SDK's useChat hook pointed at /api/chat. Shows a scrollable message list with auto-scroll to bottom. User messages right-aligned with teal accent background, AI messages left-aligned with dark card background. When chat is empty, show 4 suggested question chips: "What are the most dangerous areas in Montgomery?", "Tell me about safety near downtown", "Any unusual spikes in 911 calls?", "Compare crime rates across neighborhoods". Clicking a chip fills and submits it. Input field at the bottom with ghost text "Ask SafeMGM about Montgomery safety..." and a teal send button. Show pulsing dots while AI is streaming. AI text renders with markdown formatting (bold, bullets, headings). When the user sends a message, also call the onQueryChange callback prop to update the News Panel's search query.

**Component 3 — NewsPanel (src/components/dashboard/NewsPanel.tsx):**
Client component that fetches /api/news?q={searchQuery} on mount and whenever searchQuery prop changes. Displays news articles as a scrollable card list. Each card shows: headline (bold, clickable, opens in new tab), source + date (muted text), snippet (2-3 lines truncated). Panel header: "📰 Live News" with a "Powered by Bright Data" badge prominently displayed. Panel footer: "Real-time news via Bright Data SERP API". Shows skeleton loading cards during fetch. Shows "No recent news found" empty state gracefully. Maximum 5 articles displayed.

**Component 4 — StatsCards (src/components/dashboard/StatsCards.tsx):**
Client component showing 4 stat cards using shadcn Card component. Cards display: Total 911 Calls (number in JetBrains Mono), Crime Incidents (with month-over-month change percentage), Top Crime Type (most frequent), and Safety Score (AI-computed 1-100). Each card has: large stat number, descriptive label, trend indicator (up/down arrow with green/red), and a subtle glow effect on hover (box-shadow with accent color). Shows skeleton loading while data loads.

**Component 5 — TrendChart (src/components/dashboard/TrendChart.tsx):**
Client component using Recharts AreaChart. Shows monthly trends with two data series: 911 Calls (teal line with gradient fill) and Crime Incidents (orange line with gradient fill). Dark theme: dark grid lines (#27272a), light text labels. Responsive to container size. Tooltip on hover showing exact numbers per month. X-axis shows months, Y-axis shows incident count.

**Header (src/components/layout/Header.tsx):**
App header showing SafeMGM logo/text on the left, "Powered by Bright Data" badge in center, and "Montgomery, AL" with a shield icon on the right. Dark background with subtle bottom border.

User scenarios:
1. Dashboard loads → all 5 panels visible, map centered on Montgomery, stats cards showing data
2. User types a question in chat → AI streams response, news panel refreshes with relevant articles
3. User clicks a suggested question chip → question auto-submits, AI responds
4. User hovers a map marker → popup shows incident details
5. News panel shows "Powered by Bright Data" badge clearly visible
6. On mobile → panels stack vertically in readable order
7. While data loads → skeleton loading states visible in all panels

Acceptance criteria:
- Dashboard renders all 5 panels without console errors
- Map shows Montgomery with dark tiles and data markers (no SSR errors)
- Chat streams AI responses in real-time with proper message styling
- News panel displays articles with Bright Data attribution clearly visible
- Stats cards show real data with trend indicators
- Trend chart renders two data series with dark theme
- Three-column grid on desktop, single column on mobile
- All panels have loading skeleton states
- Chat suggested questions work (click to fill + submit)
- Page loads in under 3 seconds on localhost

---
