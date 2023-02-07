"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const middleware_1 = require("./middleware");
const helpers_1 = require("./helpers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = (0, helpers_1.accessEnv)("PORT") || 3000;
app.use(middleware_1.loggerMiddleware);
app.get("/test", (_, res) => {
    res.status(200).send({ status: "✌️" });
});
app.use("/", userRouter_1.default);
app.use(middleware_1.errHandler);
app.use(middleware_1.notFound);
app.listen(port, () => {
    console.log(`\n\t ✌️ \n\n server listening on port ${port} ...`);
});
exports.default = app;
//# sourceMappingURL=server.js.map