import { Pool } from "pg";
import "dotenv/config"; // Initialize .env variables from .env file

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: process.env.PGDATABASE,
  port: "5432",
});

export default pool;
