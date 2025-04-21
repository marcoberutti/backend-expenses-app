const express = require('express');
const router  = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');
const ALLOWED_TABLES = require('../config')

router.use(apiKeyMiddleware);

router.get('/', async (req, res) => {
  try {
    const connection = await getDBConnection();
    const table = req.query.table;
    if(!ALLOWED_TABLES.includes(table)){
      return res.status(400).json({ error: 'nome tabella non valido'})
    }
    let results
    if (table === "lista_prodotti") {
      [results] = await connection.execute(`SELECT DISTINCT prodotto FROM ${table}`);
    } else {
      [results] = await connection.execute(`SELECT * FROM ${table}`);
    }
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
    console.log(err)
  }
});

module.exports = router;