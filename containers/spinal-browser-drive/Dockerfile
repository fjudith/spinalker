FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-browser-drive && \
    chmod +x $(pwd)/spinal-browser-drive/create_drive_env.js && \
    ln -s $(pwd)/spinal-browser-drive/create_drive_env.js /usr/local/bin/create_drive_env && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH}/spinal-browser-drive && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-drive

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-browser-drive ${APP_PATH}/spinal-browser-drive/

WORKDIR ${APP_PATH}/spinal-browser-drive

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/launch.config.js ./launch.config.js
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh && \
    ln -s $(pwd)/nerve-center/spinalhub /spinalhub

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 8888 8889 8890

CMD ["pm2-runtime", "start", "launch.config.js"]