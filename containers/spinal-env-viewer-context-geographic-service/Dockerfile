FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-env-viewer-context-geographic-service && \
    cd ${APP_PATH}/spinal-env-viewer-context-geographic-service && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-context-geographic-service

RUN ["npm", "run"]
