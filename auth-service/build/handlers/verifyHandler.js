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
exports.verifyHandler = exports.sendEmailHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
const sendEmailHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const user = yield datastore_1.DB.getUserById(userId);
    // create verification token with expire date
    const jwt = help.createToken({ userId: user.id, verified: false }, "1d");
    // send verification email to user
    const fullName = user.firstname + " " + user.lastname;
    help.sendEmail(user.email, jwt, fullName);
    return res.sendStatus(200);
});
exports.sendEmailHandler = sendEmailHandler;
const verifyHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.key;
    if (!token) {
        return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
    }
    let payload;
    try {
        payload = help.verifyToken(token);
    }
    catch (error) {
        return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
    }
    const user = yield datastore_1.DB.getUserById(payload.userId);
    if (!user) {
        return res.status(401).send({ error: help.ERRORS.BAD_VERIFY_RUL });
    }
    // update user verification status in DB and cache
    yield datastore_1.DB.updateVerification(payload.userId)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield cache_1.cache.updateVerificationCache(payload.userId, "true");
    }))
        .catch((error) => {
        return next(error);
    });
    return res.redirect("http://localhost:3000/test");
});
exports.verifyHandler = verifyHandler;
//# sourceMappingURL=verifyHandler.js.map