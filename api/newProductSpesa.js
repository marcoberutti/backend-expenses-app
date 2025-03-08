const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { prodotto, prezzo } = req.body;
    const connection = await getDBConnection();

    // 1️⃣ Controlla i prezzi precedenti dello stesso prodotto
    const [storicoPrezzi] = await connection.execute(
      'SELECT prezzo FROM lista_prodotti WHERE prodotto = ? ORDER BY id DESC LIMIT 5',
      [prodotto]
    );

    let trend = "neutro"; // Default: nessuna variazione
    if (storicoPrezzi.length > 0) {
      const prezziPassati = storicoPrezzi.map(row => row.prezzo);
      const mediaPrezzo = prezziPassati.reduce((acc, p) => acc + p, 0) / prezziPassati.length;

      if (prezzo < mediaPrezzo * 0.9) {
        trend = "buono"; // 🟢 Prezzo significativamente più basso
      } else if (prezzo > mediaPrezzo * 1.1) {
        trend = "alto"; // 🔴 Prezzo significativamente più alto
      }
    }

    // 2️⃣ Inserisci il nuovo prezzo nel DB
    await connection.execute(
      'INSERT INTO lista_spesa (prodotto, prezzo, trend) VALUES (?, ?, ?)',
      [prodotto, prezzo, trend]
    );

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;
