import { db } from "@/server/db";
import { easyNoteCard } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

export const FlashcardPage = (props: { unitId: string }) => {
  const { unitId } = props;

  const getData = async () => {
    "use cache";
    return await db
      .select()
      .from(easyNoteCard)
      .where(eq(easyNoteCard.unitId, unitId));
  };

  return <div></div>;
};
