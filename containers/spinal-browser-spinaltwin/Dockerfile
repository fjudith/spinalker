FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git util-linux util-linux && \
    git clone https://github.com/spinalcom/spinal-browser-spinaltwin && \
    cd ${APP_PATH}/spinal-browser-spinaltwin && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-spinaltwin

RUN ["npm", "run", "build"]

CMD ["node", "index.js"]