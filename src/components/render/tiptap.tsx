"use client";
import Editor from "@/editor";
import { defaultEditorContent } from "@/lib/content";
import type { JSONContent } from "novel";
import { useParams } from "next/navigation";

export function TiptapLesson({
  content,
  title,
  isEdit,
  descirption,
}: {
  content: JSONContent | null;
  title: string;
  isEdit: boolean;
  descirption: string;
}) {
  const editorContent = content ?? defaultEditorContent;
  const { lessonId } = useParams();
  console.log(lessonId);

  if (isEdit) {
    return (
      <div>
        <Editor
          content={editorContent}
          readOnly={true}
          lessonId={lessonId! as string}
        />
      </div>
    );
  }

  return (
    <div>
      <Editor content={editorContent} readOnly={false} lessonId={title} />
    </div>
  );
}
