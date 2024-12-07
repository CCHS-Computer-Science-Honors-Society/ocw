import { hard_cache } from "@/lib/cache";
import { db } from "@/server/db";
import { courses, units, lessons } from "@/server/db/schema";
import { sql, or, eq, arrayContains } from "drizzle-orm";

const coursesQuery = async (query: string, ogQuery: string) => {
  const terms = ogQuery.split(" ").filter((term) => term.trim() !== ""); // Filter out empty terms

  return await db
    .select({
      id: courses.id,
      name: courses.name,
    })
    .from(courses)
    .where(
      or(
        arrayContains(courses.aliases, terms),
        sql`to_tsvector('english', ${courses.name}) @@ to_tsquery('english', ${query})`,
        sql`to_tsvector('english', ${courses.description}) @@ to_tsquery('english', ${query})`,
      ),
    )
    .limit(10);
};
const unitsQuery = async (query: string) =>
  await db
    .select({
      id: units.id,
      name: units.name,
      courseName: courses.name,
    })
    .from(units)
    .where(
      or(
        sql`to_tsvector('english', ${units.name}) @@ to_tsquery('english', ${query})`,
        sql`to_tsvector('english', ${units.description}) @@ to_tsquery('english', ${query})`,
      ),
    )
    .innerJoin(courses, eq(units.courseId, courses.id))
    .limit(10);

const lessonsQuery = async (query: string) =>
  await db
    .select({
      id: lessons.id,
      name: lessons.name,
      unitName: units.name,
      courseName: courses.name,
    })
    .from(lessons)
    .where(
      or(
        sql`to_tsvector('english', ${lessons.name}) @@ to_tsquery('english', ${query})`,
      ),
    )
    .innerJoin(units, eq(lessons.unitId, units.id))
    .innerJoin(courses, eq(units.courseId, courses.id))
    .limit(10);

export const performSearch = hard_cache(
  async (q: string) => {
    const query = q
      .split(" ")
      .filter((term) => term.trim() !== "") // Filter out empty terms
      .map((term) => `${term}:*`)
      .join(" & ");
    console.log(query);

    const [coursesResult, unitsResult, lessonsResult] = await Promise.all([
      coursesQuery(query, q),
      unitsQuery(query),
      lessonsQuery(query),
    ]);

    return {
      courses: coursesResult,
      units: unitsResult,
      lessons: lessonsResult,
    };
  },
  ["search"],
  {
    // 10 mins
    revalidate: 60 * 60 * 10,
  },
);
