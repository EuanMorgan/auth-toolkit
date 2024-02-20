"use server";

import { AuthError } from "next-auth";
import type { z } from "zod";
import { signIn } from "~/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/constants/routes";
import { getUserByEmail } from "~/data/user";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { LoginSchema } from "~/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An error occurred!" };
      }
    }

    throw error;
  }
  return { success: "Email sent!" };
};
