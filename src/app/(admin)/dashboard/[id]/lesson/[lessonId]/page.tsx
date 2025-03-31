import RenderLesson from "@/components/render";
import { getLesson } from "@/server/api/scripts/lessons";
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
  const [lesson] = await Promise.all([getLesson(lessonId)]);

  if (!lesson) {
    return notFound();
  }
  return (
    <main>
      <div className="container mx-auto flex flex-row py-10">
        <div className="flex w-1/2 flex-col"></div>
        <div className="flex w-1/2 flex-col">
          <RenderLesson
            lesson={lesson}
            courseId={id}
            session={null}
            isDisplay={false}
          />
        </div>
      </div>
    </main>
  );
}
