const mysql = require('mysql2/promise');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

async function getDBConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
}

const dati = require('./api/dati');
const newExpense = require('./api/newExpense');
const deleteExpense = require('./api/deleteExpense');

app.use('/api/dati', dati);
app.use('/api/newExpense', newExpense);
app.use('/api/deleteExpense', deleteExpense);

module.exports = { app, getDBConnection };
