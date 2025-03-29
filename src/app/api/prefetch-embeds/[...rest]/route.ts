import { type NextRequest, NextResponse } from "next/server";
import { parseHTML } from "linkedom";

export const dynamic = "force-static";

function getHostname() {
  if (process.env.NODE_ENV === "development") {
    return "localhost:3000";
  }
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }
  return process.env.VERCEL_BRANCH_URL;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ rest: string[] }> }
) {
  const schema = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = getHostname();
  if (!host) {
    return new Response("Failed to get hostname from env", { status: 500 });
  }
  const href = (await params).rest.join("/");
  if (!href) {
    return new Response("Missing url parameter", { status: 400 });
  }
  const url = `${schema}://${host}/${href}`;
  const response = await fetch(url);
  if (!response.ok) {
    return new Response("Failed to fetch", { status: response.status });
  }
  const body = await response.text();
  const { document } = parseHTML(body);
  const embeds = Array.from(document.querySelectorAll("main iframe"))
    .map((iframe) => ({
      src: iframe.getAttribute("src"),
      loading: iframe.getAttribute("loading") || "lazy",
      title: iframe.getAttribute("title") || "",
    }))
    .filter((embed) => embed.src);

  return NextResponse.json(
    { embeds },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
