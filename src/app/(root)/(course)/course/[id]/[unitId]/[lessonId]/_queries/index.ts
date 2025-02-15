import { cache, REVALIDATE } from "@/lib/cache";
import { db } from "@/server/db";
import { units, lessons } from "@/server/db/schema";
import { asc } from "drizzle-orm";

export const getSidebarData = cache(
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
            subjectId: true,
          },
        },
        lessons: {
          orderBy: asc(lessons.order),
          where: (lessons, { eq }) => eq(lessons.isPublished, true),
          columns: {
            id: true,
            pureLink: true,
            name: true,
            contentType: true,
            unitId: true,
          },
          with: {
            embeds: {
              columns: {
                embedUrl: true,
              },
            },
          },
        },
      },
    }),
  ["getSidebarData"],
  {
    revalidate: REVALIDATE,
  },
);

export type SidebarData = Awaited<ReturnType<typeof getSidebarData>>;
