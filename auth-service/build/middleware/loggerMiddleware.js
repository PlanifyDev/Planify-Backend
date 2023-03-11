"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const loggerService_1 = __importDefault(require("../services/loggerService"));
const loggerMiddleware = (req, res, next) => {
    const { statusCode } = res;
    const { method, path, body, ip } = req;
    loggerService_1.default.req("", { method, path, body, ip }, { statusCode });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map