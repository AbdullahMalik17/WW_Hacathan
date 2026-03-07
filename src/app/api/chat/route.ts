import { convertToModelMessages } from "ai";
import type { UIMessage } from "ai";
import { analyzeData } from "@/lib/gemini";
import { buildAIContext } from "@/lib/montgomery-data";
import { fetchMontgomeryNews } from "@/lib/brightdata";

export const maxDuration = 60;

export async function POST(request: Request): Promise<Response> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "AI service is not configured. Add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = (await request.json()) as { messages: UIMessage[] };
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build Montgomery data context
    const dataContext = buildAIContext();

    // Fetch live news — graceful degradation if Bright Data unavailable
    let newsContext = "No live news context available at this time.";
    try {
      const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
      const query = lastUserMessage
        ? lastUserMessage.parts
            .filter((p): p is { type: "text"; text: string } => p.type === "text")
            .map((p) => p.text)
            .join(" ")
        : "Montgomery Alabama safety";

      const articles = await fetchMontgomeryNews(query);
      if (articles.length > 0) {
        newsContext =
          "RECENT NEWS HEADLINES:\n" +
          articles
            .map((a) => `- ${a.title} (${a.source}, ${a.date}): ${a.snippet}`)
            .join("\n");
      }
    } catch {
      // Bright Data unavailable — chat continues without news
    }

    // Convert UIMessages to ModelMessages for Gemini
    const modelMessages = await convertToModelMessages(messages);

    // Stream response via Gemini
    const result = await analyzeData(dataContext, newsContext, modelMessages);

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    return new Response(
      JSON.stringify({
        error: "SafeMGM is currently thinking... Please try again in a moment.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
