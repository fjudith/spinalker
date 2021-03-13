FROM node:12-alpine as builder
# FROM node:12-buster-slim as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    npm install --silent --save-dev -g typescript && \
    git clone https://github.com/spinalcom/spinal-organ-network_sample && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-organ-network_sample && \
    yarn install

# RUN apt-get update -yq && apt-get install -yq \
#     git && \
#     apt-get autoremove -yqq --purge && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/* && \
#     git clone https://github.com/spinalcom/spinal-organ-network_sample && \
#     git clone https://github.com/spinalcom/spinal-core-system && \
#     ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
#     cd ${APP_PATH}/spinal-core-system && \
#     yarn install && \
#     cd ${APP_PATH}/spinal-organ-network_sample && \
#     yarn install

WORKDIR ${APP_PATH}/spinal-organ-network_sample

RUN ["npm", "run", "build"]

CMD ["node", "dist/index.js"]
