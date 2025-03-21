import { createAuthClient } from "better-auth/react";
import { coursePermissionsClientPlugin } from "./plugin/permission/client";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL!, // Optional if the API base URL matches the frontend,
  plugins: [coursePermissionsClientPlugin()],
});

export const {
  signIn,
  signOut,
  useSession,
  hasPermission,
  revokePermission,
  grantPermission,
} = authClient;
