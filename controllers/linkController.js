// Ce fichier contient les fonctiions CRUD pour les liens //
// 1- GET all links retourne la liste de tous les routes //
// 2- GET link by id retourne le lien correspondant à l'id //
// 3- POST create a new link //
// 4- PUT update a link //
// 5- DELETE delete a link //

const Link = require("../models/link.js");
const Comment = require("../models/comment");

// GET all links retourne la liste de tous les routes //
exports.getAllLinks = async (req, res) => {
  try {
    // find() retourne un tableau de liens //
    // sort({ createdAt: -1 }) trie les liens par date de création, de la plus récente à la plus ancienne //
    const links = await Link.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des liens",
      error: error.message,
    });
  }
};

// GET link by id retourne le lien correspondant à l'id //
exports.getLinkById = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id).populate("user", "email");
    if (!link) {
      return res.status(404).json({ massage: "Link not found" });
    }
    res.status(200).json({ link });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des liens",
      error: error.message,
    });
  }
};

// POST = Création d'un link
exports.createLink = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const newLink = await Link.create({
      // Utilisation du spread peraator pour copier les propriétes du body dns le nouveaux lien créé
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: "Erreur de création :" + error.message });
  }
};

// PUT : Modification d'un Link /: id //
exports.updateLinkById = async (req, res) => {
  try {
    const updatedLink = await Link.findByIdAndUpdate(
      req.params.id, // Id document à mettre a jour //
      req.body, // Donées à mettre à jour //
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }
    // renvoie une réponse 200 Modification réussi //
    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: "Erreur de validation :" + error.message });
  }
};

// DELETE : Suppression d'un Link /: id //
exports.deleteLinkById = async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    await Comment.deleteMany({link: req.params.id}); 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erreur de Validation:" + error.message });
  }
};
