import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "~/auth/config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, schema } from "~/db";
import { getUserById } from "~/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
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
