FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/Spinal-browser-graph-inspector && \
    cd ${APP_PATH}/Spinal-browser-graph-inspector && \
    npm install --save-dev babel-polyfill && \
    npm install --save-dev

WORKDIR ${APP_PATH}/Spinal-browser-graph-inspector

RUN ["npm", "run", "build"]
