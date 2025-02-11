export type Lesson = {
  id: string;
  name: string;
  unitId: string;
  isPublished: "published" | "unpublished";
  pureLink: boolean;
}
