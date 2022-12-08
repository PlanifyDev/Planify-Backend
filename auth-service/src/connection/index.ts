import { Pool } from "pg";
import { accessEnv } from "../helpers";
const DATABASE_URI = accessEnv("DATABASE_URI");
let conn: Pool;
try {
  // conn = new Pool({
  //   user: accessEnv("USER"),
  //   host: accessEnv("HOST"),
  //   database: accessEnv("DB_NAME"),
  //   password: accessEnv("PASSWORD"),
  //   port: Number(accessEnv("PORT_DATA")),
  // });

  conn = new Pool({
    connectionString: DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log("database connected ...");
} catch (error) {
  console.log("connection error");
}

export default conn;
