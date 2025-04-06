const express = require('express');
const router  = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const connection = await getDBConnection();
    const { inizio, fine, categoria } = req.body;

    console.log(inizio, fine, categoria);

    // Sicurezza: permetti solo colonne valide
    const allowedColumns = ["Spesa", "Benzina", "Extra", "Casa", "Salute", "Investimenti", "tasse"];
    if (!allowedColumns.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria non valida' });
    }

    // Costruzione query con nome colonna dinamico
    const query = `SELECT data, descrizione, \`${categoria}\` as valore FROM expenses WHERE data >= ? AND data <= ? AND \`${categoria}\` IS NOT NULL`;

    const [results] = await connection.execute(query, [inizio, fine]);
    await connection.end();

    res.json(results);

  } catch (err) {
    console.error("Errore nella query filterRiepilogo:", err);
    res.status(500).json({ error: 'Errore nella query', details: err.message });
  }
});

module.exports = router;
