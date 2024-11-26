import { checkIsEdit } from "@/components/render";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { auth } from "@/server/auth";
import { Skeleton } from "@/components/ui/skeleton";

function getLink(id: string, unitId?: string, lessonId?: string) {
  if (lessonId) {
    return `/course/${id}/admin/lesson/${lessonId}`;
  }
  if (unitId) {
    return `/course/${id}/admin/unit/${unitId}`;
  }
  return `/course/${id}/admin`;
}

export default async function EditButton({
  params,
}: {
  params: Promise<{
    id: string;
    lessonId?: string;
    unitId?: string;
  }>;
}) {
  const { lessonId, unitId, id } = await params;

  const link = getLink(id, unitId, lessonId);
  const session = await auth();

  const hasEdit = checkIsEdit(session, id);

  if (!hasEdit) return null;
  return (
    <div className="relative">
      <Link
        href={link}
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
