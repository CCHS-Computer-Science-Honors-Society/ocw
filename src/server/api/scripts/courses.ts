import { hard_cache, unstable_cache } from "@/lib/cache";
import { db } from "@/server/db";

export const getCourses = hard_cache(
  () => db.query.courses.findMany(),
  ["getCourses"],
  {
    revalidate: 1,
  },
);

export const getCourseById = unstable_cache(
  (id: string) =>
    db.query.courses.findFirst({
      where: (courses, { eq }) => eq(courses.id, id),
      with: {
        units: {
          columns: {
            id: true,
            name: true,
          },
          with: {
            lessons: {
              columns: {
                id: true,
                title: true,
                contentType: true,
              },
            },
          },
          orderBy: (units, { desc }) => desc(units.order),
        },
      },
    }),
  ["getCourseById"],
);
