import { type NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { type PgSelect } from "drizzle-orm/pg-core";
import { db } from "@/server/db";
import { easyNoteCard } from "@/server/db/schema";

function withPagination<T extends PgSelect>(qb: T, page = 1, pageSize = 10) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

function withSearch<T extends PgSelect>(qb: T, searchTerm: string) {
  return qb.where(
    sql`to_tsvector('english', ${easyNoteCard.front} || ' ' || ${easyNoteCard.back}) @@ plainto_tsquery('english', ${searchTerm})`,
  );
}

function withChapterFilter<T extends PgSelect>(qb: T, chapter: number) {
  return qb.where(eq(easyNoteCard.chapter, chapter));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const unitId = searchParams.get("unitId");
  const chapter = searchParams.get("chapter");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);

  if (!unitId) {
    return NextResponse.json({ error: "Unit ID is required" }, { status: 400 });
  }

  try {
    let query = db
      .select()
      .from(easyNoteCard)
      .where(eq(easyNoteCard.unitId, unitId))
      .$dynamic();

    if (chapter) {
      query = withChapterFilter(query, parseInt(chapter, 10));
    }

    if (search) {
      query = withSearch(query, search);
    }

    query = withPagination(query, page, pageSize);

    const flashcards = await query;

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

    return NextResponse.json({
      flashcards,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: count?.count ?? 0,
        totalPages: Math.ceil(count?.count ?? 0 / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
