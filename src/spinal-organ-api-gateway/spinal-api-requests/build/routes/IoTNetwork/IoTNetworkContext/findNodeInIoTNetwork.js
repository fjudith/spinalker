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
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const findOneInContext_1 = require("../../../utilities/findOneInContext");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
    * @swagger
    * /api/v1/IoTNetworkContext/{IoTNetworkId}/node/{nodeId}/find:
    *   security:
    *     - OAuth2: [read]
    *   get:
    *     description: find a node in IoTNetwork
    *     summary: find a node in IoTNetwork
    *     tags:
    *       - IoTNetwork & Time Series
    *     parameters:
    *       - in: path
    *         name: IoTNetworkId
    *         description: Use the dynamic ID
    *       - in: path
    *         name: nodeId
    *         description: Use the static ID
    *     responses:
    *       200:
    *         description: Success
    *         schema:
    *           $ref: '#/definitions/IoTNetwork'
    *       400:
    *         description: Bad request
    */
    app.get("/api/v1/IoTNetworkContext/:IoTNetworkId/node/:nodeId/find", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var IoTNetwork = yield spinalAPIMiddleware.load(parseInt(req.params.IoTNetworkId, 10));
            var node = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(req.params.nodeId);
            if (IoTNetwork.getType().get() === "Network" && typeof node === "undefined") {
                node = yield findOneInContext_1.findOneInContext(IoTNetwork, IoTNetwork, (n) => n.getId().get() === req.params.nodeId);
                if (typeof node === "undefined") {
                    return res.status(400).send("ko");
                }
                // @ts-ignore
                spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            }
            else if (IoTNetwork.getType().get() !== "Network") {
                return res.status(400).send("this context is not a Network");
            }
            var info = {
                dynamicId: node._server_id,
                staticId: node.getId().get(),
                name: node.getName().get(),
                type: node.getType().get(),
            };
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json(info);
    }));
};
//# sourceMappingURL=findNodeInIoTNetwork.js.map