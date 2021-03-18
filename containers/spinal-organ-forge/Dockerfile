FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-organ-forge && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH}/spinal-organ-forge && \
    yarn install

WORKDIR ${APP_PATH}/spinal-organ-forge

# RUN ["npm", "run", "create-ln"]
RUN ["mkdir", "-p", "viewerForgeFiles"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-organ-forge ${APP_PATH}/spinal-organ-forge/

WORKDIR ${APP_PATH}/spinal-organ-forge

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./files/.apps.json ./.apps.json
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN rm -f ${APP_PATH}/spinal-organ-forge/.config.json && \
    chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["pm2-runtime", "start", "launch.config.js"]
