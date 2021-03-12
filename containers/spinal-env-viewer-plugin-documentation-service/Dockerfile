FROM node:12-buster-slim as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apt-get update -yq && apt-get install -yq \
    git && \
    apt-get autoremove -yqq --purge && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    git clone https://github.com/spinalcom/spinal-env-viewer-plugin-documentation-service && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-env-viewer-plugin-documentation-service && \
    yarn install

WORKDIR ${APP_PATH}/spinal-env-viewer-plugin-documentation-service

RUN ["npm", "run"]