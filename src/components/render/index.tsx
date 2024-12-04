import type { Lesson } from "@/server/api/scripts/lessons";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";

const TiptapLesson = dynamic(
  () => import("./tiptap").then((mod) => mod.TiptapLesson),
  {
    loading: () => <p>Loading...</p>,
  },
);

const GoogleDocsLesson = dynamic(
  () => import("./google-docs").then((mod) => mod.GoogleDocsEmbed),
  {
    loading: () => <p>Loading...</p>,
  },
);

const QuizletEmbed = dynamic(
  () => import("./quizlet").then((mod) => mod.QuizletEmbed),
  {
    loading: () => <p>Loading...</p>,
  },
);

const Notion = dynamic(() => import("./notion").then((mod) => mod.Notion), {
  loading: () => <p>Loading...</p>,
});

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
          title={lesson.name}
          isEdit={readOnly}
        />
      );
    case "quizlet":
      return (
        <QuizletEmbed
          password={lesson.quizletPassword}
          embedId={lesson.embedId}
        />
      );
    case "notion":
      return (
        <div>
          <Notion embedId={lesson.embedId} />
        </div>
      );
    case "google_docs":
      return (
        <GoogleDocsLesson
          embedId={lesson.embedId}
          password={lesson.quizletPassword}
        />
      );
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
