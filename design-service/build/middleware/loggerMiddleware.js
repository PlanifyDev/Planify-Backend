"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const helpers_1 = require("../helpers");
const loggerMiddleware = (error, req, res, _) => {
    const { statusCode, statusMessage } = res;
    const { method, originalUrl, body, ip } = req;
    if (error instanceof helpers_1.MyError) {
        helpers_1.logger.error(error.message, error.errorObj);
        helpers_1.logger.req("Server Error", { method, path: originalUrl, body, ip }, { statusCode: 500, message: error.message });
        return res
            .status(500)
            .send({ error: "Oops, an unexpected error occurred, please try again" });
    }
    else {
        return helpers_1.logger.req(statusMessage, { method, path: originalUrl, body, ip }, { statusCode, message: error });
    }
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map