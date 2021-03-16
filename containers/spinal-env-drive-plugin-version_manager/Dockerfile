FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-env-drive-plugin-version_manager && \
    git clone https://github.com/spinalcom/spinal-env-drive-core && \
    ln -s $(pwd)/spinal-env-drive-core/create_plugin_template.js /usr/local/bin/create_plugin_template && \
    cd ${APP_PATH}/spinal-env-drive-core && \
    npm install && \
    cd ${APP_PATH}/spinal-env-drive-plugin-version_manager && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-drive-plugin-version_manager

RUN ["npm", "run", "build"]
