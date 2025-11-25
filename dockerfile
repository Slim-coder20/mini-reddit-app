FROM node:24.11-alpine3.22



# Création du dossier de l'application 
WORKDIR /app 

# Copie des fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

#installation des dépendances 
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# Copie des fichiers de l'application 
COPY . .

# 1. Récupérer les arguments du build 
ARG MONGO_URI 
ARG JWT_SECRET
ARG PORT

# 2. On transforme ces arguments en variables d'environements persistantes 
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT


#expose port 
EXPOSE 3000 

#Commande 
ENTRYPOINT  ["node", "index.js"]

