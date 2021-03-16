FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-browser-admin && \
    chmod +x $(pwd)/spinal-browser-admin/create_admin_env.js && \
    ln -s $(pwd)/spinal-browser-admin/create_admin_env.js /usr/local/bin/create_admin_env && \
    cd ${APP_PATH}/spinal-browser-admin && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-lib-admin-env && \
    cd ${APP_PATH}/spinal-lib-admin-env && \
    npm install

WORKDIR ${APP_PATH}/spinal-lib-admin-env

# RUN ["npm", "run", "build"]
