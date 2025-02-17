import { db } from "@/server/db";
import { type InsertLog, log } from "@/server/db/schema";

export const insertLog = async (newLog: InsertLog) => {
  console.log("INSERTING LOG:", newLog);
  await db.insert(log).values(newLog);
};
