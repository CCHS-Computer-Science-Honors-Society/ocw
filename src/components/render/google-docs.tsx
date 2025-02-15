import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function GoogleDocsEmbed({
  embedId,
  password,
}: {
  embedId: string | null;
  password: string | null;
}) {
  if (!embedId) return <div>Invalid Quizlet Embed</div>;

  return (
    <div className="flex h-screen flex-col">
      {/* Make the iframe take up most of the screen */}
      <iframe
        src={embedId}
        className="h-[87vh] w-full rounded-xl border-muted shadow-2xl"
      />

      {/* Keep the header section */}
      <div className="flex flex-row items-center justify-between p-4">
        <h3 className="text-3xl font-bold">Google Docs</h3>
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
    </div>
  );
}
