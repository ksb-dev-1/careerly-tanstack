"use server";

import ForgotPasswordEmail from "../_components/forgot-password";
import { resend } from "./resend";

type SendResetPasswordEmailParams = {
  from: string;
  to: string;
  url: string;
  name: string;
};

export async function sendResetPasswordEmail({
  from,
  to,
  name,
  url,
}: SendResetPasswordEmailParams) {
  // const firstName = to.split("@")[0].charAt(0) + to.split("@")[0].slice(1);

  await resend.emails.send({
    from,
    to,
    subject: "Verify your Careerly account",
    react: ForgotPasswordEmail({
      url,
      name,
    }),
  });
}
