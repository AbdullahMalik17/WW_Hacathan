# Architectural Plan: AI Engine & Bright Data Integration

This plan outlines the implementation of the AI intelligence layer for SafeMGM, integrating Google Gemini for analysis and Bright Data for real-time news context.

## 1. Scope & Dependencies

### In Scope
- Gemini API client and analyst persona implementation.
- Bright Data SERP API client for Montgomery news.
- Streaming chat API route integration with Vercel AI SDK.
- News API route with graceful degradation.
- Structured safety analysis generation.

### Out of Scope
- Frontend chat UI components (Feature 3).
- Fine-tuning models.
- Authentication for AI routes (hackathon context).

### External Dependencies
- Google Gemini API (`@ai-sdk/google`).
- Bright Data SERP API & Web Unlocker.
- Vercel AI SDK (`ai` package).

---

## 2. Key Decisions & Rationale

### Model Selection: Gemini 1.5 Flash
- **Decision**: Use `google('gemini-1.5-flash')` (or `gemini-2.0-flash` if available in the SDK) as the primary model.
- **Rationale**: Flash models offer lower latency and cost, which is ideal for streaming chat, while maintaining high performance for data analysis tasks.

### Real-time News: Bright Data SERP API
- **Decision**: Use Bright Data's SERP API instead of a general search API.
- **Rationale**: SERP API provides highly structured results (organic, news, knowledge graphs) which are easier to parse into `NewsArticle` objects compared to raw HTML.

### Graceful Degradation Strategy
- **Decision**: All external API calls (Bright Data, Gemini Fallbacks) will be wrapped in try/catch blocks.
- **Rationale**: The core chat functionality must remain available even if news enrichment fails.

---

## 3. Interfaces & API Contracts

### POST `/api/chat`
- **Input**: `{ messages: Message[] }` (Vercel AI SDK format).
- **Process**: 
  1. Extract latest message.
  2. Call `buildAIContext()` for data grounding.
  3. Call `fetchMontgomeryNews()` for news enrichment.
  4. Stream response via `streamText()`.
- **Output**: Streamed text response.

### GET `/api/news`
- **Input**: `q` (query string).
- **Output**: `200 OK` with `{ articles: NewsArticle[] }`.

---

## 4. Implementation Details

### `src/lib/gemini.ts`
- Create a `google` provider instance.
- Define `SAFE_MGM_SYSTEM_PROMPT`.
- Implement `analyzeData` (streaming) and `getStructuredAnalysis` (object/JSON).

### `src/lib/brightdata.ts`
- Implement `fetchMontgomeryNews(query)` using `https://api.brightdata.com/serp/req`.
- Implement query cleaning to remove noise from user messages before searching.
- Implement `scrapeWebPage(url)` via Web Unlocker.

---

## 5. Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Gemini API Rate Limit | High | Catch errors and return a user-friendly message; provide fallback to OpenAI if configured. |
| Bright Data API Timeout | Medium | Set short timeouts for news fetching (e.g., 3s) to ensure chat responsiveness. |
| Hallucination | High | Strict system prompt instructions to ONLY use provided data context for statistics. |

---

## 6. Definition of Done

- [ ] All functional requirements met.
- [ ] TypeScript compiles without errors.
- [ ] API routes verified with manual `curl`/`Postman` tests.
- [ ] Graceful fallback for missing API keys confirmed.
- [ ] PHR created for the implementation phase.
