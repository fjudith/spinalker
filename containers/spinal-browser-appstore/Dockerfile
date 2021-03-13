FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git util-linux && \
    git clone https://github.com/spinalcom/spinal-browser-appstore && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-browser-appstore && \
    yarn install

WORKDIR ${APP_PATH}/spinal-browser-appstore

RUN ["npm", "run", "build"]
