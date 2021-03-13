FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git openssh && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts && \
    git clone https://github.com/spinalcom/spinal-browser-user_role_manager && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-browser-user_role_manager && \
    yarn install

WORKDIR ${APP_PATH}/spinal-browser-user_role_manager

RUN ["npm", "run", "build"]
