// src/lib/cache/callInvalidate.ts
import { revalidatePath } from "next/cache";
import "server-only";

/*
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
*/

export const callInvalidate = (
  id?: string,
  unitId?: string,
  lessonId?: string,
) => {
  if (id) {
    revalidatePath(`/course/${id}`);
    if (unitId) {
      revalidatePath(`/course/${id}/unitId}`);
      if (lessonId) {
        revalidatePath(`/course/[id]/[unitId]/[lessonId]`, "page");
      }
    }
  } else {
    // Handle the case when id is undefined
    // Perhaps revalidate all courses:
    revalidatePath(`/(root)/(course)/course`, "layout");
  }
};
