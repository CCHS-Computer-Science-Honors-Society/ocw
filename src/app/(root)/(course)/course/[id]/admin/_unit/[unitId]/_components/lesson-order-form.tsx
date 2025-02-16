"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { api } from "@/trpc/react";
import { LessonsList } from "./lessons-dnd";

interface LessonsFormProps {
  unitId: string;
  courseId: string;
}

export const LessonOrderForm = ({ unitId, courseId }: LessonsFormProps) => {
  const utils = api.useUtils();
  const [initialData] = api.lesson.getLessonsForDashboard.useSuspenseQuery({
    unitId,
  });
  const { mutate: update, isPending: isUpdating } =
    api.lesson.reorder.useMutation({
      onSuccess: () => {
        void utils.units.invalidate();
      },
    });
  const router = useRouter();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    update({
      courseId,
      unitId,
      data: updateData,
    });
  };

  const onEdit = (id: string) => {
    router.push(`/course/${courseId}/admin/lesson/${id}`);
  };

  return (
    <div className="mt-6 h-full w-full rounded-md border bg-slate-100 p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Lessons
      </div>

      <div
        className={cn(
          "mt-2 text-sm",
          !initialData.length && "italic text-slate-500",
        )}
      >
        {!initialData.length && "No Lessons"}
        <LessonsList
          onEdit={onEdit}
          onReorder={onReorder}
          items={initialData ?? []}
        />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Drag and drop to reorder the units.
      </p>
    </div>
  );
};
