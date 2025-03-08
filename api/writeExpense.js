const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.put('/:id', async (req, res) => {
  const { tipo, importo, tipologia, descrizione, data} = req.body;
  const id = req.params.id
  let query = "";
  let values = [];
  try {
    const connection = await getDBConnection();
    const resetQuery = `
    UPDATE expenses 
    SET Spesa = NULL, Benzina = NULL, Extra = NULL, Casa = NULL, Salute = NULL, Income = NULL, Investimenti = NULL, tasse = NULL
    WHERE id = ?;
    `;
    await connection.query(resetQuery, [id]);
    if (tipo === "outcome") {
      switch (tipologia) {
        case 'Spesa':
          query = 'UPDATE expenses SET descrizione = ?, Spesa = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'Benzina':
          query = 'UPDATE expenses SET descrizione = ?, Benzina = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'Extra':
          query = 'UPDATE expenses SET descrizione = ?, Extra = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'Casa':
          query = 'UPDATE expenses SET descrizione = ?, Casa = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'Salute':
          query = 'UPDATE expenses SET descrizione = ?, Salute = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'Investimenti':
          query = 'UPDATE expenses SET descrizione = ?, Investimenti = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        case 'tasse':
          query = 'UPDATE expenses SET descrizione = ?, tasse = ?, data = ? WHERE id = ?';
          values = [descrizione, importo, data, id];
          break;
        default: return res.status(400).json({ error: "Tipologia non valida" });
      }
    } else if (tipo === "income") {
      query = 'UPDATE expenses SET descrizione = ?, Income = ?, data = ? WHERE id = ?';
      values = [descrizione, importo, data, id];
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }
    await connection.query(query, values);
    await connection.end();
    res.json({ message:`Dati modificati correttamente`});
  } catch (err) {
    res.status(500).json({ error: `Errore nella query ${err}`});
  }
});

module.exports = router;