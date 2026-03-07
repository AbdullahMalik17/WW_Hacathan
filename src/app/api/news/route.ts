import { NextResponse } from "next/server";
import { fetchMontgomeryNews } from "@/lib/brightdata";

export async function GET(request: Request): Promise<NextResponse> {
  // Always return 200 — graceful degradation is critical for the News Panel
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "Montgomery Alabama public safety";

    const articles = await fetchMontgomeryNews(query);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("[/api/news] Error:", error);
    // Return empty articles instead of 500 so the News Panel degrades gracefully
    return NextResponse.json({ articles: [] });
  }
}
