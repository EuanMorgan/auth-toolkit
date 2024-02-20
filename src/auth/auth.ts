import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "~/auth/config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, eq, schema } from "~/db";
import { getUserById } from "~/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  events: {
    linkAccount: async ({ user, profile, account }) => {
      await db
        .update(schema.users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(schema.users.id, user.id!));
    },
    signIn: async message => {},
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id!);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },
    async jwt({ token, user }) {
      console.log({ token });
      token.customField = "customField";
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
