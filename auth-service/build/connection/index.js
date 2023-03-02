"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const helpers_1 = require("../helpers");
const ENV = (0, helpers_1.accessEnv)("ENV_DB").trim();
const DATABASE_URI_PROD = (0, helpers_1.accessEnv)("DATABASE_URI_PROD");
let connectionString = (0, helpers_1.accessEnv)("DATABASE_URI_LOCAL");
let conn;
try {
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
    console.log("database connected ...");
}
catch (error) {
    console.log("connection error");
}
exports.default = conn;
//# sourceMappingURL=index.js.map