# QUICKSTART.md — SafeMGM 48-Hour Hackathon Playbook

## The Game Plan

You're building SafeMGM using **SpecifyPlus SDD** (Panaversity's Spec-Driven Development) with **Claude Code** as your AI orchestrator. Instead of vibe-coding features and hoping they work, you'll write specs first, let Claude Code plan and implement, and validate at each checkpoint. This approach is faster for a solo developer because you spend zero time debugging miscommunication with the AI.

The workflow for each feature is always the same:
```
/sp.specify → /sp.clarify → /sp.plan → /sp.tasks → /sp.implement → validate → commit
```

---

## Pre-Hackathon Setup (Do This Before the Clock Starts)

### 1. Install Tools (10 minutes)
```bash
# Install SpecifyPlus (requires Python 3.12+)
pip install specifyplus
# Verify
specifyplus --version

# Ensure Claude Code is installed
claude --version

# Ensure Node.js 20+ and npm are ready
node --version
npm --version

# Ensure Git is configured
git --version
```

### 2. Get API Keys (15 minutes)

**Google Gemini (PRIMARY AI — free):**
Go to https://aistudio.google.com → Click "Get API key" → Create key → Copy it.
Free tier gives 250 requests/day on Gemini 2.5 Flash, which is plenty.

**Bright Data (NEWS SCRAPING — 3 bonus points):**
Go to https://brightdata.com/cp/start → Sign up (free $5 credit, no credit card needed) → Dashboard → Create a "SERP API" zone → Copy your API token and the zone name.

**OpenAI (FALLBACK — optional):**
Go to https://platform.openai.com → API Keys → Create key → Copy it.
Only needed if Gemini gets rate-limited. Skip if you don't have credits.

### 3. Download Montgomery Data (20 minutes)
Open each URL in your browser and click "Download" → CSV (and GeoJSON where available):

1. **911 Calls:** https://opendata.montgomeryal.gov/datasets/911-calls
2. **Crime Stats:** https://opendata.montgomeryal.gov/datasets/crime-statistics-2
3. **Crime Mapping:** https://opendata.montgomeryal.gov/datasets/crime-mapping

Save these files somewhere accessible. You'll copy them into the project during Feature 1.

### 4. Clone and Initialize the Repo (5 minutes)
```bash
git clone https://github.com/AbdullahMalik17/WW_Hacathan.git
cd WW_Hacathan

# Initialize SpecifyPlus with Claude Code as the AI agent
specifyplus init . --ai claude --force

# This creates:
# .specify/         → memory, scripts, templates
# .claude/commands/  → /sp.* slash commands
# CLAUDE.md          → (we'll replace with our custom one)
```

### 5. Copy SafeMGM Project Files Into the Repo
Take the files from this specification package and place them in the repo:

```bash
# Replace the auto-generated CLAUDE.md with our custom one
cp safemgm-specs/CLAUDE.md ./CLAUDE.md

# Copy spec input files for reference
cp -r safemgm-specs/specs/*.md ./specs/
cp -r safemgm-specs/constitution-input/ ./constitution-input/

# Copy the data sources reference
cp safemgm-specs/specs/DATA-SOURCES.md ./specs/DATA-SOURCES.md
```

Your repo should now look like:
```
WW_Hacathan/
├── CLAUDE.md                          # Custom project intelligence
├── .specify/                          # SpecifyPlus core (auto-generated)
│   ├── memory/constitution.md         # Will be filled by /sp.constitution
│   ├── scripts/bash/                  # SDD automation scripts
│   └── templates/                     # Spec/plan/task templates
├── .claude/commands/                  # /sp.* slash commands (auto-generated)
├── specs/                             # Our feature input files + SDD specs
│   ├── FEATURE-1-INPUT.md
│   ├── FEATURE-2-INPUT.md
│   ├── FEATURE-3-INPUT.md
│   ├── FEATURE-4-INPUT.md
│   └── DATA-SOURCES.md
├── constitution-input/
│   └── CONSTITUTION-INPUT.md          # Input for /sp.constitution
└── (rest will be created during development)
```

### 6. Create .env.local
```bash
# Create environment variables file
cat > .env.local << 'EOF'
GOOGLE_GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
BRIGHT_DATA_API_TOKEN=your_token_here
BRIGHT_DATA_SERP_ZONE=your_zone_name_here
EOF
```

---

## Hour 0: START THE CLOCK

### Step 1: Launch Claude Code and Set the Constitution (15 minutes)
```bash
cd WW_Hacathan
claude
```

Inside Claude Code, run:
```
/sp.constitution
```

When prompted, paste the FULL content from `constitution-input/CONSTITUTION-INPUT.md`. This establishes the immutable project principles that Claude Code will follow for every feature — tech stack, design standards, error handling patterns, hackathon rules.

After Claude Code generates the constitution, **review it** in `.specify/memory/constitution.md`. Make sure it captured: the dark theme requirement, TypeScript strict mode, Bright Data mandatory integration, graceful degradation patterns, and the "build for demo" principle.

Then commit:
```bash
git add -A && git commit -m "chore: initialize SpecifyPlus with SafeMGM constitution"
```

---

### Step 2: Feature 1 — Foundation & Data Pipeline (Hours 0–4)

Open `specs/FEATURE-1-INPUT.md`, copy the description section, and run the SDD cycle:

```
/sp.specify
```
→ Paste the description from FEATURE-1-INPUT.md. Claude Code generates `specs/001-foundation-data/spec.md`.

```
/sp.clarify
```
→ Let Claude Code identify ambiguities. Answer any questions it asks (likely about exact CSV column names — tell it to use the downloaded files and adapt the types to match).

```
/sp.plan
```
→ Claude Code creates an implementation plan at `specs/001-foundation-data/plan.md`. Review it. Make sure it includes: Next.js init, all npm installs, shadcn/ui setup, data loading library, types, and the /api/data route.

```
/sp.tasks
```
→ Claude Code breaks the plan into atomic tasks in `specs/001-foundation-data/tasks.md`.

```
/sp.implement
```
→ Claude Code starts executing tasks one by one. **Validate at each checkpoint:**
- After Next.js init: Does `npm run dev` work?
- After data library: Do the CSV files load correctly?
- After API route: Does `curl localhost:3000/api/data?dataset=911` return data?

**IMPORTANT:** When Claude Code needs the Montgomery data files, copy them into `src/data/`:
```bash
cp ~/Downloads/911-calls.csv src/data/
cp ~/Downloads/crime-stats.csv src/data/
cp ~/Downloads/crime-mapping.geojson src/data/
```

After all tasks pass, commit:
```
/sp.git.commit_pr
```
Or manually: `git add -A && git commit -m "feat: Feature 1 — foundation, data pipeline, base API"`

**Milestone Check (Hour 4):** `npm run dev` starts, `/api/data?dataset=911` returns real data. ✅

---

### Step 3: Feature 2 — AI Engine & Bright Data (Hours 4–10)

Open `specs/FEATURE-2-INPUT.md`, copy the description, and repeat the SDD cycle:

```
/sp.specify   → paste Feature 2 description
/sp.clarify   → resolve ambiguities
/sp.plan      → review implementation plan
/sp.tasks     → review task breakdown
/sp.implement → execute with checkpoint validation
```

**Checkpoint validations during implementation:**
- After gemini.ts: Can you call the Gemini API and get a response?
- After brightdata.ts: Does `fetchMontgomeryNews("crime")` return articles?
- After /api/chat: Does POST with a message return a streaming response?
- After /api/news: Does GET with a query return articles?

**Test the full pipeline:**
```bash
# Test data endpoint
curl http://localhost:3000/api/data?dataset=911&limit=5

# Test news endpoint
curl http://localhost:3000/api/news?q=Montgomery+crime

# Test chat endpoint (streaming)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What are the most common 911 calls?"}]}'
```

Commit: `git add -A && git commit -m "feat: Feature 2 — AI engine, streaming chat, Bright Data"`

**Milestone Check (Hour 10):** Chat streams data-grounded AI responses, news endpoint returns articles. ✅

---

### Step 4: SLEEP (Hours 10–16)
This is non-negotiable. Set an alarm for 6 hours from now. Sleep deprivation makes you 3x slower and your code 3x buggier. The remaining features (frontend + polish) require creative thinking, which is the first casualty of sleep deprivation.

---

### Step 5: Feature 3 — Dashboard Frontend (Hours 16–30)

This is the longest and most visual feature. Open `specs/FEATURE-3-INPUT.md` and run:

```
/sp.specify   → paste Feature 3 description (it's long — that's fine)
/sp.clarify   → important here: clarify the layout grid breakpoints and component interaction
/sp.plan      → review carefully: this plan should create 5 components + layout
/sp.tasks     → should have 8-12 atomic tasks
/sp.implement → execute with checkpoint validation after each component
```

**Checkpoint validations:**
- After globals.css + layout: Dark theme renders, fonts load
- After SafetyMap: Map shows Montgomery with dark tiles (no SSR crash)
- After ChatPanel: Can type and submit messages, AI streams back
- After NewsPanel: Articles display, "Powered by Bright Data" visible
- After StatsCards: 4 cards with real numbers
- After TrendChart: Two-line chart renders with dark theme
- After page.tsx wiring: All panels visible, chat updates news panel

Commit: `git add -A && git commit -m "feat: Feature 3 — full dashboard with map, chat, news, charts"`

**Milestone Check (Hour 30):** Full dark dashboard visible with all 5 panels working. ✅

---

### Step 6: Feature 4 — Polish & Deploy (Hours 30–44)

Open `specs/FEATURE-4-INPUT.md` and run the final SDD cycle:

```
/sp.specify   → paste Feature 4 description
/sp.clarify   → quick pass
/sp.plan      → review: should cover animations, error states, README, Vercel deploy
/sp.tasks     → should have 6-8 tasks
/sp.implement → execute
```

**Key validation points:**
- Animations: Page load stagger looks polished, not jarring
- Error states: Temporarily remove API keys — does the app still load without crashing?
- README: Covers all judging criteria (relevance, quality, originality, social value, commercialization)
- Deploy: Push to GitHub → connect to Vercel → add env vars → verify live URL

Commit: `git add -A && git commit -m "feat: Feature 4 — polish, deploy, demo ready"`
Final: `git add -A && git commit -m "chore: SafeMGM v1.0 — World Wide Vibes Hackathon submission"`

**Milestone Check (Hour 44):** Live URL works, all features function on production. ✅

---

### Step 7: Demo Prep (Hours 44–48)

- Rehearse the 4-minute demo script 3 times
- Pre-load demo queries on clipboard
- Record backup demo video (screen recording + voiceover)
- Test live URL on a different device/browser
- Submit

---

## Emergency Playbook

**"Gemini API is rate-limited!"**
→ In `/api/chat/route.ts`, switch from `google('gemini-2.5-flash-preview-05-20')` to `openai('gpt-4o')`. Both work with Vercel AI SDK's `streamText`.

**"Bright Data isn't returning results!"**
→ The news panel gracefully degrades to empty. For the demo, pre-cache 5 news results in a local JSON file and fall back to that.

**"Montgomery data files are empty or broken!"**
→ Create realistic sample data (200+ rows) with matching column names. Document this in DECISIONS.md.

**"Vercel deployment fails!"**
→ Check: env vars set? maxDuration: 60 configured? Dynamic import for Leaflet (no SSR)? Run `npm run build` locally first.

**"Running out of time — what's the MVP?"**
→ Chat + Map + Stats Cards. These three alone are a submittable project. News panel and trend chart are bonus polish. Cut Feature 4 animations if needed.

---

## Submission Checklist

Before submitting, verify ALL of these:

- [ ] GitHub repo is public with clean commit history
- [ ] README.md covers problem, solution, tech stack, data sources, Bright Data, commercialization
- [ ] Live Vercel URL works with all features
- [ ] Chat streams AI responses grounded in Montgomery data
- [ ] Map shows Montgomery with data overlay
- [ ] News panel shows "Powered by Bright Data" badge
- [ ] No API keys in committed code (.env.local gitignored, .env.example committed)
- [ ] Demo video recorded as backup
- [ ] Demo queries saved on clipboard
- [ ] Constitution and specs committed in .specify/ and specs/ directories
