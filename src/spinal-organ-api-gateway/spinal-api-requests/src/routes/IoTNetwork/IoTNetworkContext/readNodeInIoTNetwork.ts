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

import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import { findOneInContext } from '../../../utilities/findOneInContext';
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { IoTNetwork } from '../interfacesEndpointAndTimeSeries'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
  * @swagger
  * /api/v1/IoTNetworkContext/{IoTNetworkId}/node/{nodeId}/read:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: read a node in IoTNetwork
  *     summary: read a node in IoTNetwork
  *     tags:
  *       - IoTNetwork & Time Series
  *     parameters:
  *       - in: path
  *         name: IoTNetworkId
  *         description: Use the dynamic ID
  *       - in: path
  *         name: nodeId
  *         description: Use the dynamic ID
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           $ref: '#/definitions/IoTNetwork'
  *       400:
  *         description: Bad request
  */

  app.get("/api/v1/IoTNetworkContext/:IoTNetworkId/node/:nodeId/read", async (req, res, next) => {
    try {
      var IoTNetwork: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.IoTNetworkId, 10));
      var node: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.nodeId, 10));
      // @ts-ignore
      SpinalGraphService._addNode(node);

      if (IoTNetwork.getType().get() === "Network" && typeof node !== "undefined") {
        var info: IoTNetwork = {
          dynamicId: node._server_id,
          staticId: node.getId().get(),
          name: node.getName().get(),
          type: node.getType().get(),
        }
      }
      else if (IoTNetwork.getType().get() !== "Network") {
        return res.status(400).send("this context is not a Network");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(info);
  })
}
