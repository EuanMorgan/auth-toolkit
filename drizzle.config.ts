import type { Config } from "drizzle-kit";
import { env } from "~/env";
export default {
  schema: "./src/db/schema",
  out: "./src/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DRIZZLE_DATABASE_URL,
  },
} satisfies Config;
