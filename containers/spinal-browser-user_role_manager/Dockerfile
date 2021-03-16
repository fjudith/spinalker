FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install babel-polyfill @types/node -g && \
    git clone https://github.com/fjudith/spinal-browser-user_role_manager && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH}/spinal-browser-user_role_manager && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-user_role_manager

RUN ["npm", "run", "build"]

CMD ["node", "index.js"]
