// Ce fichier contient les fonctiions CRUD pour les liens //
// 1- GET all links retourne la liste de tous les routes //
// 2- GET comment by id retourne le lien correspondant à l'id //
// 3- POST create a new comment //
// 4- PUT update a comment //
// 5- DELETE delete a comment //

const Comment = require("../models/comment.js");
const Link = require("../models/link.js"); 

// GET ALL comments retourne tous les commentaires //

exports.getCommentsForLink = async (req, res) => {
  try {
    // find retourne un tableau de comment du lien correspondant à l'id //
    // sort trie les commentaires du plaus récent au plus anciens ..//
    const comments = await Comment.find({ link: req.params.id })
      .populate("user", "email")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Erreur Server",
      error: error.message,
    });
  }
};

// Post create a new comment // 
exports.createComment = async (req, res) => {
  try {
    // On cherche le lien correspondant à l'id
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({message: "Link not found"})
    }
    // On créé un nouveau commentaire avec les props du body et l'id du user et le lien correspondant
    const newComment = await Comment.create({
      text: req.body.text,
      link: req.params.link,
      createdAt: Date.body.createdAt,
      user: req.user._id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({message: "Erreur Server", error: error.message});
  }
};
