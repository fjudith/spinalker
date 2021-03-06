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

import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import SpinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: SpinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/Network/{id}/delete:
*   security:
*     - OAuth2: [read]
*   delete:
*     description: delete network
*     summary: delete network 
*     tags:
*       - IoTNetwork & Time Series
*     parameters:
*      - in: path
*        name: id
*        description: Use The Dynamic ID
*     responses:
*       200:
*         description: Delete Successfully
*       400:
*         description: Bad request
*/
  app.delete("/api/v1/Network/:id/delete", async (req, res, next) => {
    try {
      let Network = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      // @ts-ignore
      SpinalGraphService._addNode(Network);
      if (Network.getType().get() === "BmsNetwork") {
        Network.removeFromGraph();
      }
      else {
        res.status(400).send("this node is not of type BmsNetwork");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json();
  })
}
