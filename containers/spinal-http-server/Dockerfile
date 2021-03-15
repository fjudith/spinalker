FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY ./index.js spinal-http-server/index.js
COPY ./package.json spinal-http-server/package.json 

WORKDIR ${APP_PATH}/spinal-http-server

RUN ["npm", "install"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-http-server ${APP_PATH}/spinal-http-server/

WORKDIR ${APP_PATH}/spinal-http-server

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/launch.config.js ./launch.config.js
COPY ./files/.apps.json ./.apps.json
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh && \
    ln -s $(pwd)/nerve-center/spinalhub /spinalhub

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 8888 8889 8890

CMD ["pm2-runtime", "start", "launch.config.js"]