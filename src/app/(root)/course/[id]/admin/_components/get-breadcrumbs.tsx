import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

export const GetBreadbrumbs = () => {
  const { id: courseId, unitId, lessonId } = useParams();

  if (typeof unitId === "string") {
    return <Breadcrumb></Breadcrumb>;
  } else if (typeof lessonId === "string") {
  }

  return <Breadcrumb></Breadcrumb>;
};

const UnitBreadcumb = ({
  unitId,
  courseId,
}: {
  courseId: string;
  unitId: string;
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbList>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbLink link={`/course/${courseId}/admin/`}>
          {name}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbLink link={`/course/${courseId}/admin/unit/${unitId}`}>
          {unitName}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
