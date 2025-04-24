"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { useTRPC } from "@/trpc/react";
import { UnitsList } from "./units-dnd";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface UnitsFormProps {
  courseId: string;
}

export const UnitsForm = ({ courseId }: UnitsFormProps) => {
  const api = useTRPC();
  const queryClient = useQueryClient();
  const { data: initialData } = useSuspenseQuery(
    api.units.getUnitsForDashboard.queryOptions({
      courseId,
    }),
  );
  const { mutate: update, isPending: isUpdating } = useMutation(
    api.units.reorder.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries(api.units.pathFilter());
      },
    }),
  );
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
        <div className="rounded-m absolute top-0 right-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Units
      </div>

      <div
        className={cn(
          "mt-2 text-sm",
          !initialData.length && "text-slate-500 italic",
        )}
      >
        {!initialData.length && "No Units"}
        <UnitsList
          onEdit={onEdit}
          onReorder={onReorder}
          items={initialData ?? []}
        />
      </div>
      <p className="text-muted-foreground mt-4 text-xs">
        Drag and drop to reorder the units.
      </p>
    </div>
  );
};
