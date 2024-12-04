import { hard_cache } from "@/lib/cache";
import { db } from "@/server/db";
import { units, lessons } from "@/server/db/schema";
import { asc } from "drizzle-orm";

export const getSidebarData = hard_cache(
  (courseId: string) =>
    db.query.units.findMany({
      where: (units, { eq, and }) =>
        and(eq(units.courseId, courseId), eq(units.isPublished, true)),
      columns: {
        id: true,
        order: true,
        name: true,
        courseId: true,
      },
      orderBy: asc(units.order),
      with: {
        course: {
          columns: {
            name: true,
          },
        },
        lessons: {
          orderBy: asc(lessons.position),
          columns: {
            id: true,
            title: true,
            contentType: true,
            unitId: true,
          },
        },
      },
    }),
  ["getSidebarData"],
  {
    revalidate: 60 * 60 * 10,
  },
);

export type SidebarData = Awaited<ReturnType<typeof getSidebarData>>;
