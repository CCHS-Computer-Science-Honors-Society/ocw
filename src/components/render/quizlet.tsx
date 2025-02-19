"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function QuizletEmbed({
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
    <div className="flex h-screen flex-col">
      <div className="flex flex-row items-center justify-between p-4">
        <h3 className="text-3xl font-bold">Quizlet (Flashcards)</h3>
        <Link
          href={embedId}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Open in new tab
        </Link>
        {password ? (
          <p className="ml-4 text-gray-600">Password: {password}</p>
        ) : null}
      </div>
      <div className="flex-grow">
        <iframe
          loading="eager"
          src={url}
          className="h-full w-full border-0"
        ></iframe>
      </div>
    </div>
  );
}
