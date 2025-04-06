const express = require('express');
const router  = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  let connection;

  try {
    connection = await getDBConnection();
    const { inizio, fine, categoria } = req.body;

    const allowedColumns = ["Spesa", "Benzina", "Extra", "Casa", "Salute", "Investimenti", "tasse"];
    if (!allowedColumns.includes(categoria)) {
      return res.status(400).json({ error: 'Categoria non valida' });
    }

    const query = `SELECT data, descrizione, \`${categoria}\` as valore FROM expenses WHERE data >= ? AND data <= ? AND \`${categoria}\` IS NOT NULL`;

    const [results] = await connection.execute(query, [inizio, fine]);
    res.json(results);

  } catch (err) {
    console.error("Errore nella query filterRiepilogo:", err);
    res.status(500).json({ error: 'Errore nella query', details: err.message });

  } finally {
    // Chiude SEMPRE la connessione, anche in caso di errore
    if (connection) await connection.end();
  }
});


module.exports = router;
