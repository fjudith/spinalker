FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-browser-drive && \
    chmod +x $(pwd)/spinal-browser-drive/create_drive_env.js && \
    ln -s $(pwd)/spinal-browser-drive/create_drive_env.js /usr/local/bin/create_drive_env && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-browser-drive && \
    yarn install

WORKDIR ${APP_PATH}/spinal-browser-drive

RUN ["npm", "run", "build"]
