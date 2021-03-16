FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-lib-admin-env && \
    git clone https://github.com/spinalcom/spinal-browser-admin && \
    ln -s $(pwd)/spinal-browser-admin/create_admin_env.js /usr/local/bin/create_admin_env && \
    cd ${APP_PATH}/spinal-browser-admin && \
    npm install && \
    cd ${APP_PATH}/spinal-lib-admin-env && \
    npm install

WORKDIR ${APP_PATH}/spinal-lib-admin-env

# RUN ["npm", "run", "build"]
