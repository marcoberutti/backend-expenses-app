const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const dati = require('./api/dati');
const newExpense = require('./api/newExpense');
const deleteExpense = require('./api/deleteExpense');
const writeExpense = require('./api/writeExpense');
const login = require('./api/login');

const getListSpesa = require('./api/getListSpesa');
const deleteProductSpesa = require('./api/deleteProductSpesa');
const newProductSpesa = require('./api/newProductSpesa');
const populateProdotti = require('./api/populateListaProdotti');
const getProductsForSelect = require('./api/getProductsForSelect');

app.use('/api/dati', dati);
app.use('/api/newExpense', newExpense);
app.use('/api/deleteExpense', deleteExpense);
app.use('/api/writeExpense', writeExpense);
app.use('/api/login', login);

app.use('/api/getListSpesa', getListSpesa);
app.use('/api/deleteProductSpesa', deleteProductSpesa);
app.use('/api/newProductSpesa', newProductSpesa);
app.use('/api/populateListaProdotti', populateProdotti);
app.use('/api/getProductsForSelect', getProductsForSelect);

app.post("/api/supermercato/:item", async (req, res) => {
  let itemToSearch = req.params.item;

  try {
    const response = await axios.post(
      "https://spesaonline.esselunga.it/commerce/resources/search/facet",
      {
        query: itemToSearch,
        start: 0,
        length: 15,
        filters: [] // Verifica se i filtri sono necessari
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
          "Referer": `https://spesaonline.esselunga.it/commerce/nav/supermercato/store/ricerca/${itemToSearch}`,
          "Origin": "https://spesaonline.esselunga.it",
          "X-Page-Path": "supermercato"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Errore richiesta Esselunga:", error.response?.data || error.message);
    res.status(500).json({ error: "Errore nel proxy Esselunga", details: error.message });
  }
});

const PORT = process.env.PORT || 3001;

if (process.env.ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Server avviato su http://localhost:${PORT}`);
  });
}

module.exports = app;
