import { embed, embedMany } from "ai";
import { eq, sql, gt, cosineDistance, desc } from "drizzle-orm";
import { db } from "../db";
import { easyNoteCard } from "../db/schema";
import { openai } from "@ai-sdk/openai";
const MODEL = openai.embedding("text-embedding-3-small");

function formatMCQForEmbedding(
  question: string,
  options: string[] | null, // Handle potential null options
  correctAnswer: string,
): string {
  let optionsString = "Options:\n";
  if (options && options.length > 0) {
    optionsString += options.map((opt) => `- ${opt}`).join("\n");
  } else {
    optionsString += "- (No options provided)"; // Or handle as needed
  }

  return `Question: ${question}\n${optionsString}\nCorrect Answer: ${correctAnswer}`;
}
/**
 * Generates embeddings for easy_note_card rows that don't have one yet
 * and updates the database. */
async function generateAndInsertEmbeddings() {
  console.log("Fetching cards without embeddings...");

  try {
    // 1. Fetch rows that don't have an embedding yet
    const cardsToEmbed = await db
      .select({
        id: easyNoteCard.id,
        front: easyNoteCard.front,
        options: easyNoteCard.options,
        chapter: easyNoteCard.chapter,
        unitId: easyNoteCard.unitId,
        back: easyNoteCard.back,
      })
      .from(easyNoteCard);

    if (cardsToEmbed.length === 0) {
      console.log("No cards found without embeddings. Exiting.");
      return;
    }

    console.log(`Found ${cardsToEmbed.length} cards to embed.`);

    // 2. Prepare the values for the embedding model
    // We'll combine front and back for a single embedding per card
    const valuesToEmbed = cardsToEmbed.map(
      (card) => formatMCQForEmbedding(card.front, card.options, card.back), // Ensure we handle null or undefined values
    );
    const cardIds = cardsToEmbed.map((card) => card.id); // Keep track of IDs

    console.log("Generating embeddings using OpenAI...");

    // 3. Generate embeddings using embedMany
    const { embeddings, usage } = await embedMany({
      model: MODEL, // Or your preferred model
      values: valuesToEmbed,
      // Optional: Add other parameters like maxRetries if needed
    });

    console.log(`Embeddings generated. Usage: ${usage.tokens} tokens.`);

    // Basic validation
    if (embeddings.length !== cardIds.length) {
      console.error(
        "Mismatch between number of embeddings received and cards processed.",
      );
      throw new Error("Embedding count mismatch.");
    }

    console.log("Updating database rows with embeddings...");

    // 4. Update the database rows within a transaction
    await db.transaction(async (tx) => {
      const updatePromises = [];
      for (let i = 0; i < cardIds.length; i++) {
        const cardId = cardIds[i];
        const embedding = embeddings[i];

        if (!cardId || !embedding) {
          console.warn(`Skipping update for index ${i} due to missing data.`);
          continue;
        }

        console.log(`Updating card ID ${cardId} with embedding...`);
        console.log(` ${i}/${cardIds.length} `);
        updatePromises.push(
          tx
            .update(easyNoteCard)
            .set({ embedding: embedding }) // Drizzle expects number[] for vector
            .where(eq(easyNoteCard.id, cardId)),
        );
      }
      // Execute all update promises concurrently within the transaction
      await Promise.all(updatePromises);
    });

    console.log(`Successfully updated ${cardIds.length} rows with embeddings.`);
  } catch (error) {
    console.error("Error generating or inserting embeddings:", error);
    // Consider more specific error handling based on the error type
  } finally {
    // Optional: Close the database connection if this script is standalone
    // await pool.end();
    // console.log("Database connection closed.");
  }
}

generateAndInsertEmbeddings()
  .then(() => {
    console.log("Embedding process finished.");
    // Ensure the script exits if run standalone
    process.exit(0);
  })
  .catch((err) => {
    console.error("Unhandled error during embedding process:", err);
    process.exit(1);
  });
export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: MODEL,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  "use cache";
  console.log(`embedding user request`);
  const userQueryEmbedded = await generateEmbedding(userQuery);
  console.log(`finished user request`);
  console.log(`finding similarity`);
  const similarity = sql<number>`1 - (${cosineDistance(
    easyNoteCard.embedding,
    userQueryEmbedded,
  )})`;
  console.log(`done sim`);
  console.log(`cosineDistance`);
  const similarGuides = await db
    .select({
      front: easyNoteCard.front,
      back: easyNoteCard.back,
      options: easyNoteCard.options,
      similarity,
    })
    .from(easyNoteCard)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(10);
  console.log(`done consineSim`);
  return similarGuides;
};
