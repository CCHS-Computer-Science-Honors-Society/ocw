import { eq } from "drizzle-orm";
import { db } from ".";
import { lessons, units } from "./schema";

async function addCourseIdToLesson() {
  // Select each lesson's id along with its unit's courseId
  const lessonsWithUnits = await db
    .select({
      lessonId: lessons.id,
      courseId: units.courseId,
    })
    .from(lessons)
    .leftJoin(units, eq(lessons.unitId, units.id));

  // Update each lesson with the retrieved courseId.
  await db.transaction(async (tx) => {
    for (const row of lessonsWithUnits) {
      if (row.courseId) {
        await tx
          .update(lessons)
          .set({ courseId: row.courseId })
          .where(eq(lessons.id, row.lessonId));
      }
    }
  });
}

await addCourseIdToLesson();
