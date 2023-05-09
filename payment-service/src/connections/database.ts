import { Pool } from "pg";
import { accessEnv } from "../helpers";
import { logger } from "../helpers";
const ENV = accessEnv("ENV_DB").trim();

let connectionString = accessEnv("DATABASE_URL_LOCAL");

let DB_CONN: Pool;

if (ENV === "prod") {
  connectionString = accessEnv("DATABASE_URL_PROD");
  DB_CONN = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  DB_CONN = new Pool({ connectionString });
}

DB_CONN.connect()
  .then(() => {
    logger.info("Database connected successfully ✅ ✅ ✅ ");
  })
  .catch((error) => {
    logger.error(
      "Error connecting to Data Base  ❌ ❌ ❌ ❌ ❌ ❌ ❌",
      error.message
    );
  });

export { DB_CONN };
