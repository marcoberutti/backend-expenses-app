const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { prodotto } = req.body;
    const connection = await getDBConnection();

    // 2️⃣ Inserisci il nuovo prezzo nel DB
    await connection.execute(
      'INSERT INTO lista_spesa (prodotto) VALUES (?)',
      [prodotto]
    );

    await connection.end();
    res.json({ message: 'Dati inseriti correttamente'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' + err });
  }
});

module.exports = router;
