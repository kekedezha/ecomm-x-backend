// Knex.js config file
// Knex.js is a SQL query builder for Node.js
// It supports db schema migrations and seeding, allowing for easy tracking and changes to db structures
require('dotenv').config(); // Initialize .env variables from .env file

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: process.env.PGPORT || 5432,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // migrations allow you to define sets of schema changes so upgrading a database is a breeze
      directory: './db/migrations', // define the directory for migration files
    },
    seeds: {
      // seed files allow you to populate your database with test or seed data independent of your migration files
      directory: './db/seeds', // define the directory for seeding files
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: process.env.PGPORT || 5432,
      database: process.env.PG_DB_TEST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // migrations allow you to define sets of schema changes so upgrading a database is a breeze
      directory: './dist/db/migrations', // define the directory for migration files
    },
    seeds: {
      // seed files allow you to populate your database with test or seed data independent of your migration files
      directory: './dist/db/seeds', // define the directory for seeding files
    },
  },
};
