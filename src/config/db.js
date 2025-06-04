import { Pool } from 'pg';
import 'dotenv/config'; // Initialize .env variables from .env file

const pool = new Pool({
  host: 'localhost',
  port: process.env.PGPORT || '5432',
  user: process.env.PGUSER || 'testuser',
  database: process.env.PGDATABASE || 'testdb',
});

export default pool;
