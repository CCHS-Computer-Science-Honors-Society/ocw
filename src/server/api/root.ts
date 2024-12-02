import { postRouter } from "@/server/api/routers/post";
import { lessonRouter } from "@/server/api/routers/lesson";
import { courseRouter } from "@/server/api/routers/courses";

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "@/server/api/routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  courses: courseRouter,
  post: postRouter,
  lesson: lessonRouter,
  users: usersRouter,
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
