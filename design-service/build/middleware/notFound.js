"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const helpers_1 = require("../helpers");
const notFound = (req, res) => {
    const { method, path, body, ip } = req;
    helpers_1.logger.req("not found", { method, path, body, ip }, { statusCode: 404, message: "page not found" });
    res.status(404).send(`Oops! page not found`);
};
exports.notFound = notFound;
//# sourceMappingURL=notFound.js.map