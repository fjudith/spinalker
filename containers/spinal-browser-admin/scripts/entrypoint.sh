#!/bin/sh
set -e

# Setting default environnement variables values
# -----------------------------------------------
SPINALHUB_PORT=${SPINALHUB_PORT:-"8888"}
SPINALHUB_HOST=${SPINALHUB_HOST:-"localhost"}

SPINAL_USER_ID=${SPINAL_USER_ID:-"168"}
SPINAL_PASSWORD=${SPINAL_PASSWORD:-"6Y6Wv8nuJ"}
SPINAL_PASSWORD_ROOT=${SPINAL_PASSWORD_ROOT:-"uD24R2eeC"}
SPINAL_PASSWORD_USER=${SPINAL_PASSWORD_USER:-"jk57gZ3RE"}

# Build configuration file, only if not mounted
# -----------------------------------------------
if ! ls ${APP_PATH}/spinal-browser-admin/.config.json; then
    cp /tmp/.config.json.tpl ${APP_PATH}/spinal-browser-admin/.config.json && \
    sed -i "s/__SPINALHUB_PORT__/${SPINALHUB_PORT}/g" ${APP_PATH}/spinal-browser-admin/.config.json
    sed -i "s/__SPINALHUB_HOST__/${SPINALHUB_HOST}/g" ${APP_PATH}/spinal-browser-admin/.config.json
    sed -i "s/__SPINAL_USER_ID__/${SPINAL_USER_ID}/g" ${APP_PATH}/spinal-browser-admin/.config.json
    sed -i "s/__SPINAL_PASSWORD__/${SPINAL_PASSWORD}/g" ${APP_PATH}/spinal-browser-admin/.config.json
    sed -i "s/__SPINAL_PASSWORD_ROOT__/${SPINAL_PASSWORD_ROOT}/g" ${APP_PATH}/spinal-browser-admin/.config.json
    sed -i "s/__SPINAL_PASSWORD_USER__/${SPINAL_PASSWORD_USER}/g" ${APP_PATH}/spinal-browser-admin/.config.json
fi

exec "$@"