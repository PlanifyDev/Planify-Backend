import winston = require("winston");
import { accessEnv } from "../helpers/accessEnv";

const logPath = accessEnv("PAY_LOG_PATH");
console.log(logPath);

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

const format = (info: any) => {
  let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
    info.message
  } | \n`;
  message = info.obj
    ? message + `    - message: ${JSON.stringify(info.obj)} |\n`
    : message;
  return message;
};

const requestsFormat = (info: any) => {
  let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
    info.res.statusCode
  } |
    request: ${info.req.method} | ${info.req.path} | -ip: ${
    info.req.ip
  } |- body: ${JSON.stringify(info.req.body)} |\n`;

  return message;
};

class LoggerService {
  InfoLogger: winston.Logger;
  ErrorLogger: winston.Logger;
  RequestLogger: winston.Logger;
  constructor() {
    const InfoLogger = winston.createLogger({
      format: winston.format.printf(format),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${logPath}/out.log`,
          level: "info",
        }),
      ],
    });

    const ErrorLogger = winston.createLogger({
      format: winston.format.printf(format),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${logPath}/error.log`,
          level: "error",
        }),
      ],
    });

    const RequestLogger = winston.createLogger({
      format: winston.format.printf(requestsFormat),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${logPath}/requests.log`,
          level: "info",
        }),
      ],
    });

    this.InfoLogger = InfoLogger;
    this.ErrorLogger = ErrorLogger;
    this.RequestLogger = RequestLogger;
  }

  async info(message: string, obj?: any) {
    this.InfoLogger.log("info", message, { obj });
  }

  async error(message: string, obj?: any) {
    this.ErrorLogger.log("error", message, { obj });
  }
  async req(message: string, req?: any, res?: any) {
    this.RequestLogger.log("info", message, { req, res });
  }
}

const logger = new LoggerService();

export default logger;
