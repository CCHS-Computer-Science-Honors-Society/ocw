import type { Lesson } from "@/server/api/scripts/lessons";
import { FlashcardPage } from "./flashcard-page";
import type { Session } from "@/server/auth";
import { QuizletEmbed } from "./quizlet";
import { Notion } from "./notion";
import { GoogleDocsEmbed } from "./google-docs";

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
      return <GoogleDocsEmbed embedId={lesson.embedId} />;
    case "flashcard":
      return <FlashcardPage unitId={lesson.unitId} />;
  }
}

export function checkIsEdit(session: Session | null, courseId: string) {
  if (!session) return false;
  const { user } = session;
  if (!user) return false;

  const isAdmin = user.role === "admin";
  //TODO: impl after new auth

  return isAdmin;
}
