# Explication : ARG vs ENV dans Docker

## 🔍 Différence entre ARG et ENV

### `ARG` (Build-time)
- **Quand** : Disponible uniquement pendant le **BUILD** de l'image
- **Utilisation** : `docker build --build-arg VARIABLE=valeur`
- **Visibilité** : Reste dans l'historique Docker (`docker history`)
- **Cas d'usage** : Versions de packages, chemins de build, configurations de build

### `ENV` (Runtime)
- **Quand** : Disponible pendant l'**EXECUTION** du conteneur
- **Utilisation** : `docker run -e VARIABLE=valeur` ou dans docker-compose.yml
- **Visibilité** : Disponible dans le conteneur en cours d'exécution
- **Cas d'usage** : Secrets, URLs de base de données, configurations d'exécution

## ❌ Pourquoi `ARG JWT_SECRET` est une MAUVAISE pratique

```dockerfile
# ❌ MAUVAIS - Ne faites PAS ça pour les secrets !
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET
```

**Problèmes :**
1. Le secret reste dans l'historique Docker (visible avec `docker history`)
2. Le secret est "bake" dans l'image Docker
3. Si l'image est partagée, le secret est exposé
4. Impossible de changer le secret sans reconstruire l'image

## ✅ La BONNE pratique pour les secrets

### Option 1 : Variables d'environnement au runtime (Recommandé)

```bash
# Lancer le conteneur avec les variables d'environnement
docker run -e JWT_SECRET=mon_secret -e MONGO_URI=mongodb://... votre-image
```

### Option 2 : Fichier .env avec docker-compose

```yaml
# docker-compose.yml
services:
  app:
    build: .
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - MONGO_URI=${MONGO_URI}
```

```bash
# .env (ne JAMAIS commiter ce fichier !)
JWT_SECRET=mon_secret_super_securise
MONGO_URI=mongodb://localhost:27017/reddit
```

### Option 3 : Docker Secrets (Production avancée)

Pour Docker Swarm ou Kubernetes, utilisez les secrets natifs.

## 📝 Exemple concret : Quand utiliser ARG

```dockerfile
# ✅ BON - ARG pour des configurations de build
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG BUILD_DATE
ARG VCS_REF
LABEL build-date=$BUILD_DATE \
      vcs-ref=$VCS_REF

# ❌ MAUVAIS - Ne pas utiliser ARG pour les secrets
# ARG JWT_SECRET
# ENV JWT_SECRET=$JWT_SECRET
```

## 🎯 Résumé

| Type | Quand | Pour quoi | Exemple |
|------|-------|-----------|---------|
| `ARG` | Build-time | Versions, chemins, métadonnées | `ARG NODE_VERSION=18` |
| `ENV` | Runtime | Secrets, URLs, configurations | `ENV NODE_ENV=production` |
| Variables runtime | Runtime | Secrets sensibles | `docker run -e JWT_SECRET=...` |

**Règle d'or** : Les secrets (JWT_SECRET, mots de passe, clés API) ne doivent JAMAIS être dans le Dockerfile, mais toujours passés au runtime.

