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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const networkService_1 = require("../networkService");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
    * @swagger
    * /api/v1/Network/create:
    *   security:
    *     - OAuth2: [read]
    *   post:
    *     description: create Network
    *     summary: create Network
    *     tags:
    *       - IoTNetwork & Time Series
    *     parameters:
    *      - in: body
    *        name: configNetwork
    *        description: configuration de Network.
    *        schema:
    *          type: object
    *          required:
    *            - configNetwork
    *          properties:
    *             IoTNetworkContext_DynamicId:
    *              type: string
    *             NetworkName:
    *              type: string
    *             NetworkTypeName:
    *              type: string
    *     responses:
    *       200:
    *         description: Create Successfully
    *       400:
    *         description: Bad request
    */
    app.post("/api/v1/Network/create", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.body.IoTNetworkContext_DynamicId));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
            let configService = {
                contextName: context.getName().get(),
                contextType: "IoTNetwork",
                networkName: req.body.NetworkName,
                networkType: req.body.NetworkTypeName
            };
            networkService_1.default().init(spinalAPIMiddleware.getGraph(), configService, true);
        }
        catch (error) {
            console.error(error);
            res.status(400).send();
        }
        res.json();
    }));
};
//# sourceMappingURL=createBmsNetwork.js.map