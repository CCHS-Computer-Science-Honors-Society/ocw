import { performSearch } from "@/server/api/scripts/search";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("q");
  if (!searchTerm?.length) {
    return Response.json([]);
  }

  const results = await performSearch(searchTerm);
  const response = Response.json(results ?? {});

  // cache for 10 minutes
  response.headers.set("Cache-Control", "public, max-age=600");
  return response;
}

export type Result = Awaited<ReturnType<typeof performSearch>>;
