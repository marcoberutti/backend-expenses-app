const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.delete('/:id', async (req, res) => {
  try {
    const {id } = req.params;

    const connection = await getDBConnection();
    await connection.execute(`DELETE FROM materiali WHERE id = ?`, [id]);
    await connection.end();
    
    res.json({ message: 'Dati eliminati correttamente' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query: ' + err.message });
  }
});


module.exports = router;