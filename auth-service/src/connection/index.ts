import { Pool } from "pg";
import { accessEnv } from "../helpers";
const ENV = accessEnv("ENV");
const DATABASE_URI_PROD = accessEnv("DATABASE_URI_PROD");
let connectionString = accessEnv("DATABASE_URI_LOCAL");

let conn: Pool;
try {
  if (ENV == "prod") {
    connectionString = DATABASE_URI_PROD;
    conn = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else if (ENV == "container") {
    connectionString =
      "postgres://postgres:postgres@172.17.0.2:5432/auth_service";
    conn = new Pool({ connectionString });
  } else {
    conn = new Pool({ connectionString });
  }

  console.log("database connected ...");
} catch (error) {
  console.log("connection error");
}

export default conn;
