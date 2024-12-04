"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export function GoogleDocsEmbed({
  embedId,
  password,
}: {
  embedId: string | null;
  password: string | null;
}) {
  if (!embedId) return <div>Invalid Quizlet Embed</div>;

  const url = embedId;
  console.log("url" + url);

  return (
    <div className="mx-auto h-screen w-full py-10">
      <Card className="mb-4">
        <CardHeader className="text-3xl font-bold">Google Docs</CardHeader>
        <CardContent className="p-0">
          <iframe
            src={url}
            height="500"
            width="100%"
            style={{ border: 0 }}
          ></iframe>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-between">
        <Button className="mt-4" asChild>
          <Link href={url} as="a" target="_blank" rel="noopener noreferrer">
            Open Original Document
          </Link>
        </Button>
        {password ? <p>Password: {password}</p> : null}
      </div>
    </div>
  );
}
//
