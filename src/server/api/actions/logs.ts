import { db } from "@/server/db";
import { type InsertLog, log } from "@/server/db/schema";

export const insertLog = async (newLog: InsertLog) => {
  try {
    if (!newLog.userId || !newLog.action) {
      throw new Error("Invalid log entry: missing required fields");
    }
    await db.insert(log).values(newLog);
  } catch (error) {
    // Consider using a proper logging service instead of console
    console.error("Failed to insert log:", error);
    throw error;
  }
};
