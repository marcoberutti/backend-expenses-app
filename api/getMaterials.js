const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.get('/', async (req, res) => {
  try {

    const connection = await getDBConnection();
    const [results] = await connection.execute('SELECT * FROM materiali');
    await connection.end();
    res.json(results);
    await connection.end();
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query o server: ' + err.message });
  }
});

module.exports = router;
