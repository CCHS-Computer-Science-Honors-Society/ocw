import { env } from "@/env";
import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import OpenAI from "openai";
import { db } from ".";
import { easyNoteCard } from "./schema";
import { hard_cache } from "@/lib/cache";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const generateEmbedding = hard_cache(
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

export const findSimilarFlashcards = hard_cache(
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
