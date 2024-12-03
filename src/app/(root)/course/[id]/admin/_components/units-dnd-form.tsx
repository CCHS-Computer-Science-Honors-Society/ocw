"use client";

import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { api } from "@/trpc/react";
import { UnitsList } from "./units-dnd";

interface UnitsFormProps {
  courseId: string;
}

export const UnitsForm = ({ courseId }: UnitsFormProps) => {
  const utils = api.useUtils();
  const [initialData] = api.units.getUnitsForDashboard.useSuspenseQuery({
    courseId,
  });
  const { mutate: update, isPending: isUpdating } =
    api.units.reorder.useMutation({
      onSuccess: () => {
        void utils.units.invalidate();
      },
    });
  const router = useRouter();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    update({
      courseId,
      data: updateData,
    });
  };

  const onEdit = (id: string) => {
    router.push(`/course/${courseId}/admin/unit/${id}`);
  };

  return (
    <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Units
      </div>

      <div
        className={cn(
          "mt-2 text-sm",
          !initialData.length && "italic text-slate-500",
        )}
      >
        {!initialData.length && "No Units"}
        <UnitsList
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
