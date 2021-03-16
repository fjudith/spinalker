FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install babel-polyfill @types/node -g && \
    git clone https://github.com/spinalcom/spinal-browser-appstore && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH}/spinal-browser-appstore && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-appstore

RUN ["npm", "run", "build"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-browser-appstore ${APP_PATH}/spinal-browser-appstore/

WORKDIR ${APP_PATH}/spinal-browser-appstore

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 8888 8889 8890

CMD ["pm2-runtime", "start", "launch.config.js"]