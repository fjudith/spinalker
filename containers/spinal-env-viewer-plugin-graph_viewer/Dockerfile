FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-env-viewer-plugin-graph_viewer && \
    cd ${APP_PATH}/spinal-env-viewer-plugin-graph_viewer && \
    npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-plugin-graph_viewer

CMD ["node", "index.js"]
