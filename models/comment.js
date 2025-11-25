const mongoose = require("mongoose");

// Initialisation du Schema //
const Schema = mongoose.Schema;

// création du model poue les commetaires //
const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, "le text du commentaire est obligatoire"],
  },
  link: {
    type: Schema.Types.ObjectId, // stock l'ID d'un objet link //
    ref: "Link", // fait référence au modèle Link //
    required: true,
  },
  createdAt:{
    type: Date, 
    default: Date.now, 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

// Export du modèle //
module.exports = mongoose.model("Comment", commentSchema);
