if (process.env.ENV !== "production") {
  require("dotenv").config({ path: "./.env.local", debug: true });
}


const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: `Accesso negato. API Key non valida.` });
  }

  next();
};

module.exports = apiKeyMiddleware;
