import { z } from "zod";
import {
  protectedProcedure,
  createPermissionCheckMiddleware,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";
import { asc, eq, max } from "drizzle-orm";
import { units } from "@/server/db/schema";
import { insertLog } from "../actions/logs";
import { TRPCError } from "@trpc/server";
import { after } from "next/server";
import { createUnit } from "@/validators/unit";
import { callInvalidate } from "@/lib/cache/callInvalidate";

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
          courseId: z.string().optional(),
          name: z.string().optional(),
          description: z.string().optional(),
          position: z.number().optional(),
          isPublished: z.boolean().optional(),
        }),
      }),
    )
    .use(createPermissionCheckMiddleware("edit_unit"))
    .mutation(async ({ ctx, input }) => {
      const { data } = input;

      const { id } = data;

      const updatedUnit = await ctx.db
        .update(units)
        .set(data)
        .where(eq(units.id, id))
        .returning({
          id: units.id,
          courseId: units.courseId,
        });
      if (!updatedUnit[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Unit not found",
        });
      }

      callInvalidate();
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "UPDATE_UNIT",
        });
      });
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
    .use(createPermissionCheckMiddleware("edit_unit"))
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

      callInvalidate();
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "REORDER_UNIT",
          courseId: input.courseId,
        });
      });
    }),

  getMinimalUnit: protectedProcedure
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
    .input(createUnit)
    .use(createPermissionCheckMiddleware("edit_unit"))
    .mutation(async ({ input, ctx }) => {
      const [maxOrder] = await ctx.db
        .select({
          maxOrder: max(units.order),
        })
        .from(units)
        .where(eq(units.courseId, input.courseId));

      const [newUnit] = await ctx.db
        .insert(units)
        .values({
          ...input,
          order: maxOrder?.maxOrder ? maxOrder.maxOrder + 1 : 1,
        })
        .returning();
      if (!newUnit) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create unit",
        });
      }

      callInvalidate();
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "CREATE_UNIT",
          courseId: newUnit?.courseId,
          unitId: newUnit?.id,
        });
      });
    }),

  getTableData: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select({
          id: units.id,
          name: units.name,
          courseId: units.courseId,
          isPublished: units.isPublished,
        })
        .from(units)
        .orderBy(asc(units.order))
        .where(eq(units.courseId, input.courseId));
      return data;
    }),
});
