FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-browser-drive && \
    chmod +x $(pwd)/spinal-browser-drive/create_drive_env.js && \
    ln -s $(pwd)/spinal-browser-drive/create_drive_env.js /usr/local/bin/create_drive_env && \
    cd ${APP_PATH}/spinal-browser-drive && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-env-drive-core && \
    chmod +x $(pwd)/spinal-env-drive-core/create_plugin_template.js && \
    ln -s $(pwd)/spinal-env-drive-core/create_plugin_template.js /usr/local/bin/create_plugin_template && \
    cd ${APP_PATH}/spinal-env-drive-core && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-lib-drive-env && \
    cd ${APP_PATH}/spinal-lib-drive-env && \
    npm install

WORKDIR ${APP_PATH}/spinal-lib-drive-env

# RUN ["npm", "run", "build"]
