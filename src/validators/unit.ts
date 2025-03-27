import { units } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const createUnit = createInsertSchema(units).extend({
  order: z.number().optional(),
});

export const createUnitForm = createUnit.omit({
  id: true,
  courseId: true,
  description: true,
  order: true,
});

export type CreateUnitForm = z.infer<typeof createUnitForm>;
