import { db } from "@/server/db";
import { easyNoteCard } from "@/server/db/schema";
import { file } from "bun";
import { existsSync } from "fs";
import { z } from "zod";

const cardSchema = z.object({
  front: z.string(),
  options: z.array(z.string()),
  back: z.string(),
  images: z.array(z.string()),
  unit: z.string(),
  chapter: z.string(),
});
const cardsSchema = z.array(cardSchema);
type CardsSchema = z.infer<typeof cardsSchema>;

const units2Chapters = {
  1: [1, 51],
  2: [52, 53, 54, 55, 56],
  3: [2, 3, 4, 5, 8],
  4: [6, 7],
  5: [9],
  6: [10],
  7: [16, 19, 20],
};

const folderPath = "./src/data/data/";

export async function insertFlashcards() {
  await db.transaction(async (tx) => {
    for (const [unit, chapters] of Object.entries(units2Chapters)) {
      for (const chapter of chapters) {
        const filePath = `${folderPath}flashcards_${chapter}.json`;
        console.log(filePath);
        if (!existsSync(filePath)) {
          console.log("dont exist");
          continue;
        }

        const fileData = (await file(filePath).json()) as CardsSchema;
        const cards = cardsSchema.parse(fileData);

        for (const card of cards) {
          const unitId = `apbio-unit${unit}`;
          console.log(`parsing: ${card.front}`);
          await tx.insert(easyNoteCard).values({
            front: card.front,
            options: card.options,
            back: card.back,
            unitId,
            chapter,
          });
        }
      }
    }
  });
}

await insertFlashcards();
