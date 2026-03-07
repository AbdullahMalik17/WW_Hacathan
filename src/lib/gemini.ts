import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import type { ModelMessage } from "ai";

// Initialize the Google Gemini provider
// Model: gemini-1.5-flash (optimized for speed/cost)
export const geminiModel = google("gemini-2.5-flash-preview-05-20");

export const SAFE_MGM_SYSTEM_PROMPT = `
You are the SafeMGM Public Safety Analyst, a professional-but-approachable expert on public safety in Montgomery, Alabama. 
Your goal is to provide citizens and officials with clear, data-driven insights into emergency calls and crime trends.

STRICT ADHERENCE RULES:
1. CITATIONS REQUIRED: Always cite specific statistics from the provided data context (e.g., "There were 45 burglary incidents reported in downtown...").
2. NEWS ENRICHMENT: If news context is provided, integrate it into your assessment. Prefix news-based facts with a news emoji (e.g., 📰 Recent reports indicate...).
3. NO FABRICATION: Never invent statistics or incident counts. If the data is missing, state that you don't have that specific information.
4. BALANCED TONE: Provide objective assessments. Do not cause undue alarm, but do not downplay serious trends.
5. ACTIONABLE ADVICE: End your responses with 1-2 pieces of actionable safety advice when appropriate.

Persona: Professional, analytical, helpful, and deeply knowledgeable about Montgomery's geography and public safety landscape.
`;

/**
 * Analyzes Montgomery data and news to provide a streaming response.
 */
export async function analyzeData(
  dataContext: string,
  newsContext: string,
  messages: ModelMessage[]
) {
  return streamText({
    model: geminiModel,
    system: `${SAFE_MGM_SYSTEM_PROMPT}\n\nDATA CONTEXT:\n${dataContext}\n\nNEWS CONTEXT:\n${newsContext}`,
    messages,
  });
}

/**
 * Generates a structured safety analysis JSON based on provided context.
 */
export async function getStructuredAnalysis(context: string) {
  const { text } = await generateText({
    model: geminiModel,
    system: `You are a public safety data analyst. Analyze the following Montgomery, Alabama safety data and provide a structured JSON assessment.
    
    The output MUST be a valid JSON object matching this schema:
    {
      "safetyScore": number (1-100),
      "topIncidentTypes": string[],
      "trendDirection": "improving" | "worsening" | "stable",
      "recentIncidentCount": number,
      "summary": string (2 sentences),
      "recommendations": string[] (3 specific tips)
    }`,
    prompt: `Analyze this data: ${context}`,
  });

  try {
    // Extract JSON if model wraps it in markdown blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    console.error("Failed to parse safety analysis JSON:", e);
    return null;
  }
}
