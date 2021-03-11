FROM node:alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-organ-dump_manager && \
    cd ${APP_PATH}/spinal-organ-dump_manager && \
    npm install

WORKDIR ${APP_PATH}/spinal-organ-dump_manager

RUN ["npm", "run"]
