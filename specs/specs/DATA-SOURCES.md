# DATA-SOURCES.md — Montgomery Data & Bright Data Reference

## Montgomery Open Data Portal
**Portal URL:** https://opendata.montgomeryal.gov
**Platform:** ArcGIS Hub (migrated from Socrata in March 2025)
**Note:** The old data.montgomeryal.gov is dead. All data lives on opendata.montgomeryal.gov.

### Primary Datasets (Public Safety Track)

**911 Calls** — https://opendata.montgomeryal.gov/datasets/911-calls
Expected fields: Call type, date/time, lat/lng, priority, disposition, response unit.
Download format: CSV, GeoJSON. Also has ArcGIS REST API endpoint.

**Crime Statistics** — https://opendata.montgomeryal.gov/datasets/crime-statistics-2
Expected fields: Offense type, date, lat/lng, neighborhood/beat, case status.
Download format: CSV, GeoJSON.

**Crime Mapping** — https://opendata.montgomeryal.gov/datasets/crime-mapping
Expected fields: Incident type, coordinates, date, description (as GeoJSON features).
Download format: GeoJSON preferred for direct map overlay.

### Secondary Datasets (Enrichment)

**Business Licenses** — https://opendata.montgomeryal.gov/datasets/CityMGM::business-license-data-for-the-city-of-montgomery-al
**Building Permits** — https://opendata.montgomeryal.gov/datasets/building-permit-1
**Open Payroll** — https://opendata.montgomeryal.gov/datasets/CityMGM::open-payroll
**Flood Zones** — https://opendata.montgomeryal.gov/datasets/flood-zone-lookup
**Sanitation** — https://opendata.montgomeryal.gov/datasets/sanitation-schedules-and-information
**Fire/Police Stations** — Check under City Recreation / Public Safety datasets

### ArcGIS REST API Pattern
To query any dataset programmatically, find its Feature Service URL on the dataset page (click API), then:
```
GET {feature_service_url}/query?where=1=1&outFields=*&f=geojson&resultRecordCount=5000
```

### Fallback Strategy
Download CSV/GeoJSON files manually and commit to src/data/. For the hackathon demo, local files work perfectly. Mention "live ArcGIS API integration available" in pitch.

---

## Bright Data Integration (3 Bonus Points)

### Setup (5 minutes)
1. Sign up: https://brightdata.com/cp/start (free $5 credit, no card)
2. Create SERP API zone in dashboard
3. Copy API token and zone name to .env.local

### SERP API — Google News Search
```typescript
POST https://api.brightdata.com/serp/req
Headers: { "Authorization": "Bearer {token}", "Content-Type": "application/json" }
Body: {
  "zone": "{zone_name}",
  "query": "Montgomery Alabama crime safety",
  "search_engine": "google",
  "type": "news",
  "num": 5,
  "country": "us"
}
```

### Web Unlocker — Scrape Any Page
```typescript
POST https://api.brightdata.com/request
Headers: { "Authorization": "Bearer {token}", "Content-Type": "application/json" }
Body: {
  "zone": "web_unlocker1",
  "url": "https://example.com",
  "format": "raw",
  "data_format": "markdown"
}
```

### Integration Strategy for SafeMGM
1. **News Panel:** Fetch Google News for Montgomery safety topics via SERP API. Display in a dedicated sidebar with "Powered by Bright Data" attribution.
2. **AI Context Enrichment:** Include scraped news headlines in the Gemini system prompt alongside Montgomery data, so the AI can cross-reference patterns with actual news coverage.
3. **Attribution (MANDATORY):** Bright Data DevRel engineer Rafael Levi is a judge. Show "Powered by Bright Data" badge in the News Panel header AND footer. Mention Bright Data in README.
