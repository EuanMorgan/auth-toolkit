import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as auth from "./schema/auth";
import { env } from "~/env";

export const schema = {
  ...auth,
};

export * from "drizzle-orm";

const sql = neon(env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, {
  logger: true,
  schema,
});
