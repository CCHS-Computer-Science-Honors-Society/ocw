import { db } from "@/server/db";
import { easyNoteCard } from "@/server/db/schema";

export async function upsertFlashcard({
  item,
}: {
  item: {
    front: string;
    back: string;
    embedding: number[];
    item: string;
  };
}) {
  await db
    .insert(easyNoteCard)
    .values(item)
    .onConflictDoUpdate({
      target: easyNoteCard.id,
      set: {
        ...item,
      },
    });
}

async function insertFlashcards() {
  try {
    const file = Bun.file("./src/data/easy_note_card.json");
    const flashcards = await file.json();

    await Promise.all(
      flashcards.map((flashcard: any) => upsertFlashcard({ item: flashcard })),
    );

    console.log("All flashcards have been inserted successfully.");
  } catch (error) {
    console.error("Error inserting flashcards:", error);
  }
}

await insertFlashcards();
