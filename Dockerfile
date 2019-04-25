
FROM node:alpine AS builder
MAINTAINER docker_user  dihui.wang@transwarp.io
ARG APP_DIR="/usr/src/app/"

ENV PROJECT_ENV production

RUN
RUN npm install -g http-server --registry http://172.16.1.161:30033/repository/npm-group/
# RUN npm install --production && npm run build && npm install -g http-server

WORKDIR $APP_DIR
# ADD package.json ./
COPY package.json .npmrc $APP_DIR
RUN npm install
# --production

# ADD . $APP_DIR
RUN npm run build

EXPOSE 80
CMD http-server ./public -p 80

