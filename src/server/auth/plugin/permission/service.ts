import { and, eq, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { db } from "@/server/db";
import { courseUsers, coursePermissionAction, type CoursePermissionAction, user } from "@/server/db/schema";

/**
 * checks if a user has admin rights (either global or course-specific)
 */
export async function hasAdminRights(userId: string, courseId: string): Promise<boolean> {
  // check if user is global admin
  const user = await db.query.users.findFirst({
    where: eq(user.id, userId),
  });

  if (user?.role === "admin") {
    return true;
  }

  // check if user is course admin
  const courseUser = await db.query.courseUsers.findFirst({
    columns: {
      role: true
    },
    where: and(
      eq(courseUsers.userId, userId),
      eq(courseUsers.courseId, courseId),
    ),
  });

  return courseUser?.role === "admin";
}

/**
 * grants a specific permission to a user for a course
 */
export async function addPermission(
  courseId: string,
  userId: string,
  permission: CoursePermissionAction
): Promise<void> {
  const query = sql`
    UPDATE ${courseUsers}
    SET ${courseUsers.permissions} = array_append(coalesce(${courseUsers.permissions}, '{}'::text[]), ${permission})
    WHERE ${courseUsers.courseId} = ${courseId} AND ${courseUsers.userId} = ${userId}
  `;

  await db.execute(query);
}

/**
 * revokes a specific permission from a user for a course
 */
export async function removePermission(
  courseId: string,
  userId: string,
  permission: CoursePermissionAction
): Promise<void> {
  const query = sql`
    UPDATE ${courseUsers}
    SET ${courseUsers.permissions} = array_remove(
      coalesce(${courseUsers.permissions}, '{}'::text[]),
      ${permission}
    )
    WHERE ${courseUsers.courseId} = ${courseId} 
      AND ${courseUsers.userId} = ${userId}
  `;

  await db.execute(query);
}
/**
 * gets all permissions for a user in a specific course
 */
export async function getUserPermissions(courseId: string, userId: string) {
  // check if user is a global admin
  const user = await db.query.users.findFirst({
    where: eq(user.id, userId),
  });

  if (user?.role === "admin") {
    // global admins have all permissions
    return {
      isGlobalAdmin: true,
      isCourseAdmin: false,
      permissions: coursePermissionAction.map(action => ({
        action,
      }))
    };
  }

  // check if user is a course admin
  const courseUser = await db.query.courseUsers.findFirst({
    where: and(
      eq(courseUsers.userId, userId),
      eq(courseUsers.courseId, courseId)
    ),
  });

  if (courseUser?.role === "admin") {
    // course admins have all permissions for this course
    return {
      isGlobalAdmin: false,
      isCourseAdmin: true,
      permissions: coursePermissionAction.map(action => ({
        action,
      }))
    };
  }

  // get specific permissions
  const permissions = await db.query.coursePermissions.findMany({
    where: and(
      eq(coursePermissions.userId, userId),
      eq(coursePermissions.courseId, courseId)
    ),
  });

  // create a complete list of permissions (including those not set)
  const allPermissions = coursePermissionActions.map(action => {
    const permission = permissions.find(p => p.action === action);
    return {
      action,
      granted: permission?.granted === true
    };
  });

  return {
    isGlobalAdmin: false,
    isCourseAdmin: false,
    permissions: allPermissions
  };
}

const roleToPermissions: Record<string, CoursePermissionAction[]> = {
  admin: ["create_unit", "edit_unit", "delete_unit", "create_lesson", "edit_lesson", "delete_lesson", "reorder_lesson", "manage_users"],
  editor: ["create_unit", "edit_unit", "create_lesson", "edit_lesson", "delete_lesson", "reorder_lesson"],
  user: []
}

/**
 * sets up default permissions for a user based on their role
 */
export async function setupDefaultPermissions(
  courseId: string,
  userId: string,
  role: string
): Promise<void> {
  // define permissions based on role
  let permissionsToGrant: CoursePermissionAction[] = [];

  if (role === "admin") {
    // admin gets all permissions
    permissionsToGrant = [...coursePermissionAction];
  } else if (role === "editor") {
    // editor can edit content but not delete or create courses
    permissionsToGrant = [
      "edit_course",
      "create_unit", "edit_unit", "reorder_unit",
      "create_lesson", "edit_lesson", "delete_lesson", "reorder_lesson"
    ] as CoursePermissionAction[];
  }
  // regular users get no permissions by default

  // first clear existing permissions to avoid stale entries
  await db.delete(courseUsers)
    .where(and(
      eq(courseUsers.userId, userId),
      eq(courseUsers.courseId, courseId)
    ));

  // insert all permissions
  if (permissionsToGrant.length > 0) {
    await db.insert()
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
}
