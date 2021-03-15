FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-env-admin-panel-user-manager && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-env-admin-panel-user-manager && \
    yarn install

WORKDIR ${APP_PATH}/spinal-env-admin-panel-user-manager

RUN ["npm", "run", "build"]
