const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.delete('/:id', async (req, res) => {
  try {
    const connection = await getDBConnection();
    await connection.execute('DELETE FROM clienti WHERE id = ?', [req.params.id]);
    await connection.end();
    res.json({ message: 'Cliente eliminato correttamente' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;