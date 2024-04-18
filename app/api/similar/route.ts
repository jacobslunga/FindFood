import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai_api_key = process.env.OPENAI_API_KEY;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return new Response("Missing query parameter", { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: openai_api_key,
  });
}
