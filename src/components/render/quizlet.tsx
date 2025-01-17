"use client";

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
        <button className="mt-2 rounded border px-4 py-2 hover:bg-gray-100">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Open Original Set
          </a>
        </button>
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
