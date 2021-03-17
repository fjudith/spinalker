FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    git clone https://github.com/spinalcom/spinal-browser-spinaltwin && \
    cd ${APP_PATH}/spinal-browser-spinaltwin && \
    npm install --save-dev \
        babel-polyfill \
        v-tooltip \
        bootstrap-vue \
        axios \
        vue-router \
        file-saver && \
    npm install git+https://github.com/spinalcom/spinal-model-graph && \
    npm install git+https://github.com/spinalcom/spinal-env-viewer-plugin-group-manager-service && \
    npm install git+https://github.com/spinalcom/spinal-env-viewer-plugin-excel-manager-service && \
    npm install git+https://github.com/spinalcom/spinal-env-viewer-plugin-forge && \
    npm install git+https://github.com/spinalcom/spinal-forge-viewer && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-spinaltwin

RUN ["npm", "run", "build"]

CMD ["node", "index.js"]