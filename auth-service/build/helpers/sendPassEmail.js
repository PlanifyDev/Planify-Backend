"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPassEmail = void 0;
const accessEnv_1 = require("./accessEnv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendPassEmail = (email, html) => {
    const authEmail = (0, accessEnv_1.accessEnv)("VERIFY_EMAIL");
    const authPassword = (0, accessEnv_1.accessEnv)("VERIFY_PASSWORD");
    const transporter = nodemailer_1.default.createTransport({
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
exports.sendPassEmail = sendPassEmail;
//# sourceMappingURL=sendPassEmail.js.map