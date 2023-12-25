FROM node:18.13 as builder
# Copier les fichiers nécessaires pour installer les dépendances
COPY /package.json /package.json
COPY /package-lock.json /package-lock.json

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Angular en mode production
RUN npm run build

# Utiliser une image légère pour exécuter l'application construite
FROM nginx:latest

# Copier les fichiers construits depuis l'image de construction
COPY --from=builder /src/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Aucune commande spécifique nécessaire, l'image NGINX le gère
