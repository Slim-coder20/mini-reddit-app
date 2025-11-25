const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Création du schéma de l'utilisateur pour la base de données //
// Initialisation du Schema //
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "L'email doit être valide"],
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire"],
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    maxlength: [20, "Le mot de passe ne doit pas dépasser 20 caractères"],
    select: false, // le mot de passe n'est pas retourné par défaut dans les réponses JSON
  }
}, {timestamps: true});

// Hashage du mot de passe avant la sauvegarde dans la base de données //
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer le mot de passe saisi avec le mot de passe hashé //
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);