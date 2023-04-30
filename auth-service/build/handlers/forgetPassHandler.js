"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassHandler = exports.forgetPassHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const forgetPassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // check if email is valid
    if (help.notValid({ email })) {
        return res.status(400).json({ error: "Email is not valid" });
    }
    // check if email exists
    const user = yield datastore_1.DB.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }
    // if (!user.verified) {
    //   return res.status(400).json({
    //     error: "User not verified",
    //   });
    // }
    // generate token
    const token = help.createToken({ userId: user.id, verified: user.verified }, "1h");
    // send email
    // TODO: change the link to the frontend link
    const reset_password_link = help.accessEnv("RESET_PASSWORD_URL_FRONT_END");
    help.sendPassEmail(user.email, `<a href="${reset_password_link}/auth/change-password?token=${token}">Reset Password</a>`);
    return res.sendStatus(200);
});
exports.forgetPassHandler = forgetPassHandler;
const resetPassHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newpassword } = req.body;
    const token = req.query.token;
    // check if token is valid
    let payload;
    try {
        payload = help.verifyToken(token);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
    // check if password is valid
    const notValid = help.notValid({ password: newpassword });
    if (notValid) {
        return res.status(400).json({ error: notValid });
    }
    // get user data from db
    const user = yield datastore_1.DB.getUserById(payload.userId);
    const password = yield help.hashPassword(newpassword);
    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }
    // update password
    yield datastore_1.DB.updatePassword(user.id, password);
    return res.sendStatus(200);
});
exports.resetPassHandler = resetPassHandler;
//# sourceMappingURL=forgetPassHandler.js.map