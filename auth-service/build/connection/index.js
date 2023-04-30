"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const helpers_1 = require("../helpers");
const loggerService_1 = __importDefault(require("../services/loggerService"));
const ENV = (0, helpers_1.accessEnv)("ENV_DB").trim();
const DATABASE_URI_PROD = (0, helpers_1.accessEnv)("DATABASE_URI_PROD");
let connectionString = (0, helpers_1.accessEnv)("DATABASE_URI_LOCAL");
let conn;
if (ENV === "prod") {
    connectionString = DATABASE_URI_PROD;
    conn = new pg_1.Pool({
        connectionString,
        ssl: false,
    });
}
else {
    conn = new pg_1.Pool({ connectionString });
}
conn
    .connect()
    .then(() => {
    loggerService_1.default.info("Database connected successfully ✅ ✅ ✅ ");
})
    .catch((error) => {
    loggerService_1.default.error("Error connecting to Data Base  ❌ ❌ ❌ ❌ ❌ ❌ ❌", error.message);
});
exports.default = conn;
//# sourceMappingURL=index.js.map