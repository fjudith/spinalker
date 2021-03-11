FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-browser-spinaltwin && \
    cd ${APP_PATH}/spinal-browser-spinaltwin && \
    yarn install

WORKDIR ${APP_PATH}/spinal-browser-spinaltwin

RUN ["npm", "run"]
