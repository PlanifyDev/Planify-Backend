"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
const cache = {};
const accessEnv = (key) => {
    if (!(key in process.env)) {
        console.log(`${key} not found in process.env!`);
        process.exit(1);
    }
    if (cache[key]) {
        return cache[key];
    }
    cache[key] = process.env[key];
    return process.env[key];
};
exports.accessEnv = accessEnv;
//# sourceMappingURL=accessEnv.js.map