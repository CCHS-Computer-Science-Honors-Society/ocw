import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { type JSONContent } from "novel";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { defaultEditorContent } from "@/lib/content";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `topsecret_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
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

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  courses: many(courseUsers),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const courses = createTable(
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
  (t) => ({
    isPublicIdx: index("isPublicCourseIdx").on(t.isPublic),

    nameTrgmIndex: index("course_name_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    // GIN Index for Full-Text Search
    nameSearchIndex: index("course_name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    descriptionSearchIndex: index("course_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  }),
);

export const courseUsers = createTable(
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
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.courseId, t.userId],
    }),
  }),
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
      length: 30,
    }).notNull(),
    description: text("description").notNull(),
    order: integer("order").notNull(),
  },
  (t) => ({
    // GIN Index for Full-Text Search
    nameTrgmIndex: index("unit_name_trgm_index")
      .using("gin", sql`${t.name} gin_trgm_ops`)
      .concurrently(),
    nameSearchIndex: index("units_name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.name})`,
    ),
    descriptionSearchIndex: index("units_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  }),
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

export const lessons = createTable(
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
  (t) => ({
    nameSearchIndex: index("units_title_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.title})`,
    ),
    nameTrgmIndex: index("lesson_title_trgm_index")
      .using("gin", sql`${t.title} gin_trgm_ops`)
      .concurrently(),
    descriptionSearchIndex: index("lessons_description_search_index").using(
      "gin",
      sql`to_tsvector('english', ${t.description})`,
    ),
  }),
);

export const lessonsRelations = relations(lessons, ({ one }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
}));
