FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    npm install --silent --save-dev -g typescript && \
    git clone https://github.com/spinalcom/spinal-spatial-referential-service && \
    cd ${APP_PATH}/spinal-spatial-referential-service && \
    npm install @types/node && \
    npm install

WORKDIR ${APP_PATH}/spinal-spatial-referential-service

CMD ["node", "dist/index.js"]
