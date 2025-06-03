import { Pool } from "pg";
import "dotenv/config"; // Initialize .env variables from .env file

const testPool = new Pool({
  host: "localhost",
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  database: process.env.PG_DB_TEST,
  password: process.env.PGPASSWORD,
});

export default testPool;
