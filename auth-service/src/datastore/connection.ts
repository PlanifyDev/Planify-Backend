import { Pool } from "pg";
import accessEnv from "./../helpers/accessEnv";
const conn = new Pool({
  user: accessEnv("USER"),
  host: accessEnv("HOST"),
  database: accessEnv("DB_NAME"),
  password: accessEnv("PASSWORD"),
  port: Number(accessEnv("PORT_DATA")),
});

export default conn;
