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

import SpinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { EndPointRoom } from '../interfacesGeoContext'
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: SpinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/room/{id}/endpoint_list:
*   security:
*     - OAuth2: [read]
*   get:
*     description: Return list of endpoint
*     summary: Gets a list of endpoint
*     tags:
*      - Geographic Context
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
*             $ref: '#/definitions/EndPointRoom'
*       400:
*         description: Bad request
 */



  app.get("/api/v1/room/:id/endpoint_list", async (req, res, next) => {

    let nodes = [];
    try {

      let room = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      // @ts-ignore
      SpinalGraphService._addNode(room);
      if (room.getType().get() === "geographicRoom") {

        var endpoints = await room.getChildren("hasEndPoint");

        for (const endpoint of endpoints) {
          var element = await endpoint.element.load()
          var currentValue = element.currentValue.get();
          let info: EndPointRoom = {
            dynamicId: endpoint._server_id,
            staticId: endpoint.getId().get(),
            name: endpoint.getName().get(),
            type: endpoint.getType().get(),
            currentValue: currentValue
          };
          nodes.push(info);
        }
      } else {
        res.status(400).send("node is not of type geographic room");
      }


    } catch (error) {
      console.error(error);
      res.status(400).send("list of endpoints is not loaded");
    }
    res.send(nodes);
  });
}
