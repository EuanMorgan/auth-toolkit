import { db, eq, schema } from "~/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(schema.passwordResetTokens.token, token),
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(schema.passwordResetTokens.identifier, email),
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
