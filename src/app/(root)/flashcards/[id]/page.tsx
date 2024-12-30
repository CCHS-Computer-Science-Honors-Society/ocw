import { db } from "@/server/db";
import { easyNoteCard } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { SearchForm } from "./searchform";
import { FlashcardList } from "./flashcardlist";
import type { PgSelect } from "drizzle-orm/pg-core";

// Utility function for pagination
function withPagination<T extends PgSelect>(
  qb: T,
  page = 1,
  pageSize?: number,
) {
  return qb.limit(pageSize ?? 10).offset((page - 1) * (pageSize ?? 10));
}

// Utility function for search
function withSearch<T extends PgSelect>(qb: T, searchTerm: string) {
  return qb.where(
    sql`to_tsvector('english', ${easyNoteCard.front} || ' ' || ${easyNoteCard.back}) @@ plainto_tsquery('english', ${searchTerm})`,
  );
}

// Utility function for chapter filter
function withChapterFilter<T extends PgSelect>(qb: T, chapter: number) {
  return qb.where(eq(easyNoteCard.chapter, chapter));
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    chapter?: string;
    limit?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function FlashcardsPage({
  params,
  searchParams,
}: PageProps) {
  const { id: unitId } = await params;
  const { chapter, search, page = "1", limit = "10" } = await searchParams;
  const currentPage = parseInt(page, 10);
  const pageSizeInt = parseInt(limit, 10);
  let query = db
    .select()
    .from(easyNoteCard)
    .where(eq(easyNoteCard.unitId, unitId))
    .$dynamic();

  if (chapter) {
    console.log("chapter", chapter);
    query = withChapterFilter(query, parseInt(chapter, 10));
  }

  if (search) {
    console.log("search", search);
    query = withSearch(query, search);
  }

  query = withPagination(query, currentPage, pageSizeInt);

  const flashcards = await query;
  console.log(flashcards);

  // Get total count for pagination
  let countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(easyNoteCard)
    .where(eq(easyNoteCard.unitId, unitId))
    .$dynamic();

  if (chapter) {
    countQuery = withChapterFilter(countQuery, parseInt(chapter, 10));
  }

  if (search) {
    countQuery = withSearch(countQuery, search);
  }

  const [count] = await countQuery;
  const totalPages = Math.ceil(count?.count ?? 0 / pageSizeInt);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Flashcards for Unit {unitId}</h1>
      <SearchForm />
      <FlashcardList
        flashcards={flashcards}
        currentPage={currentPage}
        totalPages={totalPages ?? 10}
        unitId={unitId}
      />
    </div>
  );
}
