import { type MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { units, lessons, courses } from "@/server/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://creekocw.com";

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contributors`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flashcards`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/tos`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  const [allCourses, allUnits, allLessons] = await Promise.all([
    db
      .select({
        id: courses.id,
      })
      .from(courses)
      .where(eq(courses.isPublic, true)),
    db
      .select({
        id: units.id,
        courseId: units.courseId,
      })
      .from(units)
      .where(eq(units.isPublished, true)),
    db
      .select({
        id: lessons.id,
        courseId: lessons.courseId,
        unitId: lessons.unitId,
      })
      .from(lessons)
      .where(eq(lessons.isPublished, true)),
  ]);

  const courseRoutes = allCourses.map((course) => ({
    url: `${baseUrl}/course/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const unitRoutes = allUnits.map((unit) => ({
    url: `${baseUrl}/course/${unit.courseId}/${unit.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const lessonRoutes = allLessons.map((lesson) => ({
    url: `${baseUrl}/course/${lesson.courseId}/${lesson.unitId}/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...unitRoutes, ...lessonRoutes];
}
