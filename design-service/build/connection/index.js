"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const helpers_1 = require("../helpers");
const helpers_2 = require("../helpers");
const ENV = (0, helpers_1.accessEnv)("ENV_DB").trim();
const DATABASE_URI_PROD = (0, helpers_1.accessEnv)("DATABASE_URI_PROD");
let connectionString = (0, helpers_1.accessEnv)("DATABASE_URI_LOCAL");
let conn;
if (ENV === "prod") {
    connectionString = DATABASE_URI_PROD;
    conn = new pg_1.Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
}
else {
    conn = new pg_1.Pool({ connectionString });
}
conn
    .connect()
    .then(() => {
    helpers_2.logger.info("Database connected successfully ✅ ✅ ✅ ");
})
    .catch((error) => {
    helpers_2.logger.error("Error connecting to Data Base  ❌ ❌ ❌ ❌ ❌ ❌ ❌", error.message);
});
exports.default = conn;
//# sourceMappingURL=index.js.map