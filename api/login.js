const express = require('express');
const router = express.Router();
const getDBConnection = require('../db');
const apiKeyMiddleware = require('../middlewares/auth');

router.use(apiKeyMiddleware);

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await getDBConnection();

    values = [email, password]
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const [rows] = await connection.execute(query, [email, password]);
    await connection.execute(query, values);
    await connection.end();
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0], message: "Loggato correttamente"});
    } else {
      res.status(401).json({ error: "Credenziali non valide" });
    }
  } catch (err) {
    res.status(500).json({ error: 'Errore nella query' });
  }
});

module.exports = router;