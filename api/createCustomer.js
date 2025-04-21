const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const { nome, lavorazione, stato, data, active } = req.body;
    console.log(req.body)

    if (!data) {
      return res.status(400).json({ error: "Dati mancanti o non validi" });
    }

    const connection = await getDBConnection();
    await connection.execute(
      'INSERT INTO clienti (nome, lavorazione, stato, active, data) VALUES (?, ?, ?, ?, ?)',
      [nome, lavorazione, stato, active, data]
    );

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    res.status(500).json({ error: 'Errore nella query: ' + err.message });
  }
});

module.exports = router;
