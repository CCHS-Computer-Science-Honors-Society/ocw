// src/server/api/routers/search.ts
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { performSearch } from "@/server/api/scripts/search";
import { TRPCError } from "@trpc/server";

// sanitizing search queries because tsvector throws errors with special characters
const searchQuerySchema = z
  .string()
  .min(1, "Search query must not be empty")
  .transform((query) => {
    // Remove special characters that could cause tsquery syntax errors
    return query
      .replace(/[!:&|()'"<>*]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  });

export const searchRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        q: searchQuerySchema,
      }),
    )
    .query(async ({ input }) => {
      try {
        // If after sanitization the query is empty, return empty results
        if (!input.q) {
          return { courses: [], units: [], lessons: [] };
        }

        const results = await performSearch(input.q);
        console.log(`Search results for ${input.q}:`, results);
        return results ?? { courses: [], units: [], lessons: [] };
      } catch (error) {
        console.error("Search error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to perform search",
          cause: error,
        });
      }
    }),
});
