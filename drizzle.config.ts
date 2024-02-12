import type { Config } from "drizzle-kit";
export default {
  schema: "./src/db/schema",
  out: "./src/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
