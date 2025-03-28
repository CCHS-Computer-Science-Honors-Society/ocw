// src/lib/cache/callInvalidate.ts
import "server-only";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const callInvalidate = async (id: string) => {
  const url = `${baseUrl}/api/revalidate/${encodeURIComponent(id)}`;
  console.log(`Calling revalidation API: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Ensure we don't cache the revalidation request
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed with status ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
};
