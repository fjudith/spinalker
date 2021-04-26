FROM python:3-alpine

LABEL maintainer="Florian JUDITH <florian.judith.b@gmail.com>" \
      org.label-schema.url="https://github.com/fjudith/spinalker/blob/master/README.md" \
      org.label-schema.build-date="${BUILD_DATE}" \
      org.label-schema.version="${ANSIBLE_VERSION}" \
      org.label-schema.vcs-url="https://github.com/fjudith/spinalker.git" \
      org.label-schema.vcs-ref="${VCS_REF}" \
      org.label-schema.docker.dockerfile="containers/spinal-core-hub-dataset/Dockerfile" \
      org.label-schema.description="SpinalCom hub dataset loader" \
      org.label-schema.schema-version="1.0" 

ENV APP_PATH="/tmp" \
    LANG="C.UTF-8" \
    USER="spinalhub" \
    USERID="10001" \
    GROUP="spinalhub" \
    GROUPID="10001"

RUN addgroup -g ${GROUPID} -S ${GROUP} && adduser -u ${USERID} -G ${GROUP} -S ${GROUP} && \
    apk add --update --no-cache curl ca-certificates && \
    pip3 install s3cmd && \
    mkdir -vp ${APP_PATH}/memory/

RUN curl -OL https://dl.min.io/client/mc/release/linux-amd64/mc.sha256sum && \
    curl -OL https://dl.min.io/client/mc/release/linux-amd64/mc && \
    echo "$(cat mc.sha256sum | awk -F ' ' '{print $1}')  mc" | sha256sum -c && \
    rm -f ./mc.sha256sum && \
    chmod +x mc && \
    mv ./mc /usr/local/bin/

COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

USER ${USER}

CMD ["/bin/sh", "-c", "df"]
