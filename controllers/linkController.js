// Ce fichier contient les fonctiions CRUD pour les liens // 
// 1- GET all links retourne la liste de tous les routes //
// 2- GET link by id retourne le lien correspondant à l'id //
// 3- POST create a new link //
// 4- PUT update a link //
// 5- DELETE delete a link //

const links = [
  {
    id: 1,
    title: "Super article sur Node.js",
    url: "https://exemple.com/node",
    description: "Un bon tuto.",
  },
  {
    id: 2,
    title: "React Hooks",
    url: "https://exemple.com/react",
    description: "Tout sur les hooks.",
  },
];

let nextId = 3;

// GET all links retourne la liste de tous les routes //
exports.getAllLinks = (req, res) => {
  res.status(200).json(links);
};

// GET link by id retourne le lien correspondant à l'id //
exports.getLinkById = (req, res) => {
  const link = links.find((link) => link.id === parseInt(req.params.id));
  if (!link) {
    return res.status(404).json({ massage: "Link not found" });
  }
  res.status(200).json({ link });
};

// POST = Création d'un link
exports.createLink = (req, res) => {
  const { title, url, description } = req.body;
  // On vérifie qu'on reçois bien un title et un url //
  if (!title || !url) {
    return res.status(400).json({ message: "title and url are required !" });
  }
  const newLink = {
    id: nextId++,
    title: title,
    url: url,
    description: description,
  };
  links.push(newLink);
  res.status(201).json(newLink);
};

// PUT : Modification d'un Link /: id //
exports.updateLinkById = (req, res) => {
  const link = links.find((link) => link.id === parseInt(req.params.id));
  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }
  link.title = req.body.title || link.title;
  link.url = req.body.url|| link.url;
  link.description = req.body.description || link.description;

  res.status(200).json(link);
};

// DELETE : Suppression d'un Link /: id // 
exports.deleteLinkById = (req, res) => {
  const index = links.findIndex((link) => link.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Link not found" });
  }
  links.splice(index, 1);
  res.status(204).send();
};