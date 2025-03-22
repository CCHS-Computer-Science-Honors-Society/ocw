import { type BetterAuthPlugin } from "better-auth";
import {
  createAuthEndpoint,
  APIError,
  sessionMiddleware,
} from "better-auth/api";
import { db } from "@/server/db"; // Your database instance
import { and, eq } from "drizzle-orm";
import { courseUsers, coursePermissionAction } from "@/server/db/schema";
import { tryCatch } from "@/lib/try-catch";
import { addPermission, removePermission } from "./service";
import { z } from "zod";

export const coursePermissionsPlugin = () =>
  ({
    id: "coursePermissions",

    // Define endpoints
    endpoints: {
      // Check if user has permission
      checkPermission: createAuthEndpoint(
        "/course-permissions/check",
        {
          method: "POST",
          use: [sessionMiddleware],
        },
        async (ctx) => {
          // Validate the request body using Zod
          const schema = z.object({
            courseId: z.string(),
            action: z.enum(coursePermissionAction),
          });
          const result = schema.safeParse(ctx.body);

          if (!result.success) {
            throw new APIError("BAD_REQUEST", result.error);
          }

          const { courseId, action } = result.data;

          // Ensure a valid session exists
          const session = ctx.context.session;
          if (!session?.user) {
            throw new APIError("UNAUTHORIZED");
          }

          // Fetch the global user details
          const { data: user, error: userError } = await tryCatch(
            db.query.user.findFirst({
              where: (user) => eq(user.id, session.user.id),
            }),
          );
          if (userError) {
            console.error("Error fetching user from database:", userError);
            throw new APIError("BAD_REQUEST", userError);
          }

          // If the user is a global admin, immediately grant access
          if (user?.role === "admin") {
            return ctx.json({ granted: true });
          }

          // Fetch the course user record for the given course
          const { data: courseUser, error: courseUserError } = await tryCatch(
            db.query.courseUsers.findFirst({
              where: and(
                eq(courseUsers.userId, session.user.id),
                eq(courseUsers.courseId, courseId),
                eq(courseUsers.role, "admin"),
              ),
            }),
          );
          if (courseUserError) {
            console.error(
              "Error fetching course user from database:",
              courseUserError,
            );
            throw new APIError("BAD_REQUEST", courseUserError);
          }

          // If the user is a course admin, immediately grant access
          if (courseUser?.role === "admin") {
            return ctx.json({ granted: true });
          }

          // Otherwise, check if the user has the specified permission
          const hasPermission =
            courseUser?.permissions && Array.isArray(courseUser.permissions)
              ? courseUser.permissions.includes(action)
              : false;

          return ctx.json({ granted: hasPermission });
        },
      ),

      // Grant permission
      grantPermission: createAuthEndpoint(
        "/course-permissions/grant",
        {
          method: "POST",
          use: [sessionMiddleware],
        },
        async (ctx) => {
          const schema = z.object({
            courseId: z.string(),
            userId: z.string(),
            action: z.enum(coursePermissionAction),
          });

          const result = schema.safeParse(ctx.body);
          if (!result.success) {
            throw new APIError("BAD_REQUEST", result.error);
          }
          const { courseId, userId, action } = result.data;

          const session = ctx.context.session;

          if (!session?.user) {
            throw new APIError("UNAUTHORIZED");
          }

          const { data: courseUser, error: courseUserError } = await tryCatch(
            db.query.courseUsers.findFirst({
              where: and(
                eq(courseUsers.userId, session.user.id),
                eq(courseUsers.courseId, courseId),
                eq(courseUsers.role, "admin"),
              ),
            }),
          );

          if (courseUserError) {
            throw new APIError("NOT_FOUND");
          }

          if (
            session.user?.role !== "admin" &&
            !(courseUser?.role === "admin")
          ) {
            throw new APIError("FORBIDDEN");
          }

          await addPermission({ userId, courseId, permission: action });
          return ctx.json({ success: true });
        },
      ),

      // Revoke permission
      revokePermission: createAuthEndpoint(
        "/course-permissions/revoke",
        {
          method: "POST",
          use: [sessionMiddleware],
        },
        async (ctx) => {
          const schema = z.object({
            courseId: z.string(),
            userId: z.string(),
            action: z.enum(coursePermissionAction),
          });

          const result = schema.safeParse(ctx.body);
          if (!result.success) {
            throw new APIError("BAD_REQUEST");
          }

          const { courseId, userId, action } = result.data;

          const session = ctx.context.session;

          if (!session?.user) {
            throw new APIError("UNAUTHORIZED");
          }

          const courseUser = await db.query.courseUsers.findFirst({
            where: and(
              eq(courseUsers.userId, session.user.id),
              eq(courseUsers.courseId, courseId),
            ),
          });

          if (
            session.user?.role !== "admin" &&
            !(courseUser?.role === "admin")
          ) {
            throw new APIError("FORBIDDEN");
          }

          await removePermission({ userId, courseId, permission: action });
          return ctx.json({ success: true });
        },
      ),
    },

    // Add hooks to protect course endpoints
    hooks: {},
  }) satisfies BetterAuthPlugin;
