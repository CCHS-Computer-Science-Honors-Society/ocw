import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { type JSONContent } from "novel";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { defaultEditorContent } from "@/lib/content";

export const users = pgTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  role: varchar("role", {
    length: 255,
    enum: ["admin", "user"],
  })
    .notNull()
    .default("user"),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const courses = pgTable(
  "courses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    subjectId: text("subject_id").notNull(),
    name: text("name").notNull(),
    aliases: text("aliases").array().notNull().default([]),
    isPublic: boolean("is_public").default(false).notNull(),
    imageUrl: text("image_url").default("/placeholder.png").notNull(),
    unitLength: integer("units_length").default(0).notNull(),
    description: text("description").notNull(),
  },
  (t) => [
    index("isPublicCourseIdx").on(t.isPublic),

    index("course_name_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    // GIN Index for Full-Text Search
    index("course_name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    index("course_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  ],
);

export const courseUsers = pgTable(
  "course_users",
  {
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    role: varchar("role", {
      length: 255,
      enum: ["admin", "editor", "user"],
    })
      .notNull()
      .default("user"),
  },
  (t) => [
    primaryKey({
      columns: [t.courseId, t.userId],
    }),
  ],
);

export const courseUsersRelations = relations(courseUsers, ({ one }) => ({
  course: one(courses, {
    fields: [courseUsers.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [courseUsers.userId],
    references: [users.id],
  }),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  units: many(units),
  users: many(courseUsers),
}));

export const units = pgTable(
  "units",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    courseId: text("courseId")
      .notNull()
      .references(() => courses.id),
    name: varchar("name", {
      length: 30,
    }).notNull(),
    description: text("description").notNull(),
    order: integer("order").notNull(),
  },
  (t) => [
    // GIN Index for Full-Text Search
    index("unit_name_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    index("units_name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    index("units_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  ],
);

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const contentTypeEnum = pgEnum("content_type", [
  "google_docs",
  "notion",
  "quizlet",
  "tiptap",
]);

export const lessons = pgTable(
  "lessons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    position: integer("position").notNull(),
    contentType: contentTypeEnum("content_type").notNull().default("tiptap"),
    embedId: text("embedId"),
    description: text("description").notNull(),
    content: jsonb("content")
      .$type<JSONContent>()
      .default(defaultEditorContent),
    unitId: text("unitId")
      .notNull()
      .references(() => units.id),
    title: text("title").notNull(),
  },
  (t) => [
    index("units_title_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.title})`,
    ),
    index("lesson_title_trgm_index")
      .using("gin", sql`${t.title} gin_trgm_ops`)
      .concurrently(),
    index("lessons_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  ],
);

export const lessonsRelations = relations(lessons, ({ one }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
}));
