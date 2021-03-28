FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    ln -s $(pwd)/spinal-browser-admin/create_admin_env.js /usr/local/bin/create_admin_env && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-browser-admin && \
    cd ${APP_PATH}/spinal-browser-admin && \
    npm install browserify exorcist fs path babel-preset-stage-3 && \
    npm install && \
    npm run build && \
    forever start create_viewer_env.js --watcher && \
    sleep 30

WORKDIR ${APP_PATH}/spinal-browser-admin