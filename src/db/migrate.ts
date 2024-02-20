import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";

import * as auth from "./schema/auth";
import { env } from "~/env";

export const schema = {
  ...auth,
};

const sql = neon(env.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, {
  logger: true,
  schema,
});

console.log("🚀 Migrating database...");

await migrate(db, {
  migrationsFolder: "src/db/drizzle",
});

console.log("✅ Migrations complete");

process.exit(0);
