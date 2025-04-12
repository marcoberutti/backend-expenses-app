const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { tipo, importo, tipologia, descrizione, data } = req.body;
    const connection = await getDBConnection();

    const allowedColumns = ["Spesa", "Benzina", "Extra", "Casa", "Salute","Investimenti", "tasse", "cucito_in", "cucito_out", "Income"];

    if (!allowedColumns.includes(tipologia)) {
      return res.status(400).json({ error: "Tipologia non permessa" });
    }

    let query;
    let values;

    if (tipo) {

          query = `INSERT INTO expenses (descrizione, ${tipologia}, data) VALUES (?, ?, ?)`;
          values = [ descrizione, parseFloat(importo), data];

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