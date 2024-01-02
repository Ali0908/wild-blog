FROM node:18.13 as builder

WORKDIR /src
# Copier les fichiers nécessaires pour installer les dépendances
COPY /package.json /package.json
COPY /package-lock.json /package-lock.json

# Installer les dépendance
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

CMD npm start
