"use server";
import { type z } from "zod";
import { getUserByEmail } from "~/data/user";
import { sendPasswordResetEmail } from "~/lib/mail";
import { generatePasswordResetToken } from "~/lib/tokens";
import { ResetSchema } from "~/schemas";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.identifier,
    passwordResetToken.token,
  );

  return { success: "Email sent!" };
};
