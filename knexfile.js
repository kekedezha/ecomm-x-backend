// Knex.js config file
// Knex.js is a SQL query builder for Node.js
// It supports db schema migrations and seeding, allowing for easy tracking and changes to db structures
require("dotenv").config(); // Initialize .env variables from .env file

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.PGDATABASE,
      user: process.env.DB_USER,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // migrations allow you to define sets of schema changes so upgrading a database is a breeze
      directory: "./db/migrations", // define the directory for migration files
    },
    seeds: {
      // seed files allow you to populate your database with test or seed data independent of your migration files
      directory: "./db/seeds", // define the directory for seeding files
    },
  },

  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.PGDATABASE,
      user: process.env.DB_USER,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // migrations allow you to define sets of schema changes so upgrading a database is a breeze
      directory: "./db/migrations", // define the directory for migration files
    },
    seeds: {
      // seed files allow you to populate your database with test or seed data independent of your migration files
      directory: "./db/seeds", // define the directory for seeding files
    },
  },
};
