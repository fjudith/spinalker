FROM node:12-alpine as builder
# FROM node:12-buster-slim as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    npm install --silent --save-dev -g typescript && \
    git clone https://github.com/spinalcom/spinal-env-viewer-plugin-documentation-service && \
    cd ${APP_PATH}/spinal-env-viewer-plugin-documentation-service && \
    npm install @types/node && \
    npm install

# RUN apt-get update -yq && apt-get install -yq \
#     git node-typescript && \
#     apt-get autoremove -yqq --purge && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/* && \
#     git clone https://github.com/spinalcom/spinal-env-viewer-plugin-documentation-service && \
#     cd ${APP_PATH}/spinal-env-viewer-plugin-documentation-service && \
#     npm install @types/node && \
#     npm install

WORKDIR ${APP_PATH}/spinal-env-viewer-plugin-documentation-service

RUN ["npm", "run", "build"]

CMD ["node", "dist/index.js"]
