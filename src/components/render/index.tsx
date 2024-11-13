import type { Lesson } from "@/server/api/scripts/lessons";
import type { Session } from "next-auth";
import { TiptapLesson } from "./tiptap";
import { Notion } from "./notion";

export default function RenderLesson({
  lesson,
  courseId,
  session,
  isDisplay,
}: {
  lesson: Lesson;
  courseId: string;
  session: Session | null;
  isDisplay: boolean;
}) {
  if (!lesson) return null;

  let readOnly = true;

  if (isDisplay) {
    readOnly = true;
  }

  if (checkIsEdit(session, courseId) === true && isDisplay === false) {
    readOnly = false;
  }

  switch (lesson.contentType) {
    case "tiptap":
      return (
        <TiptapLesson
          content={lesson.content}
          title={lesson.title}
          isEdit={readOnly}
          descirption={lesson.description}
        />
      );
    case "quizlet":
      return <div>Quizlet Dawg</div>;
    case "notion":
      return (
        <div>
          <Notion embedId={lesson.embedId} />
        </div>
      );
    case "google_docs":
      return <div>Google Docs Dawg</div>;
  }
}

export function checkIsEdit(session: Session | null, courseId: string) {
  if (!session) return false;
  const { user } = session;
  if (!user) return false;

  const isAdmin = user.role === "admin";
  const isCourseAdminOrEditor =
    user.courses?.[courseId] === "admin" ||
    user.courses?.[courseId] === "editor";

  return isAdmin || isCourseAdminOrEditor;
}
