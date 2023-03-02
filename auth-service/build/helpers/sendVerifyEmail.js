"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const accessEnv_1 = require("./accessEnv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailContent_1 = require("./emailContent");
const sendEmail = (email, verificationCode, name) => {
    const authEmail = (0, accessEnv_1.accessEnv)("VERIFY_EMAIL");
    const authPassword = (0, accessEnv_1.accessEnv)("VERIFY_PASSWORD");
    // const verificationLink = `http://localhost:3000/verify/?key=${token}`;
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: authEmail,
            pass: authPassword,
        },
    });
    const emailContentHtml = (0, emailContent_1.emailContent)(verificationCode, email, name);
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
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendVerifyEmail.js.map