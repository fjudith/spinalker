FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git --version

COPY ./.env spinal-organ-api-gateway/.env
COPY ./.yo-rc.json spinal-organ-api-gateway/.yo-rc.json
COPY ./index.js spinal-organ-api-gateway/index.js
COPY ./logger.js spinal-organ-api-gateway/logger.js
COPY ./package-lock.json spinal-organ-api-gateway/package-lock.json
COPY ./package.json spinal-organ-api-gateway/package.json 
COPY ./config spinal-organ-api-gateway/config
COPY ./public spinal-organ-api-gateway/public
COPY ./spinal-api-management spinal-organ-api-gateway/spinal-api-management
COPY ./spinal-api-requests spinal-organ-api-gateway/spinal-api-requests
COPY ./uploads spinal-organ-api-gateway/uploads

WORKDIR ${APP_PATH}/spinal-organ-api-gateway

RUN ["npm", "install"]
RUN ["npm", "run"]