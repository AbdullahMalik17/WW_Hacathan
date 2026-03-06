# FEATURE-2-INPUT.md — AI Engine & Bright Data Integration
# Use this as input for /sp.specify in Claude Code

## What to Run:
```
/sp.specify
```

## Then paste this description:

---

Feature: AI Engine & Bright Data Integration

Build the AI intelligence layer for SafeMGM using Google Gemini 2.5 Flash as the primary model and Bright Data SERP API for real-time news enrichment.

**Gemini Integration (src/lib/gemini.ts):**
Create a Gemini API client with a carefully crafted system prompt. SafeMGM's AI persona is a professional-but-approachable public safety analyst for Montgomery. The system prompt must instruct the model to: always cite specific statistics from the provided data, include relevant news context (prefixed with a news emoji), give balanced assessments that don't cause undue alarm, never fabricate statistics, and end responses with actionable advice when appropriate. Create two functions: analyzeData() for general text responses, and getStructuredAnalysis() that returns JSON with safetyScore (1-100), topIncidentTypes, trendDirection (improving/worsening/stable), recentIncidentCount, summary, and recommendations.

**Streaming Chat API Route (src/app/api/chat/route.ts):**
This is the most critical endpoint. Create a POST route that: accepts messages array from the Vercel AI SDK useChat hook, extracts the latest user message, calls buildAIContext() from montgomery-data.ts to get relevant data, calls fetchMontgomeryNews() from brightdata.ts to get live news, then uses Vercel AI SDK's streamText() with @ai-sdk/google's google('gemini-2.5-flash-preview-05-20') model. The system prompt must include the SafeMGM persona, the data context, and the news context. Set maxDuration to 60 seconds for the route. Bright Data fetch must be wrapped in try/catch — if it fails, the chat continues without news context.

**Bright Data News Client (src/lib/brightdata.ts):**
Create a client that fetches Montgomery-related news using Bright Data's SERP API. The primary function fetchMontgomeryNews(query) should: POST to https://api.brightdata.com/serp/req with the user's query plus "Montgomery Alabama" appended, parse the response into NewsArticle[] (title, link, snippet, source, date), handle multiple response formats from SERP API (organic results, news_results, or arrays), and return an empty array (never throw) when the API is unavailable. Include a keyword extraction helper that removes stop words from user queries. Also create a scrapeWebPage(url) function using Web Unlocker for secondary use.

**News API Route (src/app/api/news/route.ts):**
Create a GET route that accepts a query parameter q and returns { articles: NewsArticle[] }. This route must always return 200 (never 500) — graceful degradation is critical because the News Panel depends on this endpoint.

User scenarios:
1. POST /api/chat with "What are the most common 911 calls?" → streams a response citing real Montgomery data
2. POST /api/chat with "Tell me about safety near downtown" → response includes both data analysis AND news context
3. GET /api/news?q=crime → returns structured news articles from Bright Data
4. Bright Data token is missing → chat still works, news panel shows empty state
5. Gemini API is rate-limited → returns a helpful error, not a crash

Acceptance criteria:
- POST /api/chat returns a streaming response (chunked, not one blob)
- AI responses reference actual Montgomery 911/crime data with specific statistics
- AI responses include news context when Bright Data is available
- GET /api/news returns NewsArticle[] with title, link, snippet, source, date
- All API routes return graceful errors (no stack traces, no 500s when possible)
- Bright Data integration uses real SERP API (not mocked) when configured
- Chat works without Bright Data configured (graceful fallback)
- maxDuration set to 60 for the chat route

---
