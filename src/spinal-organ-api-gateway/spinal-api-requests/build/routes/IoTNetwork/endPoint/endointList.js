"use strict";
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
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/device/{id}/endpoint_list:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: Return list of endpoint
  *     summary: Gets a list of endpoint
  *     tags:
  *      - IoTNetwork & Time Series
  *     parameters:
  *      - in: path
  *        name: id
  *        description: Use The Dynamic ID
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/IoTNetwork'
  *       400:
  *         description: Bad request
   */
    app.get("/api/v1/device/:id/endpoint_list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let nodes = [];
        try {
            let device = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(device);
            var endpoints = yield device.getChildren("hasBmsEndpoint");
            for (const endpoint of endpoints) {
                let info = {
                    dynamicId: endpoint._server_id,
                    staticId: endpoint.getId().get(),
                    name: endpoint.getName().get(),
                    type: endpoint.getType().get()
                };
                nodes.push(info);
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("list of endpoints is not loaded");
        }
        res.send(nodes);
    }));
};
//# sourceMappingURL=endointList.js.map