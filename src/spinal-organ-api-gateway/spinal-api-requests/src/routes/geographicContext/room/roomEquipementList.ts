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

import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { Equipement } from '../interfacesGeoContext'
import { SpinalNode } from 'spinal-model-graph';
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/room/{id}/equipement_list:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return list of equipement
 *     summary: Gets a list of equipement
 *     tags:
 *      - Geographic Context
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
 *             $ref: '#/definitions/Equipement'
 *       400:
 *         description: Bad request
  */

  app.get("/api/v1/room/:id/equipement_list", async (req, res, next) => {

    let nodes = [];
    try {
      var room: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(room)

      if (room.getType().get() === "geographicRoom") {
        var childrens = await room.getChildren("hasBimObject");

        for (const child of childrens) {
          let info: Equipement = {
            dynamicId: child._server_id,
            staticId: child.getId().get(),
            name: child.getName().get(),
            type: child.getType().get(),
            bimFileId: child.info.bimFileId.get(),
            version: child.info.version.get(),
            externalId: child.info.externalId.get(),
            dbid: child.info.dbid.get(),
          };
          nodes.push(info);
        }
      } else {
        res.status(400).send("node is not of type geographic room");
      }


    } catch (error) {
      console.error(error);
      res.status(400).send("list of equipement is not loaded");
    }

    res.send(nodes);

  });
};
