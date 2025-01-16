import { env } from "@/env";
import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import OpenAI from "openai";
import { db } from ".";
import { easyNoteCard } from "./schema";
import { cache } from "@/lib/cache";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const generateEmbedding = cache(
  async (value: string): Promise<number[]> => {
    const input = value.replaceAll("\n", " ");

    const { data } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });

    if (!data[0]?.embedding) {
      throw new Error("Failed to generate embedding");
    }

    return data[0].embedding;
  },
  ["embedding"],
  {
    revalidate: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
);

export const findSimilarFlashcards = cache(
  async (description: string) => {
    const embedding = await generateEmbedding(description);

    const similarity = sql<number>`1 - (${cosineDistance(easyNoteCard.embedding, embedding)})`;

    const similarGuides = await db
      .select({
        front: easyNoteCard.front,
        id: easyNoteCard.id,
        back: easyNoteCard.back,
        similarity,
      })
      .from(easyNoteCard)
      .where(gt(similarity, 0.5))
      .orderBy((t) => desc(t.similarity))
      .limit(20);

    return {
      cards: similarGuides,
    };
  },
  ["similarFlashcards"],
  {
    revalidate: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
);
export const findFlashcardStatic = cache(
  async (query: string) => {
    return await db
      .select()
      .from(easyNoteCard)
      .where(
        sql`to_tsvector('english', ${easyNoteCard.front}) @@ plainto_tsquery('english', ${query})`,
      );
  },
  ["findFlashcardStatic"],
  {
    revalidate: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
);

// Combined function to find similar and text-matched flashcards without duplicates
export const findCombinedFlashcards = cache(
  async (query: string) => {
    // Define similarity score computation

    // Execute full-text search query
    return await db
      .select({
        front: easyNoteCard.front,
        id: easyNoteCard.id,
        back: easyNoteCard.back,
      })
      .from(easyNoteCard)
      .where(
        sql`to_tsvector('english', ${easyNoteCard.front}) @@ plainto_tsquery('english', ${query})`,
      )
      .limit(20);
  },
  ["findCombinedFlashcards"], // Cache key
  {
    revalidate: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
);
