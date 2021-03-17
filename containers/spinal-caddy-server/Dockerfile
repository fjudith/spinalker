# Routes
FROM docker.io/fjudith/spinal-browser-admin:2.0.5-alpine as admin
FROM docker.io/fjudith/spinal-browser-spinaltwin:1.1.0-alpine as spinaltwin
FROM docker.io/fjudith/spinal-browser-appstore:1.0.1-alpine as appstore
FROM docker.io/fjudith/spinal-browser-drive:2.0.8-alpine as drive
FROM docker.io/fjudith/spinal-browser-graph-inspector:1.0.2-alpine as graph
FROM docker.io/fjudith/spinal-browser-user_role_manager:1.1.3-alpine as user_role_manager
# Templates
FROM docker.io/fjudith/spinal-env-admin-panel-hub-status:1.0.1-alpine as env_admin_panel_hub_status
FROM docker.io/fjudith/spinal-env-admin-panel-user-manager:1.0.2-alpine as env_admin_panel_user_manager
FROM docker.io/fjudith/spinal-env-drive-panel-logs:1.0.0-alpine as env_drive_panel_logs
FROM docker.io/fjudith/spinal-env-drive-plugin-base:2.0.0-alpine as env_drive_plugin_base
FROM docker.io/fjudith/spinal-env-drive-plugin-digital_twin:1.0.2-alpine as env_drive_plugin_digital_twin
FROM docker.io/fjudith/spinal-env-drive-plugin-version_manager:1.0.7-alpine as env_drive_plugin_version_manager
FROM docker.io/fjudith/spinal-env-drive-plugin-visa:1.0.3-alpine as env_drive_plugin_visa
# Lib
FROM docker.io/fjudith/spinal-browser-viewer:2.0.6-alpine as browser_viewer


FROM node:12-alpine as builder

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY ./index.js spinal-http-server/index.js
COPY ./package.json spinal-http-server/package.json 

WORKDIR ${APP_PATH}/spinal-http-server

# Routes
COPY --from=admin ${APP_PATH}/spinal-browser-admin/www ./html/admin/
COPY --from=appstore ${APP_PATH}/spinal-browser-appstore/www ./html/appstore/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/www ./html/drive/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector ./html/graph/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector/www ./html/graph-inspector/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/icons ./html/icons/
COPY --from=spinaltwin ${APP_PATH}/spinal-browser-spinaltwin/www ./html/spinaltwin/
COPY --from=user_role_manager ${APP_PATH}/spinal-browser-user_role_manager/www ./html/user_role_manager/
# Templates
COPY --from=env_admin_panel_hub_status ${APP_PATH}/spinal-env-admin-panel-hub-status/templates ./html/templates/
COPY --from=env_admin_panel_user_manager ${APP_PATH}/spinal-env-admin-panel-user-manager/templates ./html/templates/
COPY --from=env_drive_panel_logs ${APP_PATH}/spinal-env-drive-panel-logs/templates ./html/templates/
COPY --from=env_drive_plugin_base ${APP_PATH}/spinal-env-drive-plugin-base/templates ./html/templates/
COPY --from=env_drive_plugin_digital_twin ${APP_PATH}/spinal-env-drive-plugin-digital_twin/templates ./html/templates/
COPY --from=env_drive_plugin_version_manager ${APP_PATH}/spinal-env-drive-plugin-version_manager/templates ./html/templates/
COPY --from=env_drive_plugin_visa ${APP_PATH}/spinal-env-drive-plugin-visa/templates ./html/templates/
# Libs
COPY --from=admin ${APP_PATH}/spinal-browser-admin/.browser_organs/lib/ ./html/lib/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/.browser_organs/lib/ ./html/lib/
COPY --from=browser_viewer ${APP_PATH}/spinal-browser-viewer/.browser_organs/lib/ ./html/lib/

RUN ["npm", "install"]

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM docker.io/amd64/caddy:2-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

COPY --from=builder ${APP_PATH}/spinal-http-server/html ${APP_PATH}/spinal-http-server/html/

WORKDIR ${APP_PATH}/spinal-http-server

RUN ls -lha

# Copy Web server configuraiton file
COPY templates/Caddyfile.tpl /etc/caddy/Caddyfile

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh 

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]