import { NextRequest } from "next/server";

const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("placeId");

  if (!placeId) {
    return new Response("Missing placeId parameter", { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googlePlacesApiKey}&language=se`;

  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    console.error(
      `API call failed with status ${res.status} and status text ${res.statusText}`
    );
    return new Response(
      JSON.stringify({
        error: "Failed to fetch place details",
        status: res.status,
      }),
      {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
