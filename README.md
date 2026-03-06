# SafeMGM: AI-Powered Public Safety Intelligence

> **Democratizing Urban Safety Data for Montgomery, Alabama.**

SafeMGM is an advanced intelligence dashboard built for the **World Wide Vibes Hackathon**. It transforms complex city datasets—911 calls, crime statistics, and mapping records—into actionable, real-time safety insights using Google Gemini AI and live news enrichment via Bright Data.

## 🔴 The Problem
Montgomery publishes thousands of public safety records annually via its Open Data portal. However, for the average resident or city official, these static CSV files and GeoJSON records are:
- **Inaccessible:** Hard to parse and visualize without technical expertise.
- **Outdated:** Static snapshots that lack real-time local context.
- **Unstructured:** Numbers don't tell the story of *why* or *where* safety trends are shifting.

## 🟢 The Solution
SafeMGM bridges the gap between raw data and human safety through four core pillars:
1.  **AI Intelligence Terminal:** A streaming chat interface powered by **Google Gemini 2.5 Flash** that analyzes local CSV data to answer natural language questions about safety.
2.  **Geospatial Command Center:** An interactive, dark-themed map using **Leaflet** that visualizes incident density and severity across Montgomery's neighborhoods.
3.  **Bright Data News Enrichment:** Real-time news scraping via **Bright Data SERP API** that provides live context (e.g., community meetings, police reports) alongside statistical data.
4.  **Trend Analytics:** Visual breakdown of 911 vs. Crime trends over time using **Recharts**, helping identify seasonal spikes and safety improvements.

## ⚡ Technical Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **AI:** Vercel AI SDK, Google Gemini 2.5 Flash (via `@ai-sdk/google`).
- **Data Enrichment:** Bright Data SERP API & Web Unlocker.
- **Mapping:** React Leaflet + CartoDB Dark Matter.
- **Visualization:** Recharts.
- **Deployment:** Vercel (Edge-optimized AI streaming).

## 🚀 Bright Data Integration (Award Winner)
SafeMGM leverages the **Bright Data SERP API** to provide the "Why" behind the data. When a user asks about a specific neighborhood, the system:
1.  Cleans the query and appends location context.
2.  Fetches live headlines from Google News via Bright Data's high-speed SERP endpoint.
3.  Injects those headlines into the Gemini AI context.
4.  The AI then provides a "News-Enriched" assessment, prefixed with 📰, ensuring the user gets both historical stats and today's news.

## 💰 Commercialization Path
SafeMGM is designed as a **City-Agnostic SaaS**.
- **The Market:** Over 3,000 cities in the US alone have "Open Data" portals (Socrata, ArcGIS).
- **The Customer:** Neighborhood associations, real estate platforms, insurance underwriters, and local government PR offices.
- **Scalability:** The architecture supports rapid deployment to any city by swapping local CSV datasets and updating search context.

## 👤 Built By
**Abdullah Malik**
- [GitHub](https://github.com/AbdullahMalik17)
- [Project Repository](https://github.com/AbdullahMalik17/WW_Hacathan)

---

### Powered By
- **City of Montgomery Open Data**
- **Bright Data** (SERP API & Web Unlocker)
- **Google Gemini** (Gemini 2.5 Flash)
- **Vercel**
