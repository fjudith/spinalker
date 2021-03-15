FROM docker.io/fjudith/spinal-browser-admin:2.0.5-alpine as admin
FROM docker.io/fjudith/spinal-browser-spinaltwin:1.0.4-alpine as spinaltwin
FROM docker.io/fjudith/spinal-browser-appstore:1.0.1-alpine as appstore
FROM docker.io/fjudith/spinal-browser-drive:2.0.8-alpine as drive
FROM docker.io/fjudith/spinal-browser-graph-inspector:1.0.1-alpine as graph
FROM docker.io/fjudith/spinal-browser-user_role_manager:1.1.3-alpine as user_role_manager

FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY ./index.js spinal-http-server/index.js
COPY ./package.json spinal-http-server/package.json 

WORKDIR ${APP_PATH}/spinal-http-server

COPY --from=admin ${APP_PATH}/spinal-browser-admin/www ./html/admin/
COPY --from=appstore ${APP_PATH}/spinal-browser-appstore/www ./html/appstore/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/www ./html/drive/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector ./html/graph/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector/www ./html/graph-inspector/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/icons ./html/icons/
COPY --from=spinaltwin ${APP_PATH}/spinal-browser-spinaltwin/www ./html/spinaltwin/
COPY --from=user_role_manager ${APP_PATH}/spinal-browser-user_role_manager/www ./html/user_role_manager/

RUN ["npm", "install"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM keymetrics/pm2:12-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-http-server ${APP_PATH}/spinal-http-server/

WORKDIR ${APP_PATH}/spinal-http-server

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/launch.config.js ./launch.config.js
COPY ./files/.apps.json ./.apps.json
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh 

ENTRYPOINT [ "./entrypoint.sh" ]

EXPOSE 8888 8889 8890

CMD ["pm2-runtime", "start", "launch.config.js"]