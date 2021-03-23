FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git && \
    git clone https://github.com/spinalcom/spinal-core-system && \
    ln -s $(pwd)/spinal-core-system/spinal-register.js /usr/local/bin/spinal-register && \
    cd ${APP_PATH}/spinal-core-system && \
    yarn install && \
    cd ${APP_PATH} && \
    git clone https://github.com/spinalcom/spinal-organ-forge && \
    cd ${APP_PATH}/spinal-organ-forge && \
    yarn install

WORKDIR ${APP_PATH}/spinal-organ-forge

# RUN ["npm", "run", "create-ln"]
RUN ["mkdir", "-p", "viewerForgeFiles"]

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
      org.label-schema.docker.dockerfile="containers/spinal-organ-forge/Dockerfile" \
      org.label-schema.description="SpinalCom organ forge" \
      org.label-schema.schema-version="1.0"

ENV APP_PATH="/usr/share" \
    LANG="C.UTF-8" \
    USER="spinalhub" \
    USERID="10001" \
    GROUP="spinalhub" \
    GROUPID="10001"

RUN addgroup -g ${GROUPID} -S ${GROUP} && adduser -u ${USERID} -G ${GROUP} -S ${GROUP} --system

COPY --from=builder ${APP_PATH}/spinal-organ-forge ${APP_PATH}/spinal-organ-forge/

WORKDIR ${APP_PATH}/spinal-organ-forge

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./files/.apps.json ./.apps.json
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN rm -f ${APP_PATH}/spinal-organ-forge/.config.json && \
    chmod +x ./entrypoint.sh && \
    chown -R ${USER}:${GROUP} ${APP_PATH}/spinal-organ-forge

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["pm2-runtime", "start", "launch.config.js"]
