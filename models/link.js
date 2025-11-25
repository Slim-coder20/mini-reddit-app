const mongoose = require("mongoose");

// initialiation du schema //
const Schema = mongoose.Schema;

// Schéma de la collection links //
const linkSchema = new Schema({
  title: {
    type: String,
    required: [true, "Le titre est obligatoire"],
    trim: false, // enlève les espaces superflus
  },
  url: {
    type: String,
    required: [true, " l'url est obligatoire"],
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export du modèle
module.exports = mongoose.model("Link", linkSchema);
