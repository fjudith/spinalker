const path = require('path');
// changer le path et port ici
const absPath = './html/'.split('/');
const root = path.join(__dirname, ...absPath);
const portHub = process.env.SPINALHUB_PORT || 7080;
const HUB_HOST = `http://localhost:${portHub}`; // modif here
const port = parseInt(portHub, 10) + 4;

var proxy = require('express-http-proxy');
var express = require('express');
var app = express();
const proxyHub = proxy(HUB_HOST, {
  limit: '1tb',
  proxyReqPathResolver: function (req) {
    return req.originalUrl;
  }
});

const routesToProxy = [
  '/sceen',
  '/get_user_id',
  '/get_admin_id',
  '/get_new_account',
  '/get_confirm_new_account',
  '/get_resend_confirmation',
  '/get_new_password',
  '/get_change_user_password',
  '/get_delete_account',
  '/get_change_user_password_by_admin',
  '/get_delete_account_by_admin',
  '/get_change_account_rights_by_admin'
];
for (const routeToProxy of routesToProxy) {
  app.use(routeToProxy, proxyHub);
}
app.use(express.static(root));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
