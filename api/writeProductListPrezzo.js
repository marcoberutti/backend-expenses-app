const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.put('/:id', async (req, res) => {
  const { prezzo } = req.body;
  const id = req.params.id
  try {
    const connection = await getDBConnection();
    
    query = 'UPDATE lista_spesa SET prezzo = ? WHERE id = ?';
    values = [prezzo, id];
        
    await connection.query(query, values);
    await connection.end();
    res.json({ message:`Dati modificati correttamente`});
  } catch (err) {
    res.status(500).json({ error: `Errore nella query ${err}`});
    console.log(err)
  }
});

module.exports = router;