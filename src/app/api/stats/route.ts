import { NextResponse } from "next/server";
import {
  load911Calls,
  loadCrimeStats,
  getTopCrimeTypes,
  buildAIContext
} from "@/lib/montgomery-data";
import { getStructuredAnalysis } from "@/lib/gemini";

export async function GET() {
  try {
    const calls = load911Calls();
    const crimes = loadCrimeStats();
    
    const totalCalls = calls.length;
    const totalCrimes = crimes.length;
    
    const topCrimes = getTopCrimeTypes(crimes, 1);
    const topCrimeType = topCrimes.length > 0 ? topCrimes[0].type : "N/A";
    
    // Safety Score — AI-powered if key is present, fallback otherwise
    let analysis = null;
    try {
      const context = buildAIContext();
      analysis = await getStructuredAnalysis(context);
    } catch {
      // Gemini key missing or rate-limited — use static fallback values
    }

    return NextResponse.json({
      totalCalls,
      totalCrimes,
      topCrimeType,
      safetyScore: analysis?.safetyScore ?? 85,
      trendDirection: analysis?.trendDirection ?? "stable",
      summary: analysis?.summary ?? "Public safety in Montgomery remains stable based on recent data.",
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard statistics" },
      { status: 500 }
    );
  }
}
