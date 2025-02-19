import { type RouterOutputs } from "@/trpc/react";

export type Unit = RouterOutputs["units"]["getTableData"][0];

export type Lesson = RouterOutputs["lesson"]["getTableData"][0];
