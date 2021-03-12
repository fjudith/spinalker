FROM node:12-buster-slim as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

# RUN apk add --update --no-cache git && \
#     git --version

# RUN apt-get update -yq && apt-get install -yq \
#     git \
#     nodejs \
#     npm && \
#     apt-get autoremove -yqq --purge && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/* && \
#     ln -s /usr/bin/nodejs /usr/local/bin/node && \
#     ln -s /usr/bin/npm /usr/local/bin/npm

RUN apt-get update -yq && apt-get install -yq \
    git && \
    apt-get autoremove -yqq --purge && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


COPY ./.env spinal-organ-api-gateway/.env
COPY ./.yo-rc.json spinal-organ-api-gateway/.yo-rc.json
COPY ./index.js spinal-organ-api-gateway/index.js
COPY ./logger.js spinal-organ-api-gateway/logger.js
# COPY ./package-lock.json spinal-organ-api-gateway/package-lock.json
COPY ./package.json spinal-organ-api-gateway/package.json 
COPY ./config spinal-organ-api-gateway/config
COPY ./public spinal-organ-api-gateway/public
COPY ./spinal-api-management spinal-organ-api-gateway/spinal-api-management
COPY ./spinal-api-requests spinal-organ-api-gateway/spinal-api-requests
COPY ./uploads spinal-organ-api-gateway/uploads

WORKDIR ${APP_PATH}/spinal-organ-api-gateway

RUN ["npm", "install"]
RUN ["npm", "run"]