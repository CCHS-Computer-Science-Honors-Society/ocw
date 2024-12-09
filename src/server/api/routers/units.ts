import { z } from "zod";
import { protectedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { asc, eq } from "drizzle-orm";
import { units } from "@/server/db/schema";

export const unitsRouter = createTRPCRouter({
  getUnitsForDashboard: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.units.findMany({
        columns: {
          id: true,
          name: true,
          order: true,
          isPublished: true,
        },
        where: eq(units.courseId, input.courseId),
        orderBy: asc(units.order),
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        data: z.object({
          id: z.string(),
          name: z.string().optional(),
          description: z.string().optional(),
          position: z.number().optional(),
          isPublished: z.boolean().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data } = input;

      const { id } = data;

      await ctx.db.update(units).set(data).where(eq(units.id, id));
    }),
  reorder: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            position: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const updates = input.data.map((item) =>
          tx
            .update(units)
            .set({ order: item.position })
            .where(eq(units.id, item.id)),
        );

        await Promise.all(updates);
      });
    }),
  getMinimalUnit: publicProcedure
    .input(z.object({ unitId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.units.findFirst({
        columns: {
          id: true,
          name: true,
          description: true,
          isPublished: true,
        },
        where: eq(units.id, input.unitId),
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        name: z.string(),
        description: z.string(),
        position: z.number().optional(),
        isPublished: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(units).values({
        ...input,
        order: input.position ?? 1000,
        isPublished: input.isPublished ?? false,
      });
    }),
});
