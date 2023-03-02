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
exports.verifyHandler = exports.resendVerificationHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
const resendVerificationHandler = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const user = yield cache_1.cache.getCachedUser(userId);
    // ---------------- create random 6-digits code ----------------
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // ---------------- save verification code in cache ----------------
    yield cache_1.cache.addVerificationCode(userId, verificationCode).catch((error) => {
        return next(error);
    });
    // ---------------- send verification email to user ----------------
    const fullName = user.firstname + " " + user.lastname;
    help.sendEmail(user.email, verificationCode, fullName);
    return res.sendStatus(200);
});
exports.resendVerificationHandler = resendVerificationHandler;
const verifyHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const { verificationCode } = req.body;
    // get verification code from cache
    const verificationCode_cache = yield cache_1.cache.getVerificationCode(userId);
    // check if verification code is correct
    if (verificationCode != verificationCode_cache) {
        return res.status(400).send({ error: "Incorrect Verification Code" });
    }
    // create token without expire date
    const jwt = help.createToken({
        userId: userId,
        verified: true,
    });
    // update user verification status in DB and cache and update "token" in cache
    yield datastore_1.DB.updateVerification(userId)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache_1.cache.updateVerificationCache(userId, jwt);
    }))
        .catch((error) => {
        return next(error);
    });
    // delete verification code from cache
    yield cache_1.cache.deleteVerificationCode(userId);
    return res.status(200).send({ jwt });
});
exports.verifyHandler = verifyHandler;
//# sourceMappingURL=verifyHandler.js.map