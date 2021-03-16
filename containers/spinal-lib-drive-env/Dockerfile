FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-lib-drive-env && \
    git clone https://github.com/spinalcom/spinal-browser-drive && \
    ln -s $(pwd)/spinal-browser-drive/create_drive_env.js /usr/local/bin/create_drive_env && \
    cd ${APP_PATH}/spinal-browser-drive && \
    npm install && \
    cd ${APP_PATH}/spinal-lib-drive-env && \
    npm install

WORKDIR ${APP_PATH}/spinal-lib-drive-env

# RUN ["npm", "run", "build"]
