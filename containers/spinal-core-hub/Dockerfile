FROM alpine:3 

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

RUN addgroup -g ${GROUPID} -S ${GROUP} && adduser -u ${USERID} -G ${GROUP} -S ${GROUP} --system && \
    apk add --update --no-cache curl ca-certificates && \
    mkdir -vp ${APP_PATH}/app/memory

WORKDIR ${APP_PATH}/app

# Download spinalhub binary
ENV SHA256="5a3b57d2ccc304b69e664a83a866e31a38f8366c65fbca8ea9b262127e607f8b"

RUN curl -OL https://raw.githubusercontent.com/spinalcom/spinal-core-hub/master/spinalhub && \
    echo "${SHA256}  spinalhub" | sha256sum -c -

COPY ./scripts/entrypoint.sh ./

COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh && \
    chmod +x ${APP_PATH}/app/spinalhub && \
    mkdir -vp ${APP_PATH}/app/memory/viewerForgeFile && \
    chown -R ${USER}:${GROUP} ./ 

EXPOSE 8888 8889 8890

USER ${USER}

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["./spinalhub"]