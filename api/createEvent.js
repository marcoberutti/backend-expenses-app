const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { title, start, color } = req.body;

    // Controlla se i dati sono validi
    if (!title || !start || !color) {
      return res.status(400).json({ error: "Dati mancanti o non validi" });
    }

    const connection = await getDBConnection();
    await connection.execute(
      'INSERT INTO events (title, start, color) VALUES (?, ?, ?)',
      [title, start, color]
    );

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    res.status(500).json({ error: 'Errore nella query: ' + err.message });
  }
});

module.exports = router;
