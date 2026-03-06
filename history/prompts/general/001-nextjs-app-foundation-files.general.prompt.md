---
id: 001
title: Next.js App Foundation Files
stage: general
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: unknown
command: write three Next.js app files for SafeMGM
labels: ["nextjs","css","layout","foundation","safemgm"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/app/globals.css
  - src/app/layout.tsx
  - src/app/page.tsx
tests:
  - none
---

## Prompt

You are implementing part of the SafeMGM project — an AI-powered public safety dashboard for Montgomery, Alabama. Your job is to create three Next.js app files. Write the files exactly as specified.

FILE 1: src/app/globals.css — Import Google Fonts and define all CSS variables per SafeMGM's "Command Center Noir" design system.
FILE 2: src/app/layout.tsx — Root layout with Google Fonts via next/font and metadata.
FILE 3: src/app/page.tsx — Minimal Server Component placeholder (will be replaced in Feature 3).

## Response snapshot

Created all three files exactly as specified:
- /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/globals.css — CSS variables (--bg-primary, --accent-primary, etc.), Tailwind directives, custom scrollbar, fadeSlideUp animation, .animate-panel classes.
- /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/layout.tsx — Plus_Jakarta_Sans and JetBrains_Mono via next/font/google, metadata for SafeMGM, RootLayout with font variables applied to <html>.
- /mnt/e/WEB DEVELOPMENT/WW_Hacathan/src/app/page.tsx — Minimal Home Server Component centered on screen with SafeMGM branding, using CSS variables inline.

## Outcome

- Impact: Establishes the visual foundation (design tokens, fonts, global styles) and Next.js app shell for the SafeMGM dashboard.
- Tests: none
- Files: src/app/globals.css, src/app/layout.tsx, src/app/page.tsx
- Next prompts: Feature 3 dashboard implementation will replace page.tsx with the full command center UI.
- Reflection: All three files written exactly as specified with no deviations.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Verify fonts load correctly in browser after `npm run dev`.
