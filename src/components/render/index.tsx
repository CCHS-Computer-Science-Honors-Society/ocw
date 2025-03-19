import type { Lesson } from "@/server/api/scripts/lessons";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { FlashcardPage } from "./flashcard-page";
import type { Session } from "@/server/auth";

const Loading = () => (<Skeleton className="w-full h-full">
</Skeleton>)

const GoogleDocsLesson = dynamic(
  () => import("./google-docs").then((mod) => mod.GoogleDocsEmbed),
  {
    loading: () => <Loading />,
    ssr: true,
  },
);

const QuizletEmbed = dynamic(
  () => import("./quizlet").then((mod) => mod.QuizletEmbed),
  {
    loading: () => <Loading />,
    ssr: true,

  },
);

const Notion = dynamic(() => import("./notion").then((mod) => mod.Notion), {
  loading: () => <Loading />,
  ssr: true,
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
      return <GoogleDocsLesson embedId={lesson.embedId} />;
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
