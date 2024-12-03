import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/env";

export const db = drizzle({
  client: new Pool({ connectionString: env.DATABASE_URL }),
  schema,
});
