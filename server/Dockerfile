FROM node:14.12

WORKDIR /usr/src/app/server
COPY package.json .
RUN npm install --only=prod
COPY . .
