// authPlugin.ts
import { TRPCError } from "@trpc/server";
import { t } from "./trpc"; // Import the existing t instance

type CourseRole = "admin" | "editor" | "user";

/**
 * Create an authorization plugin using the existing t instance
 */
export function createAuthPlugin() {
  // Define the authorization middleware
  const authorize = t.middleware(async ({ ctx, next, input }) => {
    // Extract input parameters. Ensure input is an object with courseId and required.
    if (typeof input !== "object" || input === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid input",
      });
    }

    const { courseId, required } = input as {
      courseId: string;
      required: CourseRole;
    };

    if (!courseId || !required) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Missing courseId or required role.",
      });
    }

    const user = ctx?.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated.",
      });
    }

    // Admins have access to all courses
    if (user.role === "admin") {
      return next();
    }

    // Check if the user has the required role for the specific course
    const userCourseRole = user.courses?.[courseId];

    if (userCourseRole === required) {
      return next();
    }

    // Optionally, implement hierarchical role checks (e.g., admin > teacher > student)
    const roleHierarchy: Record<CourseRole, number> = {
      admin: 3,
      editor: 2,
      user: 1,
    };

    const requiredLevel = roleHierarchy[required];
    const userLevel = roleHierarchy[user.role];

    if (userLevel >= requiredLevel) {
      return next();
    }

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You do not have the required permissions for this course.",
    });
  });

  return {
    authorizeProcedure: t.procedure.use(authorize),
  };
}
