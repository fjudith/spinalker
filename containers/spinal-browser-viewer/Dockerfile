FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install babel-polyfill @types/node forever -g && \
    npm install git+https://github.com/spinalcom/spinal-browser-viewer-offline && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-browser-viewer && \
    cd ${APP_PATH}/spinal-browser-viewer && \
    npm install browserify exorcist fs path babel-preset-stage-3 && \
    npm install && \
    npm run build

WORKDIR ${APP_PATH}/spinal-browser-viewer

# RUN ["node", "create_viewer_env.js", "--watcher", "&", "sleep 20"]
RUN ["forever", "start", "create_view_env.js", "--watcher", "&&", "sleep 30"]