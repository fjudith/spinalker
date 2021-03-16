FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base util-linux && \
    npm install git+https://github.com/spinalcom/spinal-browser-viewer-offline && \
    git clone https://github.com/spinalcom/spinal-browser-viewer && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    npm install && \
    cd ${APP_PATH}/spinal-browser-viewer && \
    npm install

WORKDIR ${APP_PATH}/spinal-browser-viewer

# RUN apk add --update --no-cache git python build-base util-linux && \
#     npm install git+https://github.com/spinalcom/spinal-browser-viewer_sample && \
#     npm install git+https://github.com/spinalcom/spinal-browser-viewer-offline && \
#     npm install git+https://github.com/spinalcom/spinal-browser-viewer && \
#     npm install git+https://github.com/spinalcom/spinal-core-system

RUN ["npm", "run", "build"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-browser-viewer/ ${APP_PATH}/spinal-browser-viewer/

WORKDIR ${APP_PATH}/spinal-browser-viewer

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["pm2-runtime", "start", "launch.config.js"]
