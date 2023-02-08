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
  } else {
    conn = new Pool({ connectionString });
  }
  conn.connect((err) => {
    if (err) {
      console.error("connection error on database ......... ");
      process.exit(1);
    } else {
      console.log("database connected ...");
    }
  });
} catch (error) {
  console.log("connection error");
}

export default conn;
