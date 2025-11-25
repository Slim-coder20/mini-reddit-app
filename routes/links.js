const express = require("express");
const linkController = require("../controllers/linkController");
const {
  getCommentsForLink,
  createComment,
} = require("../controllers/commentController");

// inclure un middleware pour vérifier si l'utilisateur est authentifié //
const protect = require("../middleware/authMiddleware");
// Initialisation du Router //
const router = express.Router();

// Route CRUD pour les liens  //
router.get("/", linkController.getAllLinks);
router.post("/", protect, linkController.createLink);
router.get("/:id", linkController.getLinkById);
router.put("/:id", protect, linkController.updateLinkById);
router.delete("/:id", protect, linkController.deleteLinkById);

// route pour les commentaires //
router.get("/:id/comments", getCommentsForLink);
router.post("/:id/comments", protect, createComment);

module.exports = router;
