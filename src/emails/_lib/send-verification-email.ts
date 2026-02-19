"use server";

import VerifyEmail from "../_components/verify-email";
import { resend } from "./resend";

type SendEmailParams = {
  from: string;
  to: string;
  url: string;
  name: string;
};

export async function sendEmail({ from, to, name, url }: SendEmailParams) {
  // const firstName = to.split("@")[0].charAt(0) + to.split("@")[0].slice(1);

  await resend.emails.send({
    from,
    to,
    subject: "Verify your Careerly account",
    react: VerifyEmail({
      url,
      name,
    }),
  });
}

// await resend.emails.send({
//   from,
//   to,
//   subject: "Verify your Careerly account",
//   text: url,
// });
