import { accessEnv } from "./accessEnv";
import nodemailer from "nodemailer";
import { emailContent } from "./emailContent";

export const sendEmail = (
  email: string,
  verificationCode: string,
  name: string
): void => {
  const authEmail = accessEnv("VERIFY_EMAIL");
  const authPassword = accessEnv("VERIFY_PASSWORD");
  // const verificationLink = `http://localhost:3000/verify/?key=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: authEmail,
      pass: authPassword,
    },
  });

  const emailContentHtml = emailContent(verificationCode, email, name);
  const mailOptions = {
    from: `"Planify" <no-reply@Planify.world>`,
    to: email,
    subject: "Verify your email",
    html: emailContentHtml,
  };

  transporter.sendMail(mailOptions).catch((err) => {
    console.log(err);
  });
};
