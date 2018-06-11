# MEANTS-DOCKER
MEAN stack development with Angular and Express, both powered by Typescript. This repository was started under Angular 2 and updated to Angular 4.
This is using Docker Compose set up for running the application within 3 containers:
 - frontend: Angular4
 - backend: Express
 - database: MongoDB

## Prerequisites
 - Installing [Docker](https://www.docker.com/)
 

## Quick start
- Initializes application
```bash
# clone the repository
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/yraffin/meants-docker.git

# change directory to the repository directory
cd meants-docker

# Run docker (use -d to run in detached mode)
docker-compose up

# Restore MongoDB dump : ./mongodb-dump-00.agz
mongorestore --host localhost:27017  --gzip --archive=mongodb-dump-00.agz
```

- go to [http://localhost:8080](http://localhost:8080) in your browser
- use account admin/admin
 

## Devlopment
Frontend :
Just got some problems with latest stable node version (8.9.1)
Solve :
- Downgrade npm version to 5.2.0 : npm install -g npm@5.2.0
- Clear npm cache : npm cache clear --force
- Delete node_modules dir and run npm install again
Backend :
On npm install if you got a python missing error run :
```bash
# Install the windows tools 
npm install --global --production windows-build-tools
npm install --global node-gyp
# Set the python env var required by node build
setx PYTHON "%USERPROFILE%\.windows-build-tools\python27\python.exe"
```
