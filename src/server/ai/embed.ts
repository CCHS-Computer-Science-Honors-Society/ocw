import { embed } from "ai";
import { sql, gt, cosineDistance, desc } from "drizzle-orm";
import { db } from "../db";
import { easyNoteCard } from "../db/schema";
import { openai } from "@ai-sdk/openai";
export const MODEL = openai.embedding("text-embedding-3-small");
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: MODEL,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    easyNoteCard.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({
      front: easyNoteCard.front,
      back: easyNoteCard.back,
      options: easyNoteCard.options,
      similarity,
    })
    .from(easyNoteCard)
    .where(gt(similarity, 0.3))
    .orderBy((t) => desc(t.similarity))
    .limit(10);
  return similarGuides;
};

export type RelevantContent = Awaited<ReturnType<typeof findRelevantContent>>;
