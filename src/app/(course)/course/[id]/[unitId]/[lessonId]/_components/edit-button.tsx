import { checkIsEdit } from "@/components/render";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/server/auth/auth.server";

function getLink(id: string, unitId?: string, lessonId?: string) {
  if (lessonId) {
    return `/dashboard/${id}/lesson/${lessonId}`;
  }
  if (unitId) {
    return `/dashboard/${id}/unit/${unitId}`;
  }
  return `/dashboard/${id}`;
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
  const session = await getSession();

  const hasEdit = checkIsEdit(session, id);

  if (!hasEdit) return null;
  return (
    <div className="relative">
      <Link
        prefetch
        href={link}
        className={cn(
          buttonVariants({ variant: "default", size: "icon" }),
          "fixed right-4 bottom-4 rounded-full shadow-lg transition-shadow duration-200 hover:shadow-xl",
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
      <Skeleton className="bg-muted h-4 w-4 animate-pulse rounded-full" />
    </div>
  );
};
