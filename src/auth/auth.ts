import NextAuth from "next-auth";
import authConfig from "~/auth/config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/db";
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
});
