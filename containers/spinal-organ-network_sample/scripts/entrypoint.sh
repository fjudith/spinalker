#!/bin/sh
set -e

# Setting default environnement variables values
# -----------------------------------------------
SPINALHUB_PORT=${SPINALHUB_PORT:-"8888"}
SPINALHUB_HOST=${SPINALHUB_HOST:-"localhost"}
SPINAL_USER_ID=${SPINAL_USER_ID:-"168"}
SPINAL_PASSWORD=${SPINAL_PASSWORD:-"6Y6Wv8nuJ"}
SPINAL_DTWIN_PATH=${SPINAL_DTWIN_PATH:-"/__users__/admin/deiv4"}

# Build configuration file, only if not mounted
# -----------------------------------------------
if ! ls ${APP_PATH}/spinal-organ-network_sample/.config.json; then
    cp /tmp/.config.json.tpl ${APP_PATH}/spinal-organ-network_sample/.config.json && \
    sed -i "s/__SPINALHUB_PORT__/${SPINALHUB_PORT}/g" ${APP_PATH}/spinal-organ-network_sample/.config.json
    sed -i "s/__SPINALHUB_HOST__/${SPINALHUB_HOST}/g" ${APP_PATH}/spinal-organ-network_sample/.config.json
    sed -i "s/__SPINAL_USER_ID__/${SPINAL_USER_ID}/g" ${APP_PATH}/spinal-organ-network_sample/.config.json
    sed -i "s/__SPINAL_PASSWORD__/${SPINAL_PASSWORD}/g" ${APP_PATH}/spinal-organ-network_sample/.config.json
    sed -i "s/__SPINAL_DTWIN_PATH__/${SPINAL_DTWIN_PATH}/g" ${APP_PATH}/spinal-organ-network_sample/.config.json
fi

exec "$@"