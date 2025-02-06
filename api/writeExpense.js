const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.put('/:id', async (req, res) => {
  const { tipo, importo, tipologia, descrizione} = req.body;
  const id = req.params.id
  let query = "";
  let values = [];
  try {
    const connection = await getDBConnection();
    if (tipo === "outcome") {
      switch (tipologia) {
        case 'spesa':
          query = 'UPDATE expenses SET descrizione = ?, Spesa = ? WHERE id = ?';
          values = [descrizione, importo, id];
          break;
        case 'benzina':
          query = 'UPDATE expenses SET descrizione = ?, Benzina = ? WHERE id = ?';
          values = [descrizione, importo, id];
          break;
        case 'extra':
          query = 'UPDATE expenses SET descrizione = ?, Extra = ? WHERE id = ?';
          values = [descrizione, importo, id];
          break;
        case 'casa':
          query = 'UPDATE expenses SET descrizione = ?, Casa = ? WHERE id = ?';
          values = [descrizione, importo, id];
          break;
        case 'salute':
          query = 'UPDATE expenses SET descrizione = ?, Salute = ? WHERE id = ?';
          values = [descrizione, importo, id];
          break;
        default: return res.status(400).json({ error: "Tipologia non valida" });
      }
    } else if (tipo === "income") {
      query = 'UPDATE expenses SET descrizione = ?, Income = ? WHERE id = ?';
      values = [descrizione, importo, id];
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }
    await connection.query(query, values);
    await connection.end();
    res.json({ message:`Dati modificati correttamente`});
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query'});
  }
});

module.exports = router;