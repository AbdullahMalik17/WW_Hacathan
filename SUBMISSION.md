# SafeMGM Hackathon Submission Document

This document contains all the necessary information for the GenAI hackathon submission form.

## 🚀 Project Overview
**Project Name**: SafeMGM
**Tagline**: AI-Powered Public Safety Intelligence for Montgomery, AL.
**Live Demo URL**: [Insert Vercel URL here]
**GitHub Repository**: https://github.com/AbdullahMalik17/WW_Hacathan
**Video Demo Link**: [Insert YouTube/Loom Link here]

## 📝 Description
SafeMGM turns raw public safety records into a single, judge-ready dashboard you can query in plain English. It combines local 911 and crime datasets with an interactive safety map, trend analytics, and real-time news enrichment via Bright Data.

### The Problem
Cities publish important safety data as static CSV/GeoJSON files which are hard for citizens and community leaders to interpret quickly. There is often a gap between "historical data" and "what's happening right now."

### The Solution
SafeMGM bridges this gap by providing an AI Safety Analyst that citizens can query using natural language. It builds a bounded "AI context" from local datasets and enriches it with real-time news to provide comprehensive, data-cited answers.

## 🛠️ Tech Stack
- **AI Engine**: Google Gemini 2.5 Flash via Vercel AI SDK
- **Web Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Geospatial**: Leaflet + react-leaflet
- **Analytics**: Recharts
- **Data Enrichment**: Bright Data SERP API (Google News)
- **Deployment**: Vercel

## 💎 Bright Data Integration (3 Bonus Points)
SafeMGM uses the **Bright Data SERP API** to fetch real-time Google News results related to the user's safety queries. This ensures that the AI analyst isn't just relying on historical static data but can also provide context from the latest local news reports. 
- **Attribution**: The News Panel and the GitHub README prominently feature "Powered by Bright Data" branding.

## 📈 Scalability & Commercialization
SafeMGM uses a city-agnostic data pipeline. It can be scaled to any of the 3,000+ US cities that provide open data in CSV/GeoJSON formats. It has potential as a SaaS for municipal governments or as a safety-intelligence API for real estate and insurance platforms.

## 🎙️ Demo Script Summary
1. **Introduction**: Overview of the dashboard panels (Stats, Map, Trends, AI Terminal, News).
2. **AI Inquiry**: Ask "Any unusual spikes in 911 calls?" to show CSV data parsing.
3. **Geospatial Demo**: Zoom into the map to show severity-coded markers.
4. **Live Enrichment**: Ask about safety in a specific neighborhood to trigger the Bright Data News fetch.
5. **Reliability**: Mention the graceful fallbacks (Offline mode, Sample news, Static safety scores).

## 🧑‍💻 Built By
**Abdullah Malik**
- GitHub: AbdullahMalik17
- Email: [Insert Email]
