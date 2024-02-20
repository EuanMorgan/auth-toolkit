"use server";

import { type z } from "zod";
import { getPasswordResetTokenByToken } from "~/data/password-reset-token";
import { getUserByEmail } from "~/data/user";
import { db, eq, schema } from "~/db";
import { hashPassword } from "~/lib/hash";
import { NewPasswordSchema } from "~/schemas";
export const resetPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Invalid token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = existingToken.expires < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const hashedPassword = await hashPassword(password);

  await db
    .update(schema.users)
    .set({
      password: hashedPassword,
    })
    .where(eq(schema.users.email, existingToken.identifier));

  await db
    .delete(schema.passwordResetTokens)
    .where(eq(schema.passwordResetTokens.identifier, existingToken.identifier));

  return { success: "Password reset" };
};
