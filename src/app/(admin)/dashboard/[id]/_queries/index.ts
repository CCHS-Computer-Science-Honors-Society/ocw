import { cacheTag } from "@/lib/cache";
import { db } from "@/server/db";
import { units } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getData = async (courseId: string) => {
  "use cache";
  cacheTag("courseData", courseId);
  return await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, courseId),
    columns: {
      id: true,
      name: true,
      description: true,
      unitLength: true,
    },
  });
};

export const getUnits = async (courseId: string) => {
  "use cache";
  cacheTag("getUnits", courseId);
  return await db
    .select({
      label: units.name,
      value: units.id,
    })
    .from(units)
    .where(eq(units.courseId, courseId));
};
