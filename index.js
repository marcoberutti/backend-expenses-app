const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const login = require('./api/login');

const getDatas = require('./api/getDatas');
const newExpense = require('./api/newExpense');
const deleteExpense = require('./api/deleteExpense');
const writeExpense = require('./api/writeExpense');

const deleteProductSpesa = require('./api/deleteProductSpesa');
const newProductSpesa = require('./api/newProductSpesa');
const writeProductListPrezzo = require('./api/writeProductListPrezzo');

const createEvent = require('./api/createEvent');
const writeEvent = require('./api/writeEvent');

const filterRiepilogo = require('./api/filterRiepilogo');

const createCustomer = require('./api/createCustomer');
const archiveCustomer = require('./api/archiveCustomer');
const deleteCustomer = require('./api/deleteCustomer');
const writeStatoLavorazione = require('./api/writeStatoLavorazione');

const createMaterial = require('./api/createMaterial');
const deleteMateriale = require('./api/deleteMateriale');

const transferMoney = require('./api/transferMoney');

const newMonthBalance = require('./api/newMonthBalance')
const getMonthBalance = require('./api/getMonthBalance')

app.use('/api/getDatas', getDatas);
app.use('/api/newExpense', newExpense);
app.use('/api/deleteExpense', deleteExpense);
app.use('/api/writeExpense', writeExpense);
app.use('/api/login', login);

app.use('/api/deleteProductSpesa', deleteProductSpesa);
app.use('/api/newProductSpesa', newProductSpesa);
app.use('/api/writeProductListPrezzo', writeProductListPrezzo);

app.use('/api/createEvent', createEvent);
app.use('/api/writeEvent', writeEvent);

app.use('/api/filterRiepilogo', filterRiepilogo);

app.use('/api/createCustomer', createCustomer);
app.use('/api/archiveCustomer', archiveCustomer);
app.use('/api/deleteCustomer', deleteCustomer);
app.use('/api/writeStatoLavorazione', writeStatoLavorazione);

app.use('/api/createMaterial', createMaterial);
app.use('/api/deleteMateriale', deleteMateriale);

app.use('/api/transferMoney', transferMoney);

app.use('/api/newMonthBalance', newMonthBalance);
app.use('/api/getMonthBalance', getMonthBalance);


const PORT = process.env.PORT || 3010;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, '127.0.0.1',() => {
    console.log(`✅ Server avviato su http://localhost:${PORT}`);
  });
}

module.exports = app;
