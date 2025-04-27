const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { data, descrizione, importo } = req.body;

    if (!req.body) {
      return res.status(400).json({ error: "Dati mancanti o non validi" });
    }

    const connection = await getDBConnection();
    await connection.execute(
      'INSERT INTO expenses (data, descrizione, Income) VALUES (?, ?, ?)',
      [data, descrizione, importo]
    );
    await connection.execute(
      'INSERT INTO expenses (data, descrizione, cucito_out) VALUES (?, ?, ?)',
      [data, descrizione, importo]
    );

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    res.status(500).json({ error: 'Errore nella query: ' + err.message });
  }
});

module.exports = router;
