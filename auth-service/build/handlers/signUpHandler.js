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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
const signUpHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    // ---------------- check if all field is existing ----------------
    if (!firstname || !lastname || !email || !password) {
        return res
            .status(400)
            .send({ error: "Email, username, and password are required" });
    }
    // ---------------- check if all inputs is valid ----------------
    const notValidMessage = help.notValid({ firstname }, { lastname }, { email }, { password });
    if (notValidMessage) {
        return res.status(400).send({ error: notValidMessage });
    }
    // ----------------------------------------------------------------
    // ------------- check if user is already exist or not ------------
    if (yield datastore_1.DB.getUserByEmail(email)) {
        return res.status(400).send({ error: help.ERRORS.DUPLICATE_EMAIL });
    }
    // ---------------- hash the new password to store it --------------
    const hashedPassword = yield help.hashPassword(password);
    const newUser = {
        id: crypto_1.default.randomUUID(),
        firstname,
        lastname,
        image_url: "default image for now ",
        email,
        password: hashedPassword,
        verified: false,
        user_plan: "free",
    };
    // ---------------- save all data in db --------------------------
    yield datastore_1.DB.insertUser(newUser).catch((error) => {
        return next(error);
    });
    // ----------------  create verification token with expire date ----------------
    const jwt = help.createToken({ userId: newUser.id, verified: false });
    // ---------------- save user data in cache -----------------------------
    // ignore password in cacheUser
    const cacheUser = Object.assign(Object.assign({}, newUser), { user_token: jwt });
    yield cache_1.cache.cacheUser(newUser.id, cacheUser).catch((error) => {
        return next(error);
    });
    // ---------------- create random 6-digits code ----------------
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // ---------------- save verification code in cache ----------------
    yield cache_1.cache
        .addVerificationCode(newUser.id, verificationCode)
        .catch((error) => {
        return next(error);
    });
    // ---------------- send verification email to user ----------------
    const fullName = firstname + " " + lastname;
    help.sendEmail(newUser.email, verificationCode, fullName);
    // ignore password in response "type.UserRes = Omit<type.User, 'password'>"
    const { password: _ } = newUser, user = __rest(newUser, ["password"]);
    return res.status(200).send({ user, jwt });
});
exports.signUpHandler = signUpHandler;
//# sourceMappingURL=signUpHandler.js.map