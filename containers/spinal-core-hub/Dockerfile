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