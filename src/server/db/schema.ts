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
  vector,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTable;

export const user = createTable("user", {
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
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(user, ({ many }) => ({
  courses: many(courseUsers),
}));

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const courses = createTable(
  "courses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    subjectId: text("subject_id").notNull(),
    name: text("name").notNull(),
    aliases: text("aliases").array().notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    imageUrl: text("image_url").default("/placeholder.svg").notNull(),
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

export type SelectCourses = typeof courses.$inferSelect;
export type Courses = Pick<
  SelectCourses,
  "id" | "name" | "description" | "imageUrl"
>;

export const coursePermissionAction = [
  "create_unit",
  "edit_unit",
  "delete_unit",
  "create_lesson",
  "edit_lesson",
  "delete_lesson",
  "reorder_lesson",
  "manage_users",
  "manage_course",
] as const;

export type CoursePermissionAction = (typeof coursePermissionAction)[number];

export const courseUsers = createTable(
  "course_users",
  {
    courseId: text("course_id")
      .notNull()
      .references(() => courses.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    role: varchar("role", {
      length: 255,
      enum: ["admin", "editor", "user"],
    })
      .notNull()
      .default("user"),
    permissions: varchar("permissions", {
      length: 100,
      enum: coursePermissionAction,
    }).array(),
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
  user: one(user, {
    fields: [courseUsers.userId],
    references: [user.id],
  }),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  units: many(units),
  users: many(courseUsers),
  logs: many(log),
}));

export const units = createTable(
  "units",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    courseId: text("courseId")
      .notNull()
      .references(() => courses.id),
    name: varchar("name", {
      length: 225,
    }).notNull(),
    description: text("description").notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
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
  flashcards: many(easyNoteCard),
  logs: many(log),
}));

export const contentTypeEnum = pgEnum("content_type", [
  "google_docs",
  "notion",
  "quizlet",
  "tiptap",
  "flashcard",
]);

export const ContentTypeEnum = contentTypeEnum.enumValues;
export type ContentTypeEnum = (typeof ContentTypeEnum)[number];

export const lessons = createTable(
  "lessons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    order: integer("order").notNull(),
    isPublished: boolean("isPublished").default(false).notNull(),
    pureLink: boolean("pure_link").default(false).notNull(),
    contentType: contentTypeEnum("content_type").notNull(),
    courseId: text("courseId")
      .notNull()
      .references(() => courses.id),
    unitId: text("unitId")
      .notNull()
      .references(() => units.id),
    name: text("name").notNull(),
    content: jsonb("content").$type<JSONContent>(),
  },
  (t) => [
    index("units_title_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    index("lesson_title_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
  ],
);

export const lessonEmbed = createTable(
  "lesson_embed",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    password: text("password"),
    lessonId: text("lessonId")
      .notNull()
      .references(() => lessons.id),
    embedUrl: text("embed_url").notNull(),
  },
  (t) => [index("lesson_embed_lesson_id_idx").on(t.lessonId)],
);
export const lessonEmbedRelations = relations(lessonEmbed, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonEmbed.lessonId],
    references: [lessons.id],
  }),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  embeds: one(lessonEmbed, {
    fields: [lessons.id],
    references: [lessonEmbed.lessonId],
  }),
  logs: many(log),
}));

export const easyNoteCard = createTable("easy_note_card", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  front: text("front").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }),
  options: text("options").array(),
  images: text("images").array(),
  unitId: text("unitId"),
  chapter: integer("chapter"),
  back: text("back").notNull(),
});

export const easyNoteCardRelations = relations(easyNoteCard, ({ one }) => ({
  unit: one(units, {
    fields: [easyNoteCard.unitId],
    references: [units.id],
  }),
}));

export const LogAction = [
  "CREATE_LESSON",
  "UPDATE_LESSON",
  "DELETE_LESSON",
  "CREATE_COURSE",
  "UPDATE_COURSE",
  "DELETE_COURSE",
  "CREATE_UNIT",
  "UPDATE_UNIT",
  "DELETE_UNIT",
  "REORDER_UNIT",
  "REORDER_LESSON",
  "DELETE_USER",
  "UPDATE_USER",
] as const;

export type LogActionType = (typeof LogAction)[number];

export const log = createTable("log", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  lessonId: text("lesson_id").references(() => lessons.id),
  unitId: text("unit_id").references(() => units.id),
  courseId: text("course_id").references(() => courses.id),
  action: varchar("action", { length: 50, enum: LogAction }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export type InsertLog = typeof log.$inferInsert;

export const logRelations = relations(log, ({ one }) => ({
  user: one(user, {
    fields: [log.userId],
    references: [user.id],
  }),
  course: one(courses, {
    fields: [log.courseId],
    references: [courses.id],
  }),
  unit: one(units, {
    fields: [log.unitId],
    references: [units.id],
  }),
  lesson: one(lessons, {
    fields: [log.lessonId],
    references: [lessons.id],
  }),
}));
