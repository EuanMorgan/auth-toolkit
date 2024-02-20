import type { DefaultSession } from "next-auth";
import { type schema } from "../db";

type Role = (typeof schema.users.$inferSelect)["role"];
declare module "next-auth" {
  interface User {
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
// This is needed to get the types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
