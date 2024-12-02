import { auth } from "@/server/auth";
import type { CourseRole } from "@/server/auth/types";
import { db } from "@/server/db";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient().use(async ({ next }) => {
  return next({
    ctx: {
      session: null,
      db,
    },
  });
});

export const authedAction = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      session: session,
      db: db,
    },
  });
});

export const adminAction = actionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session?.user || session.user.role != "admin") {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      session,
      db,
    },
  });
});

export const courseAction = actionClient.use(async ({ next, clientInput }) => {
  const session = await auth();
  const { courseId, required } = clientInput as {
    courseId: string;
    required: "admin" | "editor" | "user";
  };

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role === "admin") {
    return next({
      ctx: {
        session,
        db,
      },
    });
  }

  if (!courseId || !required) {
    throw new Error("bad request");
  }

  const userCourseRole = session?.user?.courses?.[courseId];

  if (!userCourseRole) {
    throw new Error("unauthorized");
  }

  if (userCourseRole === required) {
    return next({
      ctx: {
        session,
        db,
      },
    });
  }

  const roleHierarchy: Record<CourseRole, number> = {
    admin: 3,
    editor: 2,
    user: 1,
  };

  const requiredLevel = roleHierarchy[required];
  const userLevel = roleHierarchy[userCourseRole];

  if (userLevel >= requiredLevel) {
    return next({
      ctx: {
        session,
        db,
      },
    });
  }

  throw new Error("unathorized");
});
