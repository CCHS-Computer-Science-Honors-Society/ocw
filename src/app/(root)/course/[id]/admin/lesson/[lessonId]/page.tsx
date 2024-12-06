import RenderLesson from "@/components/render";
import { getLesson } from "@/server/api/scripts/lessons";
import { auth } from "@/server/auth";
import { UpdateLesson } from "./_components/form";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{
    lessonId: string;
    id: string;
  }>;
}) {
  const { lessonId, id } = await params;
  const [lesson, session] = await Promise.all([getLesson(lessonId), auth()]);

  if (!lesson) {
    return notFound();
  }
  return (
    <main>
      <div className="container mx-auto flex flex-row py-10">
        <div className="flex w-1/2 flex-col">
          <UpdateLesson
            defaultValues={{
              id: lesson.id,
              name: lesson.name,
              isPublished: lesson.isPublished,
              embedId: lesson.embedId ?? undefined,
              contentType: lesson.contentType,
            }}
          />
        </div>
        <div className="flex w-1/2 flex-col">
          <RenderLesson
            lesson={lesson}
            courseId={id}
            session={session}
            isDisplay={false}
          />
        </div>
      </div>
    </main>
  );
}
