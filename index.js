const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const dati = require('./api/dati');
const newExpense = require('./api/newExpense');
const deleteExpense = require('./api/deleteExpense');
const writeExpense = require('./api/writeExpense');
const login = require('./api/login');

app.use('/api/dati', dati);
app.use('/api/newExpense', newExpense);
app.use('/api/deleteExpense', deleteExpense);
app.use('/api/writeExpense', writeExpense);
app.use('/api/login', login);

const PORT = process.env.PORT || 3001;

if (process.env.ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });
}

module.exports = app;
