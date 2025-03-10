import { lessonRouter } from "@/server/api/routers/lesson";
import { courseRouter } from "@/server/api/routers/courses";
import { unitsRouter } from "@/server/api/routers/units";

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "@/server/api/routers/users";
import { searchRouter } from "./routers/search";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  courses: courseRouter,
  lesson: lessonRouter,
  search: searchRouter,
  users: usersRouter,
  units: unitsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
