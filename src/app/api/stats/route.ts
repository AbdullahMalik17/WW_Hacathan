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
    
    // For Safety Score, we use the structured analysis from Gemini
    // We pass a summary context to get the score
    const context = buildAIContext();
    const analysis = await getStructuredAnalysis(context);
    
    return NextResponse.json({
      totalCalls,
      totalCrimes,
      topCrimeType,
      safetyScore: analysis?.safetyScore ?? 85, // Fallback score
      trendDirection: analysis?.trendDirection ?? "stable",
      summary: analysis?.summary ?? "Public safety in Montgomery remains stable based on recent data."
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard statistics" },
      { status: 500 }
    );
  }
}
