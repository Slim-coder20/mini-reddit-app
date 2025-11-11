const express = require("express");
const linkController = require("../controllers/linkController");

// Initialisation du Router //
const router = express.Router();

// Route CRUD pour les liens  //
router.get("/", linkController.getAllLinks);
router.post("/", linkController.createLink);
router.get("/:id", linkController.getLinkById);
router.put("/:id", linkController.updateLinkById);
router.delete("/:id", linkController.deleteLinkById);

module.exports = router;
