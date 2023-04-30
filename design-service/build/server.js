"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const helpers_1 = require("./helpers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = (0, helpers_1.accessEnv)("PORT") || 3002;
// app.use(loggerMiddleware);
app.get("/test_design", (_, res) => {
    res.status(200).send({ status: "🫡" });
});
app.use("/project", routes_1.projectRouter);
app.use("/version", routes_1.versionRouter);
app.use(middleware_1.loggerMiddleware);
app.use(middleware_1.notFound);
app.listen(port, "0.0.0.0", () => {
    helpers_1.logger.info(`\t 🫡    server listening on port ${port} .....`);
});
exports.default = app;
//# sourceMappingURL=server.js.map