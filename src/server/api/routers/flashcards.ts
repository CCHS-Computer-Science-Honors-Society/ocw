import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { findSimilarFlashcards } from "@/server/db/ai";

export const flashcardsRouter = createTRPCRouter({
  findSemanticlly: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return await findSimilarFlashcards(input.query);
    }),
});
