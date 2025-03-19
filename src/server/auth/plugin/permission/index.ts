import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, APIError, sessionMiddleware } from "better-auth/api";
import { db } from "@/server/db"; // Your database instance
import { and, eq, inArray } from "drizzle-orm";
import {
  user,
  courseUsers,
  coursePermissions,
  coursePermissionActions,
  type coursePermissionAction,
} from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

export const coursePermissionsPlugin = () => ({
  id: "coursePermissions",

  // Define endpoints
  endpoints: {
    // Check if user has permission
    checkPermission: createAuthEndpoint("/course-permissions/check", {
      method: "POST",
      use: [sessionMiddleware],
    }, async (ctx) => {
      const { courseId, action } = ctx.body;
      const session = ctx.context.session;

      if (!session?.user) {
        throw new APIError("UNAUTHORIZED");
      }

      // Check if user is global admin
      const user = await db.query.users.findFirst({
        where: eq(user.id, session.user.id),
      });

      if (user?.role === "admin") {
        return ctx.json({ granted: true });
      }

      // Check if user is a course admin
      const courseUser = await db.query.courseUsers.findFirst({
        where: and(
          eq(courseUsers.userId, session.user.id),
          eq(courseUsers.courseId, courseId),
          eq(courseUsers.role, "admin")
        ),
      });

      if (courseUser) {
        return ctx.json({ granted: true });
      }

      // Check specific permission
      const permission = await db.query.coursePermissions.findFirst({
        where: and(
          eq(coursePermissions.userId, session.user.id),
          eq(coursePermissions.courseId, courseId),
          eq(coursePermissions.action, action)
        ),
      });

      return ctx.json({ granted: permission?.granted === true });
    }),

    // Grant permission
    grantPermission: createAuthEndpoint("/course-permissions/grant", {
      method: "POST",
      use: [sessionMiddleware],
    }, async (ctx) => {
      const { courseId, userId, action } = ctx.body;
      const session = ctx.context.session;

      if (!session?.user) {
        throw new APIError("UNAUTHORIZED");
      }

      // Check if requester is admin
      const user = await db.query.users.findFirst({
        where: eq(user.id, session.user.id),
      });

      const courseUser = await db.query.courseUsers.findFirst({
        where: and(
          eq(courseUsers.userId, session.user.id),
          eq(courseUsers.courseId, courseId),
          eq(courseUsers.role, "admin")
        ),
      });

      if (user?.role !== "admin" && !courseUser) {
        throw new APIError("FORBIDDEN");
      }

      // Insert or update permission
      await db
        .insert(coursePermissions)
        .values({
          id: createId(),
          courseId,
          userId,
          action,
          granted: true,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [
            coursePermissions.courseId,
            coursePermissions.userId,
            coursePermissions.action
          ],
          set: {
            granted: true,
            updatedAt: new Date(),
          },
        });

      return ctx.json({ success: true });
    }),

    // Revoke permission
    revokePermission: createAuthEndpoint("/course-permissions/revoke", {
      method: "POST",
      use: [sessionMiddleware],
    }, async (ctx) => {
      const { courseId, userId, action } = ctx.body;
      const session = ctx.context.session;

      if (!session?.user) {
        throw new APIError("UNAUTHORIZED");
      }

      // Check if requester is admin
      const user = await db.query.users.findFirst({
        where: eq(user.id, session.user.id),
      });

      const courseUser = await db.query.courseUsers.findFirst({
        where: and(
          eq(courseUsers.userId, session.user.id),
          eq(courseUsers.courseId, courseId),
          eq(courseUsers.role, "admin")
        ),
      });

      if (user?.role !== "admin" && !courseUser) {
        throw new APIError("FORBIDDEN");
      }

      // Insert or update permission
      await db
        .insert(coursePermissions)
        .values({
          id: createId(),
          courseId,
          userId,
          action,
          granted: false,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [
            coursePermissions.courseId,
            coursePermissions.userId,
            coursePermissions.action
          ],
          set: {
            granted: false,
            updatedAt: new Date(),
          },
        });

      return ctx.json({ success: true });
    }),

    // Get user permissions
    getUserPermissions: createAuthEndpoint("/course-permissions/user", {
      method: "POST",
      use: [sessionMiddleware],
    }, async (ctx) => {
      const { courseId, userId } = ctx.body;
      const session = ctx.context.session;

      if (!session?.user) {
        throw new APIError("UNAUTHORIZED");
      }

      // Only allow admins or the user themselves to view permissions
      if (session.user.id !== userId) {
        const user = await db.query.users.findFirst({
          where: eq(user.id, session.user.id),
        });

        const courseUser = await db.query.courseUsers.findFirst({
          where: and(
            eq(courseUsers.userId, session.user.id),
            eq(courseUsers.courseId, courseId),
            eq(courseUsers.role, "admin")
          ),
        });

        if (user?.role !== "admin" && !courseUser) {
          throw new APIError("FORBIDDEN");
        }
      }

      // Check if user is a global admin
      const user = await db.query.users.findFirst({
        where: eq(user.id, userId),
      });

      if (user?.role === "admin") {
        // Global admins have all permissions
        return ctx.json({
          isGlobalAdmin: true,
          permissions: coursePermissionActions.map(action => ({
            action,
            granted: true
          }))
        });
      }

      // Check if user is a course admin
      const courseUser = await db.query.courseUsers.findFirst({
        where: and(
          eq(courseUsers.userId, userId),
          eq(courseUsers.courseId, courseId)
        ),
      });

      if (courseUser?.role === "admin") {
        // Course admins have all permissions for this course
        return ctx.json({
          isCourseAdmin: true,
          permissions: coursePermissionActions.map(action => ({
            action,
            granted: true
          }))
        });
      }

      // Get specific permissions
      const permissions = await db.query.coursePermissions.findMany({
        where: and(
          eq(coursePermissions.userId, userId),
          eq(coursePermissions.courseId, courseId)
        ),
      });

      // Create a complete list of permissions (including those not set)
      const allPermissions = coursePermissionActions.map((action: any) => {
        const permission = permissions.find(p => p.action === action);
        return {
          action,
          granted: permission?.granted === true
        };
      });

      return ctx.json({
        isGlobalAdmin: false,
        isCourseAdmin: false,
        permissions: allPermissions
      });
    }),

    // Setup default permissions
    setupDefaultPermissions: createAuthEndpoint("/course-permissions/setup", {
      method: "POST",
      use: [sessionMiddleware],
    }, async (ctx) => {
      const { courseId, userId, role } = ctx.body;
      const session = ctx.context.session;

      if (!session?.user) {
        throw new APIError("UNAUTHORIZED");
      }

      // Check if requester has permission
      const user = await db.query.users.findFirst({
        where: eq(user.id, session.user.id),
      });

      const courseUser = await db.query.courseUsers.findFirst({
        where: and(
          eq(courseUsers.userId, session.user.id),
          eq(courseUsers.courseId, courseId),
          eq(courseUsers.role, "admin")
        ),
      });

      if (user?.role !== "admin" && !courseUser) {
        throw new APIError("FORBIDDEN");
      }

      // Define permissions based on role
      let permissionsToGrant: CoursePermissionAction[] = [];

      if (role === "admin") {
        // Admin gets all permissions
        permissionsToGrant = [...coursePermissionActions];
      } else if (role === "editor") {
        // Editor can edit content but not delete or create courses
        permissionsToGrant = [
          "edit_course",
          "create_unit", "edit_unit", "reorder_unit",
          "create_lesson", "edit_lesson", "delete_lesson", "reorder_lesson"
        ] as CoursePermissionAction[];
      } else {
        // Regular user gets limited permissions
        permissionsToGrant = [] as CoursePermissionAction[];
      }

      // First clear existing permissions to avoid stale entries
      await db.delete(coursePermissions)
        .where(and(
          eq(coursePermissions.userId, userId),
          eq(coursePermissions.courseId, courseId)
        ));

      // Insert all permissions
      if (permissionsToGrant.length > 0) {
        await db.insert(coursePermissions)
          .values(
            permissionsToGrant.map(action => ({
              id: createId(),
              courseId,
              userId,
              action,
              granted: true,
              updatedAt: new Date(),
              createdAt: new Date()
            }))
          );
      }

      return ctx.json({ success: true });
    }),
  },

  // Add hooks to protect course endpoints
  hooks: {
  },
} satisfies BetterAuthPlugin);
