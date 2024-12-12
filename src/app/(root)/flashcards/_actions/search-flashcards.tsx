"use server";

import { findSimilarFlashcards } from "@/server/db/ai";

export async function searchFlashcards(formData: FormData) {
  const query = formData.get("query");
  if (typeof query !== "string" || query.length === 0) {
    return { error: "Please provide a valid search query" };
  }

  try {
    const results = await findSimilarFlashcards(query);
    return { results };
  } catch (error) {
    console.error("Error searching flashcards:", error);
    return { error: "An error occurred while searching flashcards" };
  }
}
