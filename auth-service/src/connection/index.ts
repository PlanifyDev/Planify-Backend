import { Pool } from "pg";
import { accessEnv } from "../helpers";
import logger from "../services/loggerService";
const ENV = accessEnv("ENV_DB").trim();

const DATABASE_URI_PROD = accessEnv("DATABASE_URI_PROD");
let connectionString = accessEnv("DATABASE_URI_LOCAL");

let conn: Pool;

if (ENV === "prod") {
  connectionString = DATABASE_URI_PROD;
  conn = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
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
