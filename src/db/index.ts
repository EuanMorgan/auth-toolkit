import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as auth from "./schema/auth";

export const schema = {
  ...auth,
};

export * from "drizzle-orm";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, {
  logger: true,
  schema,
});
