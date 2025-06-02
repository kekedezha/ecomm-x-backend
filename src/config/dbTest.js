import { Pool } from "pg";
import "dotenv/config"; // Initialize .env variables from .env file

const testPool = new Pool({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.DB_USER,
  database: process.env.PG_DB_TEST,
});

export default testPool;
