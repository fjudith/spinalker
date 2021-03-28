FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install babel-polyfill @types/node forever -g && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-browser-drive && \
    chmod +x $(pwd)/spinal-browser-drive/create_drive_env.js && \
    ln -s $(pwd)/spinal-browser-drive/create_drive_env.js /usr/local/bin/create_drive_env && \
    cd ${APP_PATH}/spinal-browser-drive && \
    npm install browserify exorcist fs path babel-preset-stage-3 && \
    npm install && \
    npm run build && \
    forever start create_drive_env.js --watcher && \
    sleep 30

WORKDIR ${APP_PATH}/spinal-browser-drive