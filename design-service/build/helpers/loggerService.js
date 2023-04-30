"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const accessEnv_1 = require("./accessEnv");
const logPath = (0, accessEnv_1.accessEnv)("LOG_PATH");
const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
};
const format = (info) => {
    let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | \n`;
    message = info.obj
        ? message + `    - details: ${JSON.stringify(info.obj)} |\n`
        : message;
    return message;
};
const requestsFormat = (info) => {
    let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.res.statusCode} | ${info.message} | 
    request: ${info.req.method} | ${info.req.path} | -ip: ${info.req.ip} |- body: ${JSON.stringify(info.req.body)} |
    response: ${JSON.stringify(info.res.statusCode)} | - message: ${info.res.message} |\n`;
    return message;
};
class LoggerService {
    constructor() {
        const InfoLogger = winston_1.default.createLogger({
            format: winston_1.default.format.printf(format),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: `${logPath}/out.log`,
                    level: "info",
                }),
            ],
        });
        const ErrorLogger = winston_1.default.createLogger({
            format: winston_1.default.format.printf(format),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: `${logPath}/error.log`,
                    level: "error",
                }),
            ],
        });
        const RequestLogger = winston_1.default.createLogger({
            format: winston_1.default.format.printf(requestsFormat),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: `${logPath}/requests.log`,
                    level: "info",
                }),
            ],
        });
        this.InfoLogger = InfoLogger;
        this.ErrorLogger = ErrorLogger;
        this.RequestLogger = RequestLogger;
    }
    info(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.InfoLogger.log("info", message, { obj });
        });
    }
    error(message, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ErrorLogger.log("error", message, { obj });
        });
    }
    req(message, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.RequestLogger.log("info", message, { req, res });
        });
    }
}
exports.logger = new LoggerService();
//# sourceMappingURL=loggerService.js.map