import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { env } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
        fieldName: "role",
        required: true
      }
    }
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET
    }
  }
});

export type Session = typeof auth.$Infer.Session;
