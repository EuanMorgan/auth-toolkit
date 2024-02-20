import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import { getVerificationTokenByEmail } from "~/data/verification-token";
import { db, eq, schema } from "~/db";
import { getPasswordResetTokenByEmail } from "~/data/password-reset-token";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = add(new Date(), { hours: 1 });

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(schema.verificationTokens)
      .where(
        eq(schema.verificationTokens.identifier, existingToken.identifier),
      );
  }

  const [verificationToken] = await db
    .insert(schema.verificationTokens)
    .values({
      expires,
      identifier: email,
      token,
    })
    .returning();

  if (!verificationToken) {
    throw new Error("Failed to generate verification token");
  }

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = add(new Date(), { hours: 1 });

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(schema.passwordResetTokens)
      .where(
        eq(schema.passwordResetTokens.identifier, existingToken.identifier),
      );
  }

  const [passwordResetToken] = await db
    .insert(schema.passwordResetTokens)
    .values({
      expires,
      identifier: email,
      token,
    })
    .returning();

  if (!passwordResetToken) {
    throw new Error("Failed to generate password reset token");
  }

  return passwordResetToken;
};
