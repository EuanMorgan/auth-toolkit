import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "~/data/user";
import { LoginSchema } from "~/schemas";
import { verifyPassword } from "~/lib/hash";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { env } from "~/env";
export default {
  providers: [
    Credentials({
      authorize: async credentials => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await verifyPassword(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
