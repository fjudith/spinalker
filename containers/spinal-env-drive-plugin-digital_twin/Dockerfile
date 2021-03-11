FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

RUN apk add --update --no-cache git python build-base && \
    git clone https://github.com/spinalcom/spinal-env-drive-plugin-digital_twin && \
    git clone https://github.com/spinalcom/spinal-env-drive-core && \
    chmod +x $(pwd)/spinal-env-drive-core/create_plugin_template.js && \
    ln -s $(pwd)/spinal-env-drive-core/create_plugin_template.js /usr/local/bin/create_plugin_template && \
    cd ${APP_PATH}/spinal-env-drive-core && \
    yarn install && \
    cd ${APP_PATH}/spinal-env-drive-plugin-digital_twin && \
    yarn install

WORKDIR ${APP_PATH}/spinal-env-drive-plugin-digital_twin

RUN ["npm", "run"]