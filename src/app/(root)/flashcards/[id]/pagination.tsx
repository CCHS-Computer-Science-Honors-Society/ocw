import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  unitId: string;
}

export function Pagination({
  currentPage,
  totalPages,
  unitId,
}: PaginationProps) {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link href={`/flashcards/${unitId}?page=${currentPage - 1}`} passHref>
          <Button variant="outline">Previous</Button>
        </Link>
      )}
      <span className="rounded bg-gray-100 px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/flashcards/${unitId}?page=${currentPage + 1}`} passHref>
          <Button variant="outline">Next</Button>
        </Link>
      )}
    </div>
  );
}
