import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

  await resend.emails.send({
    to: email,
    from: "onboarding@resend.dev",
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here to confirm your email.</a></p>`,
  });
};
