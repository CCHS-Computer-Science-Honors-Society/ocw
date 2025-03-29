// src/lib/cache/callInvalidate.ts
import { revalidatePath } from "next/cache";
import "server-only";

/*
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
*/

export const callInvalidate = () => {
  revalidatePath("/", "layout");
};
