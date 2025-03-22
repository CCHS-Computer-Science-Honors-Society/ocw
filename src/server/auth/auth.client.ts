import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { coursePermissionsClientPlugin } from "./plugin/permission/client";
import { auth } from ".";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL!, // Optional if the API base URL matches the frontend,
  plugins: [
    coursePermissionsClientPlugin(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const {
  signIn,
  signOut,
  useSession,
  hasPermission,
  revokePermission,
  grantPermission,
} = authClient;
