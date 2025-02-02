const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');

router.delete('/deleteExpense/:id', async (req, res) => {
  try {
    const connection = await getDBConnection();
    await connection.execute('DELETE FROM Tbl1 WHERE id = ?', [req.params.id]);
    await connection.end();
    res.json({ message: 'Dati eliminati correttamente' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;