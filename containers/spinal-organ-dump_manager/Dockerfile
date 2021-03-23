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

LABEL maintainer="Florian JUDITH <florian.judith.b@gmail.com>" \
      org.label-schema.url="https://github.com/fjudith/spinalker/blob/master/README.md" \
      org.label-schema.build-date="${BUILD_DATE}" \
      org.label-schema.version="${ANSIBLE_VERSION}" \
      org.label-schema.vcs-url="https://github.com/fjudith/spinalker.git" \
      org.label-schema.vcs-ref="${VCS_REF}" \
      org.label-schema.docker.dockerfile="containers/spinal-core-dump_manager/Dockerfile" \
      org.label-schema.description="SpinalCom organ dump manager" \
      org.label-schema.schema-version="1.0"

ENV APP_PATH="/usr/share" \
    LANG="C.UTF-8" \
    USER="spinalhub" \
    USERID="10001" \
    GROUP="spinalhub" \
    GROUPID="10001"

RUN addgroup -g ${GROUPID} -S ${GROUP} && adduser -u ${USERID} -G ${GROUP} -S ${GROUP} --system

COPY --from=builder ${APP_PATH}/spinal-organ-dump_manager ${APP_PATH}/spinal-organ-dump_manager/

WORKDIR ${APP_PATH}/spinal-organ-dump_manager

COPY ./scripts/launch.config.js ./launch.config.js
COPY ./files/.apps.json ./.apps.json

RUN chown -R ${USER}:${GROUP} ${APP_PATH}/spinal-organ-dump_manager

USER ${USER}

CMD ["pm2-runtime", "start", "launch.config.js"]