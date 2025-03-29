/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { initTRPC, TRPCError } from "@trpc/server";

import superjson from "superjson";
import { z, ZodError } from "zod";

import { db } from "@/server/db";
import { getSession } from "../auth/auth.server";
import { hasPermission } from "../auth/plugin/permission/service";
import { type CoursePermissionAction } from "@/server/db/schema";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getSession();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });

export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user || ctx.session.user.role != "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const PermissionInputSchema = z.object({
  courseId: z.string(), // Or z.string().uuid(), etc. depending on your ID format
});
/**
 * Middleware factory to create permission checks for course-related actions.
 * Ensures the user has a specific permission for a given courseId.
 * Uses Zod `safeParse` to validate that the input contains `courseId`.
 * Assumes it runs *after* `protectedProcedure`.
 *
 * @param permission - The permission string to check (e.g., "create_lesson").
 * @param errorMessage - Optional custom error message.
 */
export const createPermissionCheckMiddleware = (
  permission: CoursePermissionAction,
  errorMessage = `You do not have permission to perform this action.`,
) => {
  return t.middleware(async (opts) => {
    const { ctx, input, next } = opts;
    const parseResult = PermissionInputSchema.safeParse(input);
    if (!parseResult.success) {
      console.error(
        `Permission middleware (${permission}) failed input validation:`,
        parseResult.error.flatten(),
      );
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Input validation failed: requires 'courseId'.`,
        // Optionally pass Zod error details, matching your global formatter
        cause: parseResult.error,
      });
    }

    // 2. Input is valid, extract data
    // Type assertion is safe here due to successful parseResult check
    const { courseId } = parseResult.data;
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not logged in",
      });
    }
    const userId = ctx.session.user.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not logged in",
      });
    }
    // 3. Perform the permission check
    const authorized = await hasPermission({
      userId,
      courseId,
      permission,
    });

    if (!authorized) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: errorMessage,
      });
    }

    // 4. User has permission, proceed to the next middleware or resolver
    // Pass the validated context down. The context type remains ProtectedContext.
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
};
export { t };
