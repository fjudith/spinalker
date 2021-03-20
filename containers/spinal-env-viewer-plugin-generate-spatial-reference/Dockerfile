FROM node:12-alpine as builder
# FROM node:12-buster-slim as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-env-viewer-plugin-generate-spatial-reference && \
    cd ${APP_PATH}/spinal-env-viewer-plugin-generate-spatial-reference && \
    npm install @types/node && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-plugin-generate-spatial-reference

CMD ["node", "index.js"]
