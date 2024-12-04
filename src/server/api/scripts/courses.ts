import { hard_cache } from "@/lib/cache";
import { db } from "@/server/db";
import { asc } from "drizzle-orm";

export const getCourses = hard_cache(
  () => db.query.courses.findMany(),
  ["getCourses"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export const getCourseById = hard_cache(
  (id: string) =>
    db.query.courses.findFirst({
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
                title: true,
                contentType: true,
              },
            },
          },
          orderBy: (units) => asc(units.order),
        },
      },
    }),
  ["getCourseById"],
  {
    revalidate: 60 * 60 * 24,
  },
);
