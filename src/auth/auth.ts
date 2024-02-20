import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import authConfig from "~/auth/config";
import { getUserById } from "~/data/user";
import { db, eq, schema } from "~/db";

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
    linkAccount: async ({ user }) => {
      // TODO: Check if email is verified from provider
      await db
        .update(schema.users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(schema.users.id, user.id!));
    },
    // signIn: async message => {},
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      // Prevent sign in if email is not verified

      // If not credentials provider, check if email is verified by provider
      if (account?.provider !== "credentials") {
        return !!profile?.email_verified;
      }

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) {
        return false;
      }
      // TODO: Add 2fa check

      return true;
    },
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
