"use server";

import { z } from "zod";
import { hashPassword } from "~/lib/hash";
import { RegisterSchema } from "~/schemas";
import { db, schema, eq } from "~/db";
import { getUserByEmail } from "~/data/user";

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

  // TODO: Send email verification

  return { success: "User created!" };
};
