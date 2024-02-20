"use server";

import { getVerificationTokenByToken } from "~/data/verification-token";
import { getUserByEmail } from "~/data/user";
import { and, db, eq, schema } from "~/db";

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

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

  //   await db.transaction(async (tsx) => {
  await db
    .update(schema.users)
    .set({
      emailVerified: new Date(),
      // We update this, because when we allow users to change their email
      // We don't want to immediately update it in the database, they need to verify it first
      email: existingToken.identifier,
    })
    .where(eq(schema.users.email, existingToken.identifier));

  await db
    .delete(schema.verificationTokens)
    .where(
      and(
        eq(schema.verificationTokens.identifier, existingToken.identifier),
        eq(schema.verificationTokens.token, existingToken.token),
      ),
    );
  //   });

  return { success: "Email verified" };
};
