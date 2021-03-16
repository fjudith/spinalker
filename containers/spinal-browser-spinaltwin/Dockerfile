FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install babel-polyfill -g && \
    git clone https://github.com/spinalcom/spinal-browser-spinaltwin && \
    cd ${APP_PATH}/spinal-browser-spinaltwin && \
    npm install @types/node && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-spinaltwin

RUN ["npm", "run", "build"]

CMD ["node", "index.js"]