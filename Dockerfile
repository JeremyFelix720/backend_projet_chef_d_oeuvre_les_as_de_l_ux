# Version de Node utilisée (la plus récente)
FROM node:latest

# Répertoire de travail qui sera impacté par la dockerisation
WORKDIR /srv/app
# https://docs.docker.com/engine/reference/builder/#workdir
# https://www.baeldung.com/ops/docker-default-workdir

# Copie du fichier package.json dans le répertoire de travail (le point "." en 2ème argument)
COPY package*.json .

# Commande pour installer les dépendances de l'application dans l'image Docker
RUN npm install

# Copie du reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Transcompilation (convertion du code d’un langage à un autre, c'est-à-dire de TypeScript à JavaScript)
RUN npm run build

# Port sur lequel l'application est executée
EXPOSE 3052

# Commande pour executer l'application
CMD [ "node", "dist/index.js" ]

