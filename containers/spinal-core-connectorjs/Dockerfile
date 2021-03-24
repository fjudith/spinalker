FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git bash && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-core-connectorjs && \
    cd ${APP_PATH}/spinal-core-connectorjs && \
    npm install && \
    chmod +x ./build.sh

WORKDIR ${APP_PATH}/spinal-core-connectorjs

RUN ["npm", "run", "build-for-browser"]
