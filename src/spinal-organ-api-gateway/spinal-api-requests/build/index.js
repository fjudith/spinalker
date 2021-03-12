"use strict";
/*
 * Copyright 2020 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_server_1 = require("./api-server");
const swaggerUi = require("swagger-ui-express");
// @ts-ignore
const redoc_express_1 = require("redoc-express");
const swaggerJSDoc = require("swagger-jsdoc");
const listRequest_1 = require("./listRequest");
function Requests(logger) {
    let swaggerDocs = {};
    let api = api_server_1.default(logger);
    const options = {
        swagger: "2.0",
        produces: ["application/json"],
        swaggerDefinition: {
            swagger: "2.0",
            produces: ["application/json"],
            info: {
                // API informations (required)
                title: 'SpinalCore Graph API',
                version: '1.0.0',
                description: "Welcome to the reference documentation for the Spinalcore Digital Twin REST API! </br></br>To learn about the common use cases and concept of Spinalcore REST APIs, check out our resource center  (https://resourcecenter.fr.spinalcom.com/ressources-d%C3%A9veloppeur).</br></br>In addition to Spinalcore API Reference, we also provide complete documentation for integrator that need to install and implement Spinalcore Digital Twin Operating System on their built environment (https://resourcecenter.fr.spinalcom.com/ressources-int%C3%A9grateur)",
                termsOfService: "",
                contact: {
                    email: "developers@spinalcom.com"
                },
                swagger: "2.0",
                "x-logo": {
                    "url": "/logo.png"
                },
                "x-preferred": true,
                "x-providerName": "spinalcom.com",
                "x-unofficialSpec": true
            }
        },
        apis: listRequest_1.default
    };
    swaggerDocs = swaggerJSDoc(options);
    var swaggerUiOpts = {
        explorer: true,
        swagger: "2.0",
        produces: ["application/json"],
        swaggerOptions: options,
        customCss: '.topbar-wrapper img {content: url(/logo.png);} .swagger-ui .topbar {background: #dbdbdb;}'
    };
    // add swagger docs to API
    api.use('/spinalcom-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOpts));
    api.get('/docs/swagger.json', (req, res) => {
        res.send(swaggerDocs);
    });
    api.get('/spinalcom-api-docs2', redoc_express_1.default({
        title: 'API Docs',
        specUrl: '/docs/swagger.json'
    }));
    // serve logo.png file
    api.get('/logo.png', (req, res) => {
        res.sendFile('spinalcore.png', { root: __dirname });
    });
    return {
        // TODO host should be configurable
        run: function (port, host = process.env.REQUESTS_HOST) {
            if (host === "") {
                api.listen(port, () => {
                    logger.log({
                        level: 'info',
                        message: 'requests server running on ' + '::' + process.env.REQUESTS_PORT
                    });
                });
            }
            else {
                const _host = process.env.REQUESTS_HOST || 'localhost';
                api.listen(port, _host, () => {
                    logger.log({
                        level: 'info',
                        message: 'requests server running on ' + _host + ':' + process.env.REQUESTS_PORT
                    });
                });
            }
        },
        getSwaggerDocs: () => { return swaggerDocs; }
    };
}
exports.default = Requests;
//# sourceMappingURL=index.js.map