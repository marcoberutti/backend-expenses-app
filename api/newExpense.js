const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');

router.post('/newExpense', async (req, res) => {
  try {
    const { tipo, importo, tipologia, descrizione } = req.body;
    const connection = await getDBConnection();

    let query;
    let values = [descrizione, parseFloat(importo)];

    if (tipo === "outcome") {
      switch (tipologia) {
        case 'spesa': query = 'INSERT INTO Tbl1 (descrizione, Spesa) VALUES (?, ?)'; break;
        case 'benzina': query = 'INSERT INTO Tbl1 (descrizione, Benzina) VALUES (?, ?)'; break;
        case 'extra': query = 'INSERT INTO Tbl1 (descrizione, Extra) VALUES (?, ?)'; break;
        case 'casa': query = 'INSERT INTO Tbl1 (descrizione, Casa) VALUES (?, ?)'; break;
        case 'salute': query = 'INSERT INTO Tbl1 (descrizione, Salute) VALUES (?, ?)'; break;
        default: return res.status(400).json({ error: "Tipologia non valida" });
      }
    } else if (tipo === "entrata") {
      query = 'INSERT INTO Tbl1 (descrizione, Income) VALUES (?, ?)';
    } else {
      return res.status(400).json({ error: "Tipo non valido" });
    }

    await connection.execute(query, values);
    await connection.end();
    res.json({ message: 'Dati inseriti correttamente' });

  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
  }
});