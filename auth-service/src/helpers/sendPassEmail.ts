import { accessEnv } from "./accessEnv";
import nodemailer from "nodemailer";

export const sendPassEmail = (email: string, html: string): void => {
  const authEmail = accessEnv("VERIFY_EMAIL");
  const authPassword = accessEnv("VERIFY_PASSWORD");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: authEmail,
      pass: authPassword,
    },
  });

  const mailOptions = {
    from: `"Planify" <no-reply@Planify.world>`,
    to: email,
    subject: "Reset Password",
    html: html,
  };

  transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
  });
};
