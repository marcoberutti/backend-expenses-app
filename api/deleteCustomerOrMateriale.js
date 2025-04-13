const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.delete('/:id/:table', async (req, res) => {
  try {
    const {id, table } = req.params;

    const allowedTables = ['clienti', 'materiali'];
    
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: 'Tabella non permessa' });
    }

    const connection = await getDBConnection();
    await connection.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [id]); // 🔐 usa backtick per sicurezza
    await connection.end();
    
    res.json({ message: 'Dati eliminati correttamente' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query: ' + err.message });
  }
});


module.exports = router;