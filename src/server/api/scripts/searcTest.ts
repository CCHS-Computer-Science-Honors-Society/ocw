import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { performSearch } from "./search";
import { db } from "@/server/db";
import { courses, units, lessons } from "@/server/db/schema";

vi.mock("@/server/db", () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
  },
}));

describe("Search functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should perform search with valid query", async () => {
    const mockResults = {
      courses: [{ id: 1, name: "Test Course" }],
      units: [{ id: 1, name: "Test Unit" }],
      lessons: [{ id: 1, name: "Test Lesson" }],
    };

    db.select().from().where().limit.mockResolvedValueOnce(mockResults.courses);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.units);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.lessons);

    const result = await performSearch("test query");

    expect(result).toEqual(mockResults);
    expect(db.select).toHaveBeenCalledTimes(3);
  });

  it("should handle empty search query", async () => {
    const emptyResults = {
      courses: [],
      units: [],
      lessons: [],
    };

    db.select().from().where().limit.mockResolvedValueOnce([]);
    db.select().from().where().limit.mockResolvedValueOnce([]);
    db.select().from().where().limit.mockResolvedValueOnce([]);

    const result = await performSearch("");

    expect(result).toEqual(emptyResults);
  });

  it("should handle multiple word queries", async () => {
    const mockResults = {
      courses: [{ id: 1, name: "Advanced Test Course" }],
      units: [{ id: 1, name: "Advanced Test Unit" }],
      lessons: [{ id: 1, name: "Advanced Test Lesson" }],
    };

    db.select().from().where().limit.mockResolvedValueOnce(mockResults.courses);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.units);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.lessons);

    const result = await performSearch("advanced test");

    expect(result).toEqual(mockResults);
    expect(db.select).toHaveBeenCalledTimes(3);
  });

  it("should respect the limit of 10 results per category", async () => {
    const mockResults = {
      courses: Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `Course ${i}`,
      })),
      units: Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `Unit ${i}`,
      })),
      lessons: Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `Lesson ${i}`,
      })),
    };

    db.select().from().where().limit.mockResolvedValueOnce(mockResults.courses);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.units);
    db.select().from().where().limit.mockResolvedValueOnce(mockResults.lessons);

    const result = await performSearch("test");

    expect(result.courses).toHaveLength(10);
    expect(result.units).toHaveLength(10);
    expect(result.lessons).toHaveLength(10);
  });
});
