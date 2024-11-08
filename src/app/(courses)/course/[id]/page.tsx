import CoursePage from "./_components/course-units";

export default function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <div>
      <CoursePage params={params} />
    </div>
  );
}
