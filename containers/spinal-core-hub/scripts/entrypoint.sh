#!/bin/sh
set -e

# Setting default environnement variables values
# -----------------------------------------------
HUB_BASE_DIR=${HUB_BASE_DIR:-"html"}
HUB_ADMIN_DIR=${HUB_ADMIN_DIR:-"admin"}
HUB_DB_FILE=${HUB_DB_FILE:-"memory/dump.db"}
HUB_DB_DIR=${HUB_DB_DIR:-"memory/data.db"}
HUB_VERBOSE=${HUB_VERBOSE:-"false"}
HUB_LAUNCH_BROWSER_SUPER=${HUB_LAUNCH_BROWSER_SUPER:-"false"}
HUB_LAUNCH_BROWSER=${HUB_LAUNCH_BROWSER:-"false"}
HUB_LAUNCH_COMMAND=${HUB_DB_FILE:-""}
HUB_START_PAGE=${HUB_START_PAGE:-"/"}
HUB_TITLE_PAGE=${HUB_TITLE_PAGE:-""}
HUB_PORT=${HUB_PORT:-"8888"}
HUB_SUPER_PORT=${HUB_SUPER_PORT:-"8889"}
HUB_SODA_PORT=${HUB_SODA_PORT:-"8890"}
HUB_ADMINPASS=${HUB_ADMINPASS:-"JHGgcz45JKilmzknzelf65ddDadggftIO98P"}
HUB_SUPERPASS=${HUB_SUPERPASS:-"4YCSeYUzsDG8XSrjqXgkDPrdmJ3fQqHs"}
HUB_PASS=${HUB_PASS:-"LQv2nm9G2rqMerk23Tav2ufeuRM2K5RG"}
HUB_MODIFY_PASSWORDS=${HUB_MODIFY_PASSWORDS:-"false"}

# Compose command line arguements
# -----------------------------------------------
CMD_ARGS=""
CMD_ARGS="${CMD_ARGS} --base-dir $HUB_BASE_DIR"
CMD_ARGS="${CMD_ARGS} --admin-dir $HUB_ADMIN_DIR"
CMD_ARGS="${CMD_ARGS} --db-file $HUB_DB_FILE"
# CMD_ARGS="${CMD_ARGS} ---db-file $HUB_DB_FILE"
CMD_ARGS="${CMD_ARGS} --db-dir $HUB_DB_DIR"
CMD_ARGS="${CMD_ARGS} --port $HUB_PORT"
CMD_ARGS="${CMD_ARGS} --super-port $HUB_SUPER_PORT"
CMD_ARGS="${CMD_ARGS} --soda-port $HUB_SODA_PORT"

if [ "${HUB_MODIFY_PASSWORDS}" == "true" ]; then
  CMD_ARGS="${CMD_ARGS} --modify-passwords"
else
  CMD_ARGS="${CMD_ARGS} --adminpass $HUB_ADMINPASS"
  CMD_ARGS="${CMD_ARGS} --superpass $HUB_SUPERPASS"
  CMD_ARGS="${CMD_ARGS} --pass $HUB_PASS"
fi

if [ "${HUB_VERBOSE}" == "true" ]; then
  CMD_ARGS="${CMD_ARGS} --verbose"
fi

if [ "${HUB_LAUNCH_BROWSER_SUPER}" == "true" ]; then
  CMD_ARGS="${CMD_ARGS} --launch-browser-super"
  CMD_ARGS="${CMD_ARGS} --start-page $HUB_START_PAGE"
  CMD_ARGS="${CMD_ARGS} --title-page $HUB_TITLE_PAGE"
elif [ "${HUB_LAUNCH_BROWSER}" == "true" ]; then
  CMD_ARGS="${CMD_ARGS} --launch-browser"
  CMD_ARGS="${CMD_ARGS} --start-page $HUB_START_PAGE"
  CMD_ARGS="${CMD_ARGS} --title-page $HUB_TITLE_PAGE"
elif ! [ "${HUB_LAUNCH_COMMAND}" == "" ]; then
  CMD_ARGS="${CMD_ARGS} --launch-command ${HUB_LAUNCH_COMMAND}"
fi

# echo "Commant line arguments: '${CMD_ARGS}'"

exec $@ ${CMD_ARGS}