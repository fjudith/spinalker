/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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

import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import groupManagerService from "spinal-env-viewer-plugin-group-manager-service"
import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
 * @swagger
 * /api/v1/endPointsGroup/{id}/read:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: read group endPoints Group
 *     summary: Gets group endPoints Group
 *     tags:
 *       - EndPoints Group
 *     parameters:
 *      - in: path
 *        name: id
 *        description: use the dynamic ID
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Context'
 *       400:
 *         description: Bad request
  */

  app.get("/api/v1/endPointsGroup/:id/read", async (req, res, next) => {
    try {

      var groupContext: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(groupContext)
      if (groupContext.getType().get() === "BmsEndpointGroupContext") {
        var info = {
          dynamicId: groupContext._server_id,
          staticId: groupContext.getId().get(),
          name: groupContext.getName().get(),
          type: groupContext.getType().get()
        }
      } else {
        res.status(400).send("node is not type of BmsEndpointGroupContext ");
      }

    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(info);
  });
}
