# Architectural Plan: Polish, Deploy & Demo Preparation

This plan details the final steps to elevate SafeMGM for the hackathon submission, focusing on visual fidelity, resilience, and production readiness.

## 1. Scope & Dependencies

### In Scope
- Global CSS animations and scrollbar styling.
- Standardized Error/Empty state components.
- Global offline detection and banner.
- AI chat retry logic.
- README.md creation with full project context.
- Vercel deployment configuration (`vercel.json`).

### Out of Scope
- New functional features.
- CI/CD pipeline beyond Vercel defaults.

### External Dependencies
- `vercel` CLI or dashboard for deployment.
- Lucide-react for error/offline icons.

---

## 2. Key Decisions & Rationale

### CSS-Only Animations
- **Decision**: Use CSS `@keyframes` and `animation-delay` instead of a heavy animation library (like Framer Motion).
- **Rationale**: Keeps the bundle size small and performance high for the initial 3-second load target.

### Error Pattern: `if (error) return <ErrorState />`
- **Decision**: Implement a reusable `DashboardError` component that accepts a "retry" callback.
- **Rationale**: Ensures consistent UX across all 5 panels when APIs fail.

### Vercel `maxDuration` Config
- **Decision**: Add `vercel.json` with `maxDuration: 60` for the chat route.
- **Rationale**: Streaming AI responses often exceed the 10s default limit on Vercel's hobby tier.

---

## 3. Implementation Details

### `src/app/globals.css` Refinement
- Add `@keyframes fadeSlideUp` and `pulseGlow`.
- Add utility classes `.animate-stagger-[1-5]`.
- Style `::-webkit-scrollbar` for the entire dashboard.

### Resilience Components (`src/components/dashboard/shared`)
- `DashboardError.tsx`: With "Retry" button.
- `DashboardEmpty.tsx`: With "No data available" message.
- `OfflineBanner.tsx`: Sticky banner using `window.onLine` state.

### `README.md` Structure
1. **SafeMGM** (Tagline)
2. **The Problem** (Public access to safety data)
3. **The Solution** (AI Insights + Mapping + News)
4. **Bright Data Integration** (The "Latest GenAI" component)
5. **Tech Stack**
6. **Commercialization**
7. **Attribution**

---

## 4. Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Vercel Deployment Fail | High | Perform a test deployment early; verify logs immediately. |
| Gemini Rate Limits | Medium | Cache responses or provide clear "system busy" messaging. |
| Map Hydration Issues | Medium | Re-verify `ssr: false` settings on production build. |

---

## 5. Definition of Done

- [ ] Page load sequence is animated and smooth.
- [ ] Offline banner appears when network is disconnected.
- [ ] All components handle errors gracefully with retry options.
- [ ] `README.md` is complete and judge-ready.
- [ ] App is live on Vercel with all features functional.
- [ ] No secrets leaked in repository history.
