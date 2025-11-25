const express = require("express");
const app = express();
const dotenv = require("dotenv");

// Charger les variables d'environnement EN PREMIER
dotenv.config();

const connectDB = require("./db/db");

//Import des routes
const linkRoutes = require("./routes/links");
const authRoutes = require("./routes/auth");

// Logger (middleware : effectué avant le traitement de la requête reçue)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes de base
app.get("/", (req, res) => {
  res.send("Bienvenue sur le mini-reddit !");
});

// "Monter" les routes des liens
app.use("/api/links", linkRoutes);
app.use("/api/auth", authRoutes);

// Connexion à la base de données MongoDB //
connectDB();

const PORT = process.env.PORT || 3000;
// Démarrage du serveur //
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
