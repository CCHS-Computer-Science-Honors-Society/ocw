import { and, eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { courseUsers, type CoursePermissionAction } from "@/server/db/schema";
import { getSession } from "../../auth.server";
type CourseRole = "admin" | "editor" | "user";

export const roleToPermissions: Record<CourseRole, CoursePermissionAction[]> = {
  admin: [
    "create_unit",
    "edit_unit",
    "delete_unit",
    "create_lesson",
    "edit_lesson",
    "delete_lesson",
    "reorder_lesson",
    "manage_course",
    "manage_users",
  ],
  editor: [
    "create_unit",
    "edit_unit",
    "create_lesson",
    "edit_lesson",
    "delete_lesson",
    "reorder_lesson",
  ],
  user: [],
};

/**
 * checks if a user has admin rights (either global or course-specific)
 */
export async function hasAdminRights({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}): Promise<boolean> {
  // check if user is global admin
  const user = await db.query.user.findFirst({
    where: (user) => eq(user.id, userId),
  });

  if (user?.role === "admin") {
    return true;
  }

  // check if user is course admin
  const courseUser = await db.query.courseUsers.findFirst({
    columns: {
      role: true,
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
export async function addPermission({
  courseId,
  userId,
  permission,
}: {
  courseId: string;
  userId: string;
  permission: CoursePermissionAction;
}): Promise<void> {
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
export async function removePermission({
  courseId,
  userId,
  permission,
}: {
  courseId: string;
  userId: string;
  permission: CoursePermissionAction;
}): Promise<void> {
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

export async function getUserPermissions({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const userPermissions = await db.query.courseUsers.findFirst({
    columns: {
      permissions: true,
    },
    where: and(
      eq(courseUsers.userId, userId),
      eq(courseUsers.courseId, courseId),
    ),
  });

  return userPermissions?.permissions ?? [];
}

export async function getUserStatus({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}): Promise<{
  permissions: string[];
  role: string;
}> {
  const [userCourse, user] = await Promise.all([
    db.query.courseUsers.findFirst({
      columns: {
        permissions: true,
        role: true,
      },
      where: and(
        eq(courseUsers.userId, userId),
        eq(courseUsers.courseId, courseId),
      ),
    }),
    db.query.user.findFirst({
      columns: {
        role: true,
      },
      where: (user) => eq(user.id, userId),
    }),
  ]);
  if (user?.role === "admin") {
    return {
      permissions: [],
      role: "admin",
    };
  }

  if (!userCourse) {
    return {
      permissions: [],
      role: "user",
    };
  }

  return {
    permissions: userCourse?.permissions ?? [],
    role: userCourse?.role ?? "user",
  };
}

export async function assignRole({
  courseId,
  userId,
  role,
}: {
  courseId: string;
  userId: string;
  role: CourseRole;
}) {
  await db
    .insert(courseUsers)
    .values({
      courseId,
      userId,
      permissions: roleToPermissions[role],
      role,
    })
    .onConflictDoUpdate({
      target: [courseUsers.courseId, courseUsers.userId],
      set: {
        permissions: roleToPermissions[role],
        role,
      },
    });
}

export async function userHasPermission({
  courseId,
  userId,
  permission,
}: {
  courseId: string;
  userId: string;
  permission: CoursePermissionAction;
}) {
  const userPermissions = await getUserStatus({ courseId, userId });
  if (userPermissions.role === "admin") {
    return true;
  }
  return userPermissions.permissions.includes(permission);
}

export async function userIncludesPermission({
  courseId,
  action,
}: {
  courseId: string;
  action: CoursePermissionAction[];
}) {
  const session = await getSession();

  if (!session?.user) {
    return false;
  }

  if (session.user.role === "admin") {
    return true;
  }

  const userPermissions = await getUserPermissions({
    courseId,
    userId: session.user.id,
  });

  return userPermissions.some((permission) => action.includes(permission));
}
