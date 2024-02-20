import { db, eq, schema } from "~/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(schema.verificationTokens.identifier, email),
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: eq(schema.verificationTokens.token, token),
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
