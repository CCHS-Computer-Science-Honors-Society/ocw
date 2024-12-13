import { findCombinedFlashcards } from "@/server/db/ai";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("q");
  if (!searchTerm?.length) {
    return Response.json([]);
  }

  const results = await findCombinedFlashcards(searchTerm);
  const response = Response.json(results ?? {});

  // cache for  1 month
  response.headers.set("Cache-Control", "public, max-age=2592000");
  return response;
}

export type Result = Awaited<ReturnType<typeof findCombinedFlashcards>>;
