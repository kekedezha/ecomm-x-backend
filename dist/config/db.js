"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pg = require("pg");
require("dotenv/config");
// Initialize .env variables from .env file

const pool = new _pg.Pool({
  host: "localhost",
  port: process.env.PORT || "5432",
  user: process.env.DB_USER || "testuser",
  database: process.env.PGDATABASE || "testdb"
});
var _default = exports.default = pool;