const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.get('/', async (req, res) => {
  try {
    const connection = await getDBConnection();

    const [results] = await connection.execute('SELECT * FROM events');
    await connection.end();
    res.json(results);
    console.log(results)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;
