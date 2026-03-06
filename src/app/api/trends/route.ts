import { NextResponse } from "next/server";
import {
  load911Calls,
  loadCrimeStats,
  getMonthlyTrends
} from "@/lib/montgomery-data";

export async function GET() {
  try {
    const calls = load911Calls();
    const crimes = loadCrimeStats();
    
    const trends = getMonthlyTrends(calls, crimes);
    
    return NextResponse.json(trends);
  } catch (error) {
    console.error("Trends API error:", error);
    return NextResponse.json(
      { error: "Failed to load trend data" },
      { status: 500 }
    );
  }
}
