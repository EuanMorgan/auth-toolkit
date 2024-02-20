import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";

import * as auth from "./schema/auth";

export const schema = {
  ...auth,
};

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, {
  logger: true,
  schema,
});

migrate(db, {
  migrationsFolder: "src/db/drizzle",
});
