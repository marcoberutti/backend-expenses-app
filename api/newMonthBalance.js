const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');
const columns = require('../columns')

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { meseCorrente, marco, sara, cucito } = req.body;
    const connection = await getDBConnection();

    let query;
    let values;

    query = `INSERT INTO \`monthly-balance\` (mese, marco, sara, cucito) VALUES (?, ?, ?, ?)`;
    values = [meseCorrente, marco, sara, cucito];

    await connection.execute(query, values);
    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' });
  }
});


module.exports = router;