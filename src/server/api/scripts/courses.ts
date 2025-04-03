import { cache } from "react";
import { db } from "@/server/db";
import { asc } from "drizzle-orm";

export const getCourseById = cache(async (id: string) => {
  "use cache";
  return await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, id),
    with: {
      units: {
        columns: {
          id: true,
          order: true,
          name: true,
        },
        where: (units, { eq }) => eq(units.isPublished, true),
        with: {
          lessons: {
            columns: {
              id: true,
              name: true,
              contentType: true,
            },
          },
        },
        orderBy: (units) => asc(units.order),
      },
    },
  });
});
