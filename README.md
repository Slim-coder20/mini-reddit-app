# Mini-Reddit API

API REST pour une application de type Reddit permettant de partager des liens, créer des posts et ajouter des commentaires.

## 🚀 Fonctionnalités

- **Authentification** : Inscription et connexion avec JWT
- **Gestion des liens** : CRUD complet (Créer, Lire, Modifier, Supprimer)
- **Commentaires** : Ajouter des commentaires aux liens
- **Sécurité** : Hashage des mots de passe avec bcrypt, authentification par token JWT
- **Docker** : Configuration Docker et Docker Compose pour un déploiement facile

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (ou Docker pour utiliser MongoDB via Docker Compose)
- npm ou yarn

## 🛠️ Installation

### Installation locale

1. Cloner le dépôt :
```bash
git clone https://github.com/Slim-coder20/mini-reddit-app.git
cd mini-reddit-app
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet :
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mini-reddit
JWT_SECRET=votre_secret_jwt_ici
```

4. Démarrer le serveur :
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

### Installation avec Docker

1. Cloner le dépôt :
```bash
git clone https://github.com/Slim-coder20/mini-reddit-app.git
cd mini-reddit-app
```

2. Lancer avec Docker Compose :
```bash
docker compose up -d
```

L'application sera accessible sur `http://localhost:3000` et MongoDB sur le port `27017`.

## 📚 API Endpoints

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse** : Retourne un token JWT à inclure dans les en-têtes des requêtes protégées.

### Liens

#### Récupérer tous les liens
```http
GET /api/links
```

#### Récupérer un lien par ID
```http
GET /api/links/:id
```

#### Créer un lien (authentification requise)
```http
POST /api/links
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Titre du lien",
  "url": "https://example.com",
  "description": "Description optionnelle"
}
```

#### Modifier un lien (authentification requise)
```http
PUT /api/links/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nouveau titre",
  "url": "https://newexample.com",
  "description": "Nouvelle description"
}
```

#### Supprimer un lien (authentification requise)
```http
DELETE /api/links/:id
Authorization: Bearer <token>
```

### Commentaires

#### Récupérer les commentaires d'un lien
```http
GET /api/links/:id/comments
```

#### Ajouter un commentaire (authentification requise)
```http
POST /api/links/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Contenu du commentaire"
}
```

## 🔐 Authentification

Les routes protégées nécessitent un token JWT dans l'en-tête `Authorization` :
```
Authorization: Bearer <votre_token_jwt>
```

Le token est obtenu lors de la connexion via `/api/auth/login`.

## 🏗️ Structure du projet

```
.
├── controllers/          # Contrôleurs (logique métier)
│   ├── authController.js
│   ├── linkController.js
│   └── commentController.js
├── db/                   # Configuration de la base de données
│   └── db.js
├── middleware/           # Middlewares Express
│   └── authMiddleware.js
├── models/               # Modèles Mongoose
│   ├── user.js
│   ├── link.js
│   └── comment.js
├── routes/               # Routes Express
│   ├── auth.js
│   └── links.js
├── docker-compose.yml    # Configuration Docker Compose
├── dockerfile            # Configuration Docker
├── index.js              # Point d'entrée de l'application
└── package.json
```

## 🐳 Docker

### Build de l'image
```bash
docker build -t mini-reddit-api .
```

### Lancer avec Docker Compose
```bash
docker compose up -d
```

### Arrêter les conteneurs
```bash
docker compose down
```

### Voir les logs
```bash
docker compose logs -f
```

## 📦 Technologies utilisées

- **Express.js** : Framework web pour Node.js
- **MongoDB** : Base de données NoSQL
- **Mongoose** : ODM pour MongoDB
- **JWT** : Authentification par token
- **bcryptjs** : Hashage des mots de passe
- **dotenv** : Gestion des variables d'environnement
- **Docker** : Containerisation

## 🔧 Scripts disponibles

- `npm start` : Démarrer l'application en mode production
- `npm run dev` : Démarrer l'application en mode développement (avec nodemon)

## 📝 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `PORT` | Port du serveur | `3000` |
| `MONGO_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/mini-reddit` |
| `JWT_SECRET` | Secret pour signer les tokens JWT | `votre_secret_jwt` |

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

ISC

## 👤 Auteur

Slim-coder20

