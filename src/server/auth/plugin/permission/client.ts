import { BetterAuthClientPlugin } from "better-auth/client";
import type { coursePermissionsPlugin } from "./index";

type CoursePermissionsPlugin = typeof coursePermissionsPlugin;

export const coursePermissionsClientPlugin = () => {
  return {
    id: "coursePermissions",
    $InferServerPlugin: {} as ReturnType<CoursePermissionsPlugin>,

    // Add custom actions
    getActions: ($fetch) => {
      return {
        // Check if current user has permission for an action
        hasPermission: async (data: {
          courseId: string;
          action: string;
        }) => {
          const response = await $fetch("/course-permissions/check", {
            method: "POST",
            body: data
          });
          return response;
        },

        // Grant a permission to a user
        grantPermission: async (data: {
          courseId: string;
          userId: string;
          action: string;
        }) => {
          const response = await $fetch("/course-permissions/grant", {
            method: "POST",
            body: data
          });
          return response;
        },

        // Revoke a permission from a user
        revokePermission: async (data: {
          courseId: string;
          userId: string;
          action: string;
        }) => {
          const response = await $fetch("/course-permissions/revoke", {
            method: "POST",
            body: data
          });
          return response;
        },

        // Get all permissions for a user in a course
        getUserPermissions: async (data: {
          courseId: string;
          userId: string;
        }) => {
          const response = await $fetch("/course-permissions/user", {
            method: "POST",
            body: data
          });
          return response;
        },

        // Setup default permissions for a user based on their role
        setupDefaultPermissions: async (data: {
          courseId: string;
          userId: string;
          role: "admin" | "editor" | "user";
        }) => {
          const response = await $fetch("/course-permissions/setup", {
            method: "POST",
            body: data
          });
          return response;
        }
      };
    }
  } satisfies BetterAuthClientPlugin;
};


