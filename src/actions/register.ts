"use server";

import type { z } from "zod";
import { getUserByEmail } from "~/data/user";
import { db, schema } from "~/db";
import { hashPassword } from "~/lib/hash";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { RegisterSchema } from "~/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }
  const hashedPassword = await hashPassword(password);

  await db.insert(schema.users).values({
    name,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  return { success: "Confirmation email sent" };
};
