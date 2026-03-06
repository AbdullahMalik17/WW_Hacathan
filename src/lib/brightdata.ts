import "server-only";
import { NewsArticle } from "@/types";

const BRIGHT_DATA_API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN;
const BRIGHT_DATA_SERP_ZONE = process.env.BRIGHT_DATA_SERP_ZONE;

/**
 * Fetches real-time news about Montgomery, Alabama using Bright Data SERP API.
 */
export async function fetchMontgomeryNews(query: string): Promise<NewsArticle[]> {
  if (!BRIGHT_DATA_API_TOKEN || !BRIGHT_DATA_SERP_ZONE) {
    console.warn("Bright Data credentials missing. Skipping news fetch.");
    return [];
  }

  try {
    const cleanedQuery = cleanSearchQuery(query);
    
    const response = await fetch("https://api.brightdata.com/serp/req", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BRIGHT_DATA_API_TOKEN}`
      },
      body: JSON.stringify({
        zone: BRIGHT_DATA_SERP_ZONE,
        url: `https://www.google.com/search?q=${encodeURIComponent(cleanedQuery)}&tbm=nws`
      }),
      // Set a reasonable timeout for news fetching
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`Bright Data API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // Bright Data SERP API can return results in different fields depending on the parser
    const results = data.news_results || data.organic || [];
    
    return results.map((item: any) => ({
      title: item.title || item.text || "Untitled",
      link: item.link || item.url || "#",
      snippet: item.snippet || item.description || "",
      source: item.source || "Local News",
      date: item.date || "Recent"
    })).slice(0, 5); // Return top 5 articles

  } catch (error) {
    console.error("Error fetching news from Bright Data:", error);
    // T013: Graceful degradation - return empty array instead of throwing
    return [];
  }
}

/**
 * Scrapes a specific webpage using Bright Data Web Unlocker.
 */
export async function scrapeWebPage(url: string): Promise<string> {
  if (!BRIGHT_DATA_API_TOKEN) return "";

  try {
    const response = await fetch("https://api.brightdata.com/web-unlocker/req", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BRIGHT_DATA_API_TOKEN}`
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) return "";
    return await response.text();
  } catch (error) {
    console.error("Web Unlocker scrape failed:", error);
    return "";
  }
}

/**
 * Extracts key terms from a user query and appends Montgomery location context.
 */
export function cleanSearchQuery(query: string): string {
  // Simple keyword extraction: remove common stop words and add location
  const stopWords = ["what", "is", "tell", "me", "about", "the", "near", "in", "of", "and", "a", "to"];
  const words = query.toLowerCase().split(/\s+/);
  const keywords = words.filter(w => !stopWords.includes(w) && w.length > 2);
  
  const baseQuery = keywords.length > 0 ? keywords.join(" ") : query;
  return `${baseQuery} Montgomery Alabama news`;
}
