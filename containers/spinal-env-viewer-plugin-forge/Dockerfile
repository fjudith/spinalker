FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-env-viewer-plugin-forge && \
    cd ${APP_PATH}/spinal-env-viewer-plugin-forge && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-plugin-forge

CMD ["node", "dist/index.js"]
