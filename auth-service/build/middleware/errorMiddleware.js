"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const loggerService_1 = __importDefault(require("../services/loggerService"));
const errHandler = (err, _, res, __) => {
    loggerService_1.default.error("Uncaught exception:", err.message);
    return res
        .status(500)
        .send("Oops, an unexpected error occurred, please try again");
};
exports.errHandler = errHandler;
//# sourceMappingURL=errorMiddleware.js.map