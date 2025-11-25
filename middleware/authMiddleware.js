// Middleware pour vérifier si l'utilisateur est authentifié //
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le token existe dans les headers //
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // extraire le token après Bearer //
      token = req.headers.authorization.split(" ")[1];
    }

    // Si pas de token, retourner une erreur //
    if (!token) {
      return res.status(401).json({ message: "Non autorisé, pas de Token." });
    }

    // Vérifier et décoder le token //
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur à la requete (sans le mot de passe) //
    req.user = await User.findById(decoded.id).select("-password");

    // Vérifier si l'utilisateur existe //
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    next();
  } catch (error) {
    // Gérer les erreurs de token invalide ou expiré //
    return res.status(401).json({ message: "Non autorisé, token invalide." });
  }
};

// Export du middleware //
module.exports = exports.protect;
