const mongoose = require("mongoose");

// Connexion à la base de données MongoDB //
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connecté à la base de données MongoDB: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      `Erreur de connexion à la base de données MongoDB: ${error.message}`
    );
    process.exit(1);
    // 1 => erreur de connexion
    // 0 => connexion établie
  }
};

module.exports = connectDB;
