import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai_api_key = process.env.OPENAI_API_KEY;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "No query provided" });
  }

  const openai = new OpenAI({
    apiKey: openai_api_key,
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to output JSON for the Google Places API.",
        },
        {
          role: "user",
          content: `Givet denna query: ${query}. Returnera ett JSON-objekt med true eller false i strukturen {is_valid_prompt: <true or false>}`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return NextResponse.json({
        error: "An error occurred while querying the OpenAI API",
      });
    }

    const is_valid_prompt = content.includes("true");

    return NextResponse.json({ is_valid_prompt });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while querying the OpenAI API",
    });
  }
}
