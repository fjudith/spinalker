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
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";
import { serviceTicketPersonalized } from 'spinal-service-ticket'
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/ticket/{ticketId}/find_entity:
*   security:
*     - OAuth2: [read]
*   get:
*     description: Return entity of ticket
  *     summary: Get entity of ticket
*     tags:
*       - Workflow & ticket
*     parameters:
*      - in: path
*        name: ticketId
*        description: use the Dynamic ID
*     responses:
*       200:
*         description: Success
*         schema:
  *           $ref: '#/definitions/SimpleNode'
*       400:
*         description: Bad request
*/
  app.get("/api/v1/ticket/:ticketId/find_entity", async (req, res, next) => {
    try {
      var _ticket = await spinalAPIMiddleware.load(parseInt(req.params.ticketId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(_ticket)

      var elementSelected = await spinalAPIMiddleware.loadPtr(_ticket.info.elementSelected)


      var info = {
        dynamicId: elementSelected._server_id,
        staticId: elementSelected.getId().get(),
        name: elementSelected.getName().get(),
        type: elementSelected.getType().get(),
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(info);
  })
}
