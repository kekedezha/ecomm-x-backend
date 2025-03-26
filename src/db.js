import { Pool } from "pg";

const pool = new Pool({
  user: "christiandezha",
  host: "localhost",
  database: "ecomm_x",
  port: "5432",
});

export default pool;
