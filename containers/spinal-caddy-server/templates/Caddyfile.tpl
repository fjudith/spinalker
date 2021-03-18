# The Caddyfile is an easy way to configure your Caddy web server.
#
# Unless the file starts with a global options block, the first
# uncommented line is always the address of your site.
#
# To use your own domain name (with automatic HTTPS), first make
# sure your domain's A/AAAA DNS records are properly pointed to
# this machine's public IP, then replace the line below with your
# domain name.
:__LISTEN_PORT__

# Set this path to your site's directory.
# root * /usr/share/caddy
root * /usr/share/spinal-http-server/

# Enable the static file server.
# https://caddyserver.com/docs/caddyfile/directives/file_server
file_server browse

# Another common task is to set up a reverse proxy:
# reverse_proxy localhost:8080

# Or serve a PHP site through php-fpm:
# php_fastcgi localhost:9000


# Configure logging
log {
	output stdout
	level INFO
}

# Spinal Core Hub redirections
reverse_proxy /sceen __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_user_id __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_admin_id __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_new_account __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_confirm_new_account __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_resend_confirmation __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_new_password __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_change_user_password __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_delete_account __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_change_user_password_by_admin __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_delete_account_by_admin __SPINALHUB_HOST__:__SPINALHUB_PORT__

reverse_proxy /get_change_account_rights_by_admin __SPINALHUB_HOST__:__SPINALHUB_PORT__

# Refer to the Caddy docs for more information:
# https://caddyserver.com/docs/caddyfile

# root /admin /usr/share/spinal-http-server/admin/index.html
# root /appstore /usr/share/spinal-http-server/appstore/index.html
# root /drive /usr/share/spinal-http-server/drive/index.html
# root /graph /usr/share/spinal-http-server/graph/index.html
# root /graph-inspector /usr/share/spinal-http-server/graph-inspector/index.html
# root /icons /usr/share/spinal-http-server/icons
# root /lib /usr/share/spinal-http-server/lib
# root /spinaltwin /usr/share/spinal-http-server/spinaltwin
# root /templates /usr/share/spinal-http-server/templates
# root /user_role_manager /usr/share/spinal-http-server/user_role_manager
