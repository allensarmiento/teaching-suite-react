FROM node:alpine

WORKDIR /usr/src/app/client
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
