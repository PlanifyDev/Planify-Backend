import { Pool } from "pg";
import { accessEnv } from "../helpers";
import logger from "../services/loggerService";
const ENV = accessEnv("ENV_DB").trim();

let connectionString = accessEnv("DATABASE_URL_LOCAL");

let conn: Pool;

if (ENV === "prod") {
  connectionString = accessEnv("DATABASE_URI_PROD");
  conn = new Pool({
    connectionString,
    ssl: false,
  });
} else {
  conn = new Pool({ connectionString });
}

conn
  .connect()
  .then(() => {
    logger.info("Database connected successfully ✅ ✅ ✅ ");
  })
  .catch((error) => {
    logger.error(
      "Error connecting to Data Base  ❌ ❌ ❌ ❌ ❌ ❌ ❌",
      error.message
    );
  });

export default conn;
