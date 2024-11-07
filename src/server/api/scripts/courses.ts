import { unstable_cache } from "@/lib/cache";
import { db } from "@/server/db";

export const getCourses = unstable_cache(
  () => db.query.courses.findMany(),
  ["getCourses"],
  {
    revalidate: 60 * 60 * 10,
  },
);
