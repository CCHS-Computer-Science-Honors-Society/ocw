export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
    unitId: string;
    lessonId: string;
  }>;
}) {
  const lessonId = (await params).lessonId;
  return <div>{lessonId}</div>;
}
