FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-env-viewer-library && \
    cd ${APP_PATH}/spinal-env-viewer-library && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-library

RUN ["npm", "run", "build"]
