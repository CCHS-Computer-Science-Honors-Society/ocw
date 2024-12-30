import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Pagination } from "./pagination";
import { QuizCard } from "./card";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  options: string[];
  images: string[] | null;
  chapter: number;
}

interface FlashcardListProps {
  flashcards: Flashcard[];
  currentPage: number;
  totalPages: number;
  unitId: string;
}

export function FlashcardList({
  flashcards,
  currentPage,
  totalPages,
  unitId,
}: FlashcardListProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {flashcards.map((flashcard) => {
          return (
            <QuizCard
              key={flashcard.id}
              question={flashcard.front}
              options={flashcard.options}
              image={flashcard.images?.[0]}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        unitId={unitId}
      />
    </div>
  );
}
