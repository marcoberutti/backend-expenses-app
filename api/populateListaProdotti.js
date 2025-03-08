const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { prodotto, prezzo } = req.body;
    const connection = await getDBConnection();

    await connection.execute('INSERT INTO lista_prodotti (prodotto, prezzo) VALUES (?, ?)', [prodotto, prezzo]);

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;
