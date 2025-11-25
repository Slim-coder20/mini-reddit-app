// ============================================
// FICHIER : authController.js
// DESCRIPTION : Contrôleur pour l'authentification des utilisateurs
// Fonctionnalités : Inscription (register) et Connexion (login)
// ============================================

// Import du modèle User pour interagir avec la base de données
const User = require("../models/user");
// Import de jsonwebtoken pour générer et vérifier les tokens JWT
const jwt = require("jsonwebtoken");

// ============================================
// FONCTION : generateToken
// DESCRIPTION : Génère un token JWT pour un utilisateur
// PARAMÈTRES : id - L'identifiant de l'utilisateur
// RETOUR : Un token JWT valide pendant 30 jours
// ============================================
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ============================================
// FONCTION : register
// DESCRIPTION : Crée un nouveau compte utilisateur
// ROUTE : POST /api/auth/register
// PARAMÈTRES BODY : { email, password }
// RETOUR : { _id, email, token } ou erreur
// ============================================
exports.register = async (req, res) => {
  // Extraction de l'email et du mot de passe depuis le corps de la requête
  const { email, password } = req.body;

  try {
    // Création d'un nouvel utilisateur dans la base de données
    // Le mot de passe sera automatiquement hashé par le modèle User (via un pre-save hook)
    const user = await User.create({ email, password });

    // Retourner les informations de l'utilisateur créé avec un token JWT
    // On ne retourne PAS le mot de passe pour des raisons de sécurité
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id), // Génération d'un token pour l'authentification future
    });
  } catch (error) {
    // Gestion des erreurs (email déjà existant, validation échouée, etc.)
    res.status(400).json({ message: error.message });
  }
};

// ============================================
// FONCTION : login
// DESCRIPTION : Authentifie un utilisateur existant
// ROUTE : POST /api/auth/login
// PARAMÈTRES BODY : { email, password }
// RETOUR : { _id, email, token } ou erreur
// ============================================
exports.login = async (req, res) => {
  // Extraction de l'email et du mot de passe depuis le corps de la requête
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    // .select("+password") : inclut le champ password (normalement exclu par défaut)
    // Nécessaire pour pouvoir comparer le mot de passe fourni avec celui en base
    const user = await User.findOne({ email }).select("+password");

    // Vérification si l'utilisateur existe
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Comparaison du mot de passe fourni avec le hash stocké en base de données
    // matchPassword est une méthode définie dans le modèle User
    const isMatch = await user.matchPassword(password);

    // Vérification si le mot de passe correspond
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Si tout est correct, retourner les informations de l'utilisateur avec un nouveau token
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id), // Génération d'un nouveau token pour cette session
    });
  } catch (error) {
    // Gestion des erreurs serveur (erreur de connexion DB, etc.)
    res.status(500).json({ message: "Erreur Server", error: error.message });
  }
};
