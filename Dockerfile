# Specify the base image to use, in this case, the node version
FROM node:latest

# Define the working directory, where the application will reside inside the Docker:
WORKDIR /srv/app
# https://docs.docker.com/engine/reference/builder/#workdir
# https://www.baeldung.com/ops/docker-default-workdir

# Copy package.json to the working directory ( le point "." en 2nd argument):
COPY package*.json .

# Run the npm install command to install the application dependencies on Docker
RUN npm install

# Copy the rest of the application files to Docker (dans le WRKDIR, à la racine ".")
COPY . .

# Transcompilation
RUN npm run build

# Expose the port the application will run on:
EXPOSE 3052

# Define the command to run the application. This is the same command that Node.js runs on when creating the application locally
CMD [ "node", "dist/index.js" ]