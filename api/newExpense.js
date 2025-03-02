const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { tipo, importo, tipologia, descrizione, data } = req.body;
    const connection = await getDBConnection();

    let query;
    let values;

    if (tipo === "outcome") {
      switch (tipologia) {
        case 'spesa':
          query = 'INSERT INTO expenses (descrizione, Spesa, data) VALUES (?, ?, ?)';
          values = [descrizione, parseFloat(importo), data];
          break;
        case 'benzina':
          query = 'INSERT INTO expenses (descrizione, Benzina, data) VALUES (?, ?, ?)';
          values = [descrizione, parseFloat(importo), data];
          break;
        case 'extra':
          query = 'INSERT INTO expenses (descrizione, Extra, data) VALUES (?, ?, ?)';
          values = [descrizione, parseFloat(importo), data];
          break;
        case 'casa':
          query = 'INSERT INTO expenses (descrizione, Casa, data) VALUES (?, ?, ?)';
          values = [descrizione, parseFloat(importo), data];
          break;
        case 'salute':
          query = 'INSERT INTO expenses (descrizione, Salute, data) VALUES (?, ?, ?)';
          values = [descrizione, parseFloat(importo), data];
          break;
        default:
          return res.status(400).json({ error: "Tipologia non valida" });
      }
    } else if (tipo === "income") {
      query = 'INSERT INTO expenses (descrizione, Income, data) VALUES (?, ?, ?)';
      values = [descrizione, parseFloat(importo), data];
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }

    await connection.execute(query, values);
    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' });
  }
});


module.exports = router;