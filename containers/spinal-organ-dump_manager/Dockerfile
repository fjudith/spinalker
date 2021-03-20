FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-organ-dump_manager && \
    cd ${APP_PATH}/spinal-organ-dump_manager && \
    npm install

WORKDIR ${APP_PATH}/spinal-organ-dump_manager

CMD ["node", "index.js"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-organ-dump_manager ${APP_PATH}/spinal-organ-dump_manager/

WORKDIR ${APP_PATH}/spinal-organ-dump_manager

COPY ./scripts/launch.config.js ./launch.config.js
COPY ./files/.apps.json ./.apps.json

CMD ["pm2-runtime", "start", "launch.config.js"]