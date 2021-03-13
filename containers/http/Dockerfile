FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY ./index.js http/index.js
# COPY ./package-lock.json http/package-lock.json
COPY ./package.json http/package.json 

WORKDIR ${APP_PATH}/http

RUN ["npm", "install"]

CMD ["node", "index.js"]