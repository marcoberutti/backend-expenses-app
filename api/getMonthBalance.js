const express = require('express');
const router  = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.get('/', async (req, res) => {
  try {
    const connection = await getDBConnection();

    let results
      [results] = await connection.execute(`SELECT mese, marco, sara, cucito FROM \`monthly-balance\``);

    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
    console.log(err)
  }
});

module.exports = router;