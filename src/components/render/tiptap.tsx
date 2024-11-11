import Editor from "@/editor";
import { defaultEditorContent } from "@/lib/content";
import type { JSONContent } from "novel";

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

  if (isEdit) {
    return (
      <div>
        <Editor content={editorContent} readOnly={true} lessonId={title} />
      </div>
    );
  }

  return (
    <div>
      <Editor content={editorContent} readOnly={false} lessonId={title} />
    </div>
  );
}
