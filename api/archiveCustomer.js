const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const connection = await getDBConnection();
    
    query = 'UPDATE clienti SET active = ? WHERE id = ?'; // Usa un placeholder per il valore
    values = ['false', id]; // Passa 'false' come stringa nell'array dei valori
    
    await connection.query(query, values);
    await connection.end();
    res.json({ message:`Cliente archiviato`});
  } catch (err) {
    res.status(500).json({ error: `Errore nella query ${err}`});
    console.log(err)
  }
});

module.exports = router;