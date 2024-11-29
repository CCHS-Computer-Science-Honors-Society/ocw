import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import type { CourseRole, UserRole } from "./types";

async function userStatus(id: string) {
  const session = {
    user: {
      id: id,
    },
  };
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
    columns: {
      role: true,
      id: true,
    },
  });

  const courseRosel = await db.query.courseUsers.findMany({
    where: (courseUsers, { eq }) => eq(courseUsers.userId, session.user.id),
    columns: {
      role: true,
      courseId: true,
    },
  });

  return {
    role: user?.role ?? "user",
    courses: courseRosel.reduce(
      (acc, curr) => {
        acc[curr.courseId] = curr.role;
        return acc;
      },
      {} as Record<string, CourseRole>,
    ),
  };
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      courses?: Record<string, CourseRole>;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    DiscordProvider,
    GoogleProvider,

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: async ({ session, user }) => {
      const data = await userStatus(user.id);
      return {
        ...session,
        user: {
          ...session.user,
          role: data.role,
          courses: data.courses ?? undefined,
          id: user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
