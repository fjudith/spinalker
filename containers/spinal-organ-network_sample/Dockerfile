FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    npm install --silent --save-dev -g typescript && \
    git clone https://github.com/spinalcom/spinal-organ-network_sample && \
    cd ${APP_PATH}/spinal-organ-network_sample && \
    rm -f .config.json5 && \
    npm install @types/node && \
    npm install

WORKDIR ${APP_PATH}/spinal-organ-network_sample

RUN ["npm", "run", "build"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-organ-network_sample ${APP_PATH}/spinal-organ-network_sample/

WORKDIR ${APP_PATH}/spinal-organ-network_sample

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./templates/config.json5.tpl /tmp/config.json5.tpl
COPY ./scripts/launch.config.js ./launch.config.js
COPY ./files/.apps.json ./.apps.json
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["pm2-runtime", "start", "launch.config.js"]
