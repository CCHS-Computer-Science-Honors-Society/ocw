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

export const user = createTable(
  "user",
  {
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
  },
  (t) => [
    // Index on role if frequently filtering users by role
    index("user_role_idx").on(t.role),
    // Index on createdAt if frequently sorting/filtering by creation date
    index("user_created_at_idx").on(t.createdAt),
  ],
);

export const usersRelations = relations(user, ({ many }) => ({
  courses: many(courseUsers),
  accounts: many(account), // Added relation for accounts
  sessions: many(session), // Added relation for sessions
  logs: many(log), // Added relation for logs
}));

export const account = pgTable(
  "account",
  {
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
  },
  (t) => [
    // Index on the foreign key
    index("account_user_id_idx").on(t.userId),
    // Composite index for provider lookups
    index("account_provider_idx").on(t.providerId, t.accountId),
  ],
);

// Added relations for account
export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const session = pgTable(
  "session",
  {
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
  },
  (t) => [
    // Index on the foreign key
    index("session_user_id_idx").on(t.userId),
    // Index for session expiration checks/cleanup
    index("session_expires_at_idx").on(t.expiresAt),
  ],
);

// Added relations for session
export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (t) => [
    // Index for looking up verifications by identifier
    index("verification_identifier_idx").on(t.identifier),
    // Index for expiration checks/cleanup
    index("verification_expires_at_idx").on(t.expiresAt),
  ],
);

export const courses = createTable(
  "courses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    // Assuming subjectId refers to another table (not defined here)
    // Add .references(() => subjectTable.id) if subjectTable exists
    subjectId: text("subject_id").notNull(),
    name: text("name").notNull(),
    aliases: text("aliases").array().notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    imageUrl: text("image_url").default("/placeholder.svg").notNull(),
    unitLength: integer("units_length").default(0).notNull(),
    description: text("description").notNull(),
  },
  (t) => [
    // Existing indexes
    index("isPublicCourseIdx").on(t.isPublic),
    index("courseIdIdx").on(t.id), // Index on PK is usually automatic, but explicit doesn't hurt
    index("course_name_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    index("course_name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    index("course_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
    // Added index
    index("course_subject_id_idx").on(t.subjectId), // Index on subjectId FK
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
      .references(() => courses.id, { onDelete: "cascade" }), // Added onDelete
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Added onDelete
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
    // Composite primary key (implicitly creates a unique index)
    primaryKey({ columns: [t.courseId, t.userId] }),
    // Index on userId to efficiently find all courses for a user
    index("course_users_user_id_idx").on(t.userId),
    // Index on role if filtering by role within a course is common
    index("course_users_role_idx").on(t.role),
    // Optional: GIN index on permissions if querying specific permissions is needed
    // permissionsIdx: index("course_users_permissions_idx").using("gin", t.permissions),
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
      .references(() => courses.id, { onDelete: "cascade" }), // Added onDelete
    name: varchar("name", {
      length: 225,
    }).notNull(),
    description: text("description"),
    isPublished: boolean("is_published").default(false).notNull(),
    order: integer("order").notNull(),
  },
  (t) => [
    // Existing indexes
    index("unitIdIdx").on(t.id), // Index on PK is usually automatic
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
    // Added indexes
    index("unit_course_id_idx").on(t.courseId), // Index on FK
    index("unit_order_idx").on(t.order), // Index for ordering
    index("unit_is_published_idx").on(t.isPublished), // Index for filtering
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
      .references(() => courses.id, { onDelete: "cascade" }), // Added onDelete
    unitId: text("unitId")
      .notNull()
      .references(() => units.id, { onDelete: "cascade" }), // Added onDelete
    name: text("name").notNull(),
    content: jsonb("content").$type<JSONContent>(),
  },
  (t) => [
    // Existing indexes
    index("lessonIdIdx").on(t.id), // Index on PK is usually automatic
    index("units_title_search_index").using(
      // Note: Index name seems wrong, should be lesson_title?
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    index("lesson_title_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    // Added indexes
    index("lesson_course_id_idx").on(t.courseId), // Index on FK
    index("lesson_unit_id_idx").on(t.unitId), // Index on FK
    index("lesson_order_idx").on(t.order), // Index for ordering
    index("lesson_is_published_idx").on(t.isPublished), // Index for filtering
    index("lesson_content_type_idx").on(t.contentType), // Index for filtering
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
      .references(() => lessons.id, { onDelete: "cascade" }), // Added onDelete
    embedUrl: text("embed_url").notNull(),
  },
  (t) => [
    // Existing index
    index("lesson_embed_lesson_id_idx").on(t.lessonId),
  ],
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
    // Should likely be `many` if a lesson can have multiple embeds? Changed to `one` based on schema.
    fields: [lessons.id],
    references: [lessonEmbed.lessonId],
  }),
  logs: many(log),
  course: one(courses, {
    // Added relation back to course
    fields: [lessons.courseId],
    references: [courses.id],
  }),
}));

export const easyNoteCard = createTable(
  "easy_note_card",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    front: text("front").notNull(),
    // Requires pgvector extension. Choose index type (hnsw, ivfflat) and distance operator
    // Example using HNSW with L2 distance:
    // embedding: vector("embedding", { dimensions: 1536 }).notNull(), // Added notNull if required
    embedding: vector("embedding", { dimensions: 1536 }),
    options: text("options").array(),
    images: text("images").array(),
    unitId: text("unitId").references(() => units.id, {
      onDelete: "set null",
    }), // Added FK + onDelete
    chapter: integer("chapter"),
    back: text("back").notNull(),
  },
  (t) => [
    // Index on FK
    index("easy_note_card_unit_id_idx").on(t.unitId),
    // Index on chapter if used for filtering/ordering
    index("easy_note_card_chapter_idx").on(t.chapter),
    // Vector index (requires pgvector extension)
    // Choose the appropriate operator (vector_l2_ops, vector_ip_ops, vector_cosine_ops)
    index("easy_note_card_embedding_idx")
      .using("hnsw", sql`${t.embedding} vector_l2_ops`) // Or ivfflat
      .concurrently(), // Optional: build concurrently
  ],
);

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

export const log = createTable(
  "log",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // Added onDelete
    lessonId: text("lesson_id").references(() => lessons.id, {
      onDelete: "set null",
    }), // Added onDelete
    unitId: text("unit_id").references(() => units.id, {
      onDelete: "set null",
    }), // Added onDelete
    courseId: text("course_id").references(() => courses.id, {
      onDelete: "set null",
    }), // Added onDelete
    action: varchar("action", { length: 50, enum: LogAction }).notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
  },
  (t) => [
    // Indexes on foreign keys
    index("log_user_id_idx").on(t.userId),
    index("log_lesson_id_idx").on(t.lessonId),
    index("log_unit_id_idx").on(t.unitId),
    index("log_course_id_idx").on(t.courseId),
    // Index on action for filtering logs by type
    index("log_action_idx").on(t.action),
    // Index on timestamp for ordering/filtering by time
    index("log_timestamp_idx").on(t.timestamp),
    // Optional: Composite index if filtering by user AND action/timestamp is common
    // userActionIdx: index("log_user_action_idx").on(t.userId, t.action),
    // userTimestampIdx: index("log_user_timestamp_idx").on(t.userId, t.timestamp),
  ],
);

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
