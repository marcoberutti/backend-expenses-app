const mysql = require('mysql2/promise');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function getDBConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

module.exports = getDBConnection;