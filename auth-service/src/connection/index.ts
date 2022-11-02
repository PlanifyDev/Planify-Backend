import { Pool } from "pg";
import accessEnv from "../helpers/accessEnv";

let conn: Pool;
try {
  conn = new Pool({
    user: accessEnv("USER"),
    host: accessEnv("HOST"),
    database: accessEnv("DB_NAME"),
    password: accessEnv("PASSWORD"),
    port: Number(accessEnv("PORT_DATA")),
  });
  console.log("database connected ...");
} catch (error) {
  console.log("connection error");
}

export default conn;
