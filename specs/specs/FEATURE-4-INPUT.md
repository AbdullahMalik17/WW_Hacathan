# FEATURE-4-INPUT.md — Polish, Deploy & Demo Prep
# Use this as input for /sp.specify in Claude Code

## What to Run:
```
/sp.specify
```

## Then paste this description:

---

Feature: Polish, Deploy & Demo Preparation

Elevate SafeMGM from "working prototype" to "hackathon winner" with visual polish, bulletproof error handling, production deployment, and a rehearsed demo script.

**Visual Polish & Animations:**
Add CSS-only animations for page load: stagger-reveal each panel sequentially (stats → map → chat → news) using animation-delay increments of 0.1s. Each panel fades up from 20px below (opacity 0→1, translateY 20px→0). Stats card numbers should have a count-up feel (animate opacity). Chat messages slide in from left (AI) or right (user) with subtle fade. News cards fade in sequentially when loaded. Map markers for high-severity incidents should have a gentle CSS pulse animation. Add smooth custom scrollbar styling for chat and news panels (thin, matching the dark theme). Focus ring on chat input should glow teal. Card borders should have a subtle 1px glow at low opacity on hover.

**Error States & Edge Cases:**
Make every component bulletproof for live demo. Handle: Gemini API rate limits (show "SafeMGM is thinking... Please try again in a moment" with retry button), Bright Data unavailable (news panel shows "News temporarily unavailable" — chat continues working), map tiles fail (show a fallback message), empty data (each component has a clear "no data" empty state, not blank space), long AI responses (chat auto-scroll doesn't break), network offline (top banner "You're offline — some features may be limited"). Pattern: every component handles if (loading) return Skeleton; if (error) return ErrorState; if (empty) return EmptyState; return Content.

**README.md for Judges:**
Write a comprehensive README that sells the project to hackathon judges. Structure: project name with tagline, the problem (Montgomery residents can't access safety data), the solution (4 bullet points of what SafeMGM does), challenge track stated (Public Safety), data sources listed (Montgomery 911, Crime Stats, Crime Mapping, Bright Data news), tech stack listed, 2-3 screenshots, demo queries, commercialization section (city-agnostic SaaS, 3000+ US cities), built by Abdullah Malik with GitHub link, and "Powered by" section mentioning City of Montgomery, Bright Data, and Google Gemini prominently.

**Vercel Deployment:**
Deploy to Vercel. Push to GitHub, connect repo to Vercel. Add all environment variables (GOOGLE_GEMINI_API_KEY, BRIGHT_DATA_API_TOKEN, BRIGHT_DATA_SERP_ZONE) in Vercel dashboard. Create vercel.json with maxDuration: 60 for the chat API route. Verify: homepage loads with dark theme, map renders, chat streams, news fetches, stats display. Test on mobile browser. URL should be something like safemgm.vercel.app.

**Demo Script & Backup:**
The 4-minute demo flow:
- [0:00-0:30] Hook: "I'm Abdullah, this is SafeMGM. Montgomery publishes thousands of 911 records but nobody can make sense of them."
- [0:30-1:30] Live demo: Ask "What are the most dangerous areas in Montgomery?" — AI streams analysis with real data.
- [1:30-2:30] Bright Data showcase: Ask about safety near downtown, point to the News Panel updating with live scraped headlines.
- [2:30-3:30] Explore dashboard: Zoom into map, show stats, show trend chart.
- [3:30-4:00] Close: "SafeMGM works for any city with an open data portal. That's 3,000+ cities."
Record a backup demo video (screen recording + voiceover). Save demo queries on clipboard for quick paste.

User scenarios:
1. Page loads → panels animate in with staggered reveal, looks polished and intentional
2. AI is rate-limited → friendly retry message appears, no crash
3. Bright Data is down → news panel degrades gracefully, everything else works
4. Judge visits the live Vercel URL → page loads in under 5 seconds, all features work
5. Judge reads README → understands the problem, solution, and commercial potential in 60 seconds
6. Demo is presented → 4 pre-scripted queries execute flawlessly, map and charts are visually impressive

Acceptance criteria:
- Page load has visible stagger animation (not jarring)
- Every component handles loading, error, and empty states
- No unhandled promise rejections in browser console
- README covers problem, solution, tech stack, data sources, commercialization, Bright Data attribution
- App deployed to Vercel with all features working on live URL
- Chat streaming works on production
- Map renders on production (no SSR/hydration errors)
- News panel shows "Powered by Bright Data" on production
- Demo script rehearsed and backup video recorded
- No API keys or secrets in committed code
- Page loads under 5 seconds on production

---
