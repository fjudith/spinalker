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

import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { SpinalEventService } from "spinal-env-viewer-task-service";
import { Event } from '../../calendar/interfacesContextsEvents'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/room/{id}/event_list:
*   security:
*     - OAuth2: [read]
*   get:
*     description: Returns events of room
*     summary: Get list events of room
*     tags:
*       - Geographic Context
*     parameters:
*      - in: path
*        name: id
*        description: use the dynamic ID
*     responses:
*       200:
*         description: Success
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Event'
*       400:
*         description: Bad request
*/
  app.get("/api/v1/room/:id/event_list", async (req, res, next) => {
    try {
      var nodes = [];
      var room: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(room)
      if (room.getType().get() === "geographicRoom") {
        var listEvents = await SpinalEventService.getEvents(room.getId().get())
        for (const child of listEvents) {
          // @ts-ignore
          const _child = SpinalGraphService.getRealNode(child.id.get())
          if (_child.getType().get() === "SpinalEvent") {
            let info = {
              dynamicId: _child._server_id,
              staticId: _child.getId().get(),
              name: _child.getName().get(),
              type: _child.getType().get(),
              groupeID: _child.info.groupId.get(),
              categoryID: child.categoryId.get(),
              nodeId: _child.info.nodeId.get(),
              repeat: _child.info.repeat.get(),
              description: _child.info.description.get(),
              startDate: _child.info.startDate.get(),
              endDate: _child.info.endDate.get(),
            };
            nodes.push(info);
          }
        }
      } else {
        res.status(400).send("node is not of type geographic room");
      }


    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(nodes);
  })
}
