FROM docker.io/fjudith/spinal-browser-admin:2.0.5-alpine as admin
FROM docker.io/fjudith/spinal-browser-spinaltwin:1.0.4-alpine as spinaltwin
FROM docker.io/fjudith/spinal-browser-appstore:1.0.1-alpine as appstore
FROM docker.io/fjudith/spinal-browser-drive:2.0.8-alpine as drive
FROM docker.io/fjudith/spinal-browser-graph-inspector:1.0.1-alpine as graph
FROM docker.io/fjudith/spinal-browser-user_role_manager:1.1.3-alpine as user_role_manager

FROM node:12-alpine as builder
# FROM node:12-buster-slim as builder

LABEL maintainer="Florian JUDITH <florian.judith.b@gmail.com>" \
      org.label-schema.url="https://github.com/fjudith/spinalker/blob/master/README.md" \
      org.label-schema.build-date="${BUILD_DATE}" \
      org.label-schema.version="${ANSIBLE_VERSION}" \
      org.label-schema.vcs-url="https://github.com/fjudith/spinalker.git" \
      org.label-schema.vcs-ref="${VCS_REF}" \
      org.label-schema.docker.dockerfile="containers/spinal-hub/Dockerfile" \
      org.label-schema.description="SpinalCom IoT nerve center" \
      org.label-schema.schema-version="1.0" 

ENV APP_PATH="/usr/share" \
    LANG="C.UTF-8" \
    USER="spinalhub" \
    USERID="10001" \
    GROUP="spinalhub" \
    GROUPID="10001"

RUN addgroup -g ${GROUPID} -S ${GROUP} && adduser -u ${USERID} -G ${GROUP} -S ${GROUP} && \
    apk add --update --no-cache bash git && \
    mkdir -vp \
    ${APP_PATH}/app/html \
    ${APP_PATH}/app/memory

# RUN groupadd --gid ${GROUPID} ${GROUP} && useradd --uid ${USERID} --groups ${GROUP} --gid ${GROUPID} ${GROUP} && \
#     apt-get update -y && apt-get install -y --no-install-recommends \
#     ca-certificates \
#     build-essential \
#     git && \
#     apt-get autoremove -yqq --purge && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*
    
WORKDIR ${APP_PATH}/app

# Install Spinal Core Hub
RUN npm install git+https://github.com/spinalcom/spinal-core-hub

COPY ./scripts/entrypoint.sh ./
COPY ./files/package.json ./
COPY --from=admin ${APP_PATH}/spinal-browser-admin/www ./html/admin/
COPY --from=appstore ${APP_PATH}/spinal-browser-appstore/www ./html/appstore/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/www ./html/drive/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector ./html/graph/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector/www ./html/graph-inspector/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/icons ./html/icons/
COPY --from=spinaltwin ${APP_PATH}/spinal-browser-spinaltwin/www ./html/spinaltwin/
COPY --from=user_role_manager ${APP_PATH}/spinal-browser-user_role_manager/www ./html/user_role_manager/

COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh && \
    chmod +x ${APP_PATH}/app/nerve-center/spinalhub && \
    ln -s ${APP_PATH}/app/nerve-center/spinalhub /usr/local/bin/spinalhub && \
    ln -s ${APP_PATH}/app/nerve-center/spinalhub /spinalhub && \
    ln -s ${APP_PATH}/app/nerve-center/memory/viewerForgeFile ${APP_PATH}/app/html/viewerForgeFile && \
    chown -R ${USER}:${GROUP} ./ && \
    ls -lha ./

EXPOSE 8888 8889 8890

USER ${USER}

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["spinalhub"]