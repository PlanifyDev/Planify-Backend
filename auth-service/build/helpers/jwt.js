"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessEnv_1 = require("./accessEnv");
const jsonwebtoken_2 = require("jsonwebtoken");
const secret = (0, accessEnv_1.accessEnv)("JWT_SECRET");
function createToken(obj, expire = "1y") {
    return jsonwebtoken_1.default.sign(obj, secret, { expiresIn: expire });
}
exports.createToken = createToken;
function verifyToken(token) {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, secret);
        return payload;
    }
    catch (error) {
        const verifyErr = error;
        if (verifyErr instanceof jsonwebtoken_2.TokenExpiredError) {
            throw new Error("TOKEN_EXPIRED");
        }
        throw new Error("BAD_TOKEN");
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map