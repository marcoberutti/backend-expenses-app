const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');
const columns = require('../columns');

router.use(apiKeyMiddleware);

router.put('/:id', async (req, res) => {
  const { tipo, importo, tipologia, descrizione, data} = req.body;
  const id = req.params.id
  let query = "";
  let values = [];
  const colonneTipologiche = columns;
  try {
    const connection = await getDBConnection();
    const resetQuery = `
    UPDATE expenses
    SET ${colonneTipologiche.map(col => `${col} = NULL`).join(', ')}
    WHERE id = ?;
    `;
    await connection.query(resetQuery, [id]);
    if (req.body) {
          query = `UPDATE expenses SET descrizione = ?, ${tipologia} = ?, data = ? WHERE id = ?`;
          values = [descrizione, importo, data, id]; 
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }
    await connection.query(query, values);
    await connection.end();
    res.json({ message:`Dati modificati correttamente`});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Errore nella query ${err}`});
  }
});

module.exports = router;