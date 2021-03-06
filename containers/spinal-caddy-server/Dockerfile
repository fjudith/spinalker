# Routes
FROM docker.io/fjudith/spinal-browser-admin:2.0.5-alpine as admin
FROM docker.io/fjudith/spinal-browser-spinaltwin:1.1.0-alpine as spinaltwin
FROM docker.io/fjudith/spinal-browser-appstore:1.0.1-alpine as appstore
FROM docker.io/fjudith/spinal-browser-drive:2.0.8-alpine as drive
FROM docker.io/fjudith/spinal-browser-graph-inspector:1.0.2-alpine as graph
FROM docker.io/fjudith/spinal-browser-user_role_manager:1.1.3-alpine as user_role_manager
# Templates
FROM docker.io/fjudith/spinal-env-admin-panel-hub-status:1.0.1-alpine as env_admin_panel_hub_status
FROM docker.io/fjudith/spinal-env-admin-panel-user-manager:2.0.0-alpine as env_admin_panel_user_manager
FROM docker.io/fjudith/spinal-env-drive-panel-logs:1.0.0-alpine as env_drive_panel_logs
FROM docker.io/fjudith/spinal-env-drive-plugin-base:2.0.0-alpine as env_drive_plugin_base
FROM docker.io/fjudith/spinal-env-drive-plugin-digital_twin:1.0.2-alpine as env_drive_plugin_digital_twin
FROM docker.io/fjudith/spinal-env-drive-plugin-version_manager:1.0.7-alpine as env_drive_plugin_version_manager
FROM docker.io/fjudith/spinal-env-drive-plugin-visa:1.0.3-alpine as env_drive_plugin_visa
# Libs
FROM docker.io/fjudith/spinal-browser-viewer:2.0.7-alpine as browser_viewer
# Patch
# FROM docker.io/fjudith/spinal-core-connectorjs:2.4.1-alpine as connectorjs


FROM docker.io/amd64/alpine:3 as static_content

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

# COPY ./index.js spinal-http-server/index.js
# COPY ./package.json spinal-http-server/package.json 

WORKDIR ${APP_PATH}/spinal-http-server

# Routes
COPY --from=admin ${APP_PATH}/spinal-browser-admin/www ./admin/
COPY --from=appstore ${APP_PATH}/spinal-browser-appstore/www ./appstore/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/www ./drive/
COPY --from=graph ${APP_PATH}/Spinal-browser-graph-inspector/www ./graph-inspector/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/icons ./icons/
COPY --from=spinaltwin ${APP_PATH}/spinal-browser-spinaltwin/www ./spinaltwin/
COPY --from=user_role_manager ${APP_PATH}/spinal-browser-user_role_manager/www ./user_role_manager/
COPY --from=browser_viewer ${APP_PATH}/spinal-browser-viewer/www ./viewer/
# Templates
COPY --from=env_admin_panel_hub_status ${APP_PATH}/spinal-env-admin-panel-hub-status/templates ./templates/
COPY --from=env_admin_panel_user_manager ${APP_PATH}/spinal-env-admin-panel-user-manager/templates ./templates/
COPY --from=env_drive_panel_logs ${APP_PATH}/spinal-env-drive-panel-logs/templates ./templates/
COPY --from=env_drive_plugin_base ${APP_PATH}/spinal-env-drive-plugin-base/templates ./templates/
COPY --from=env_drive_plugin_digital_twin ${APP_PATH}/spinal-env-drive-plugin-digital_twin/templates ./templates/
COPY --from=env_drive_plugin_version_manager ${APP_PATH}/spinal-env-drive-plugin-version_manager/templates ./templates/
COPY --from=env_drive_plugin_visa ${APP_PATH}/spinal-env-drive-plugin-visa/templates ./templates/
# Libs
COPY --from=browser_viewer ${APP_PATH}/spinal-browser-viewer/.browser_organs/lib ./lib/
COPY --from=admin ${APP_PATH}/spinal-browser-admin/.browser_organs/lib ./lib/
COPY --from=drive ${APP_PATH}/spinal-browser-drive/.browser_organs/lib ./lib/

# Patch
COPY files/lib ./lib/

# -----------------------------------------------
# Caddy nightly build
# -----------------------------------------------
FROM docker.io/amd64/caddy:2.4.0-beta.1-builder-alpine as caddy_builder

ENV CADDY_VERSION=0018b9be0d2e409cd80367c9e8403188723d0996

RUN xcaddy build

# -----------------------------------------------
# Production
# -----------------------------------------------
FROM docker.io/amd64/caddy:2.4.0-beta.1-alpine

ENV APP_PATH="/usr/share"

WORKDIR ${APP_PATH}

# Caddy devel build
COPY --from=caddy_builder /usr/bin/caddy /usr/local/bin/
RUN chmod +x /usr/bin/caddy

COPY --from=static_content ${APP_PATH}/spinal-http-server ${APP_PATH}/spinal-http-server/

WORKDIR ${APP_PATH}/spinal-http-server

# Copy Web server configuraiton file
COPY templates/Caddyfile.tpl /etc/caddy/Caddyfile

COPY ./templates/.config.json.tpl /tmp/.config.json.tpl
COPY ./scripts/entrypoint.sh /entrypoint.sh

RUN ln -sf ${APP_PATH}/spinal-http-server ./html && \
    ln -sf ${APP_PATH}/spinal-http-server/graph-inspector ./graph && \
    chmod +x /entrypoint.sh 

ENTRYPOINT [ "/entrypoint.sh" ]

CMD ["/usr/local/bin/caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]