import { sql, and, or, ilike } from "drizzle-orm";
import { type SearchParams } from "@/lib/url-state";
import { courses } from "@/server/db/schema";
import { db } from "@/server/db";
import { cache, REVALIDATE } from "@/lib/cache";

export const ITEMS_PER_PAGE = 28;
export const EMPTY_IMAGE_URL =
  "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png";

const searchFilter = (q?: string) => {
  if (q) {
    const query = q
      .split(" ")
      .filter((term) => term.trim() !== "")
      .map((term) => `${term}:*`)
      .join(" & ");

    return or(
      sql`to_tsvector('english', ${courses.name}) @@ to_tsquery('english', ${query})`,
      sql`to_tsvector('english', ${courses.description}) @@ to_tsquery('english', ${query})`,
      ilike(courses.name, query),
    );
  }
  return undefined;
};

export const fetchCoursesWithPagination = cache(
  async (searchParams: SearchParams) => {
    const requestedPage = Math.max(1, Number(searchParams?.page) || 1);

    const filters = [searchFilter(searchParams.search)].filter(Boolean);

    const whereClause = filters.length > 0 ? and(...filters) : undefined;
    const offset = (requestedPage - 1) * ITEMS_PER_PAGE;

    const paginatedcourses = await db
      .select({
        id: courses.id,
        name: courses.name,
        description: courses.description,
        imageUrl: courses.imageUrl,
      })
      .from(courses)
      .where(whereClause)
      .orderBy(courses.id)
      .limit(ITEMS_PER_PAGE)
      .offset(offset);

    return paginatedcourses;
  },
  ["fetchCoursesWithPagination"],
  {
    revalidate: REVALIDATE,
  },
);

export const estimateTotalCourses = cache(
  async (searchParams: SearchParams) => {
    const filters = [searchFilter(searchParams.search)].filter(Boolean);

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const explainResult = await db.execute(sql`
    EXPLAIN (FORMAT JSON)
    SELECT id FROM courses
    ${whereClause ? sql`WHERE ${whereClause}` : sql``}
  `);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const planRows = (explainResult.rows[0] as any)["QUERY PLAN"][0].Plan[
      "Plan Rows"
    ];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return planRows;
  },
  ["fetchCoursesWithPagination"],
  {
    revalidate: REVALIDATE,
  },
);
