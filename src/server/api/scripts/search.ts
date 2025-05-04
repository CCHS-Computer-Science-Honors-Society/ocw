import { db } from "@/server/db";
import { courses, units, lessons } from "@/server/db/schema";
import { sql, eq } from "drizzle-orm";

const sanitize = (s: string) => s.trim().replace(/;/g, "").replace(/\s+/g, " ");
const prefixQuery = (s: string) =>
  s
    .split(" ")
    .filter(Boolean)
    .map((w) => `${w}:*`)
    .join(" & ");

export const performSearch = async (q: string) => {
  "use cache";
  const s = sanitize(q);
  const p = prefixQuery(s);

  const courseVec = sql`
    setweight(to_tsvector('english', ${courses.name}), 'A') ||
    setweight(to_tsvector('english', array_to_string(${courses.aliases}, ' ')), 'B') ||
    setweight(to_tsvector('english', ${courses.description}), 'C')
  `;
  const courseWeb = sql`websearch_to_tsquery('english', ${s})`;
  const coursePre = sql`to_tsquery('english', ${p})`;
  const courseLike = sql`
    ${courses.name} ILIKE ${`%${s}%`} OR
    array_to_string(${courses.aliases}, ' ') ILIKE ${`%${s}%`} OR
    ${courses.description} ILIKE ${`%${s}%`}
  `;

  const unitVec = sql`
    setweight(to_tsvector('english', ${units.name}), 'A') ||
    setweight(to_tsvector('english', ${units.description}), 'B')
  `;
  const unitWeb = sql`websearch_to_tsquery('english', ${s})`;
  const unitPre = sql`to_tsquery('english', ${p})`;
  const unitLike = sql`
    ${units.name} ILIKE ${`%${s}%`} OR
    ${units.description} ILIKE ${`%${s}%`}
  `;

  const lessonVec = sql`setweight(to_tsvector('english', ${lessons.name}), 'A')`;
  const lessonWeb = sql`websearch_to_tsquery('english', ${s})`;
  const lessonPre = sql`to_tsquery('english', ${p})`;
  const lessonLike = sql`${lessons.name} ILIKE ${`%${s}%`}`;

  const [coursesRes, unitsRes, lessonsRes] = await Promise.all([
    db
      .select({ id: courses.id, name: courses.name })
      .from(courses)
      .where(
        sql`(
          ${courseVec} @@ ${courseWeb} OR
          ${courseVec} @@ ${coursePre} OR
          (${courseLike})
        )`,
      )
      .orderBy(
        sql`GREATEST(
          ts_rank_cd(${courseVec}, ${courseWeb}, 32),
          ts_rank_cd(${courseVec}, ${coursePre}, 32)
        ) DESC`,
      )
      .limit(10),

    db
      .select({ id: units.id, name: units.name, courseName: courses.name })
      .from(units)
      .innerJoin(courses, eq(units.courseId, courses.id))
      .where(
        sql`(
          ${unitVec} @@ ${unitWeb} OR
          ${unitVec} @@ ${unitPre} OR
          (${unitLike})
        )`,
      )
      .orderBy(
        sql`GREATEST(
          ts_rank(${unitVec}, ${unitWeb}),
          ts_rank(${unitVec}, ${unitPre})
        ) DESC`,
      )
      .limit(10),

    db
      .select({
        id: lessons.id,
        name: lessons.name,
        unitName: units.name,
        courseName: courses.name,
      })
      .from(lessons)
      .innerJoin(units, eq(lessons.unitId, units.id))
      .innerJoin(courses, eq(units.courseId, courses.id))
      .where(
        sql`(
          ${lessonVec} @@ ${lessonWeb} OR
          ${lessonVec} @@ ${lessonPre} OR
          (${lessonLike})
        )`,
      )
      .orderBy(
        sql`GREATEST(
          ts_rank(${lessonVec}, ${lessonWeb}),
          ts_rank(${lessonVec}, ${lessonPre})
        ) DESC`,
      )
      .limit(10),
  ]);

  return { courses: coursesRes, units: unitsRes, lessons: lessonsRes };
};
