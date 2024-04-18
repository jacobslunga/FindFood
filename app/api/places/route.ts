import { NextRequest } from "next/server";

import "dotenv/config";

const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

function ranking(
  dist: number,
  rating: number,
  breakpoint: number = 1000,
  maxDist: number = 5000
): number {
  const normalizedRating = (rating - 1) / 4;
  let normalizedDistance;

  if (dist <= breakpoint) {
    normalizedDistance = 1;
  } else {
    normalizedDistance = 1 - (dist - breakpoint) / (maxDist - breakpoint);
  }

  const ratingWeight = 0.67;
  const distanceWeight = 0.33;

  const finalScore =
    normalizedRating * ratingWeight + normalizedDistance * distanceWeight;

  return finalScore;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const φ1 = (lat1 * Math.PI) / 180; // Convert degrees to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c * 100; // Convert to meters
  return distance;
}

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lng = req.nextUrl.searchParams.get("lng");
  const query = req.nextUrl.searchParams.get("q");

  if (!lat || !lng || !query) {
    return new Response(
      JSON.stringify({
        error: "Missing required query parameters",
      }),
      { status: 400 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&keyword=${encodeURIComponent(
    query
  )}&key=${googlePlacesApiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const placesData = await response.json();
    const places = placesData.results;

    const rankedPlaces = places.map((place: any) => {
      const dist = calculateDistance(
        parseInt(lat),
        parseInt(lng),
        place.geometry.location.lat,
        place.geometry.location.lng
      );
      const rank = ranking(dist, place.rating);

      let photoUrl = "";

      if (place.photos && place.photos.length > 0) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${googlePlacesApiKey}`;
      }

      return { ...place, distance: dist, rank, photoUrl };
    });

    const sortedPlaces = rankedPlaces.sort((a: any, b: any) => b.rank - a.rank);

    return new Response(JSON.stringify(sortedPlaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while querying the Google Maps API",
      }),
      { status: 500 }
    );
  }
}
