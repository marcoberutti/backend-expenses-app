const express = require('express');
const router = express.Router();
const { getDBConnection } = require('../index.js');

app.get('/dati', async (req, res) => {
  try {
    const connection = await getDBConnection();
    const [results] = await connection.execute('SELECT * FROM Tbl1');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
  }
});