const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const dati = require('./api/dati');
const newExpense = require('./api/newExpense');
const deleteExpense = require('./api/deleteExpense');

app.use('/api/dati', dati);
app.use('/api/newExpense', newExpense);
app.use('/api/deleteExpense', deleteExpense);

module.exports = app;
