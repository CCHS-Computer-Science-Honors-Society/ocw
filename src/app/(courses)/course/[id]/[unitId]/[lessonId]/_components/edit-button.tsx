import { checkIsEdit } from "@/components/render";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { auth } from "@/server/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default async function EditButton({
  params,
}: {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}) {
  const { lessonId, id } = await params;

  const session = await auth();

  const hasEdit = checkIsEdit(session, id);

  if (!hasEdit) return null;
  return (
    <div className="relative min-h-screen">
      <Link
        href={`/course/${id}/admin/lesson/${lessonId}`}
        className={cn(
          buttonVariants({ variant: "default", size: "icon" }),
          "fixed bottom-4 right-4 rounded-full shadow-lg transition-shadow duration-200 hover:shadow-xl",
        )}
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Link>
    </div>
  );
}

export const EditButtonSkeleton = () => {
  return (
    <div className="relative min-h-screen">
      <Skeleton className="h-4 w-4 animate-pulse rounded-full bg-muted" />
    </div>
  );
};
