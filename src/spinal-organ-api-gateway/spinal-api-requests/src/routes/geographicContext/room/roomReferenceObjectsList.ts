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
import { Floor } from '../interfacesGeoContext'
import { SpinalNode } from 'spinal-model-graph';
import { NODE_TO_CATEGORY_RELATION } from 'spinal-env-viewer-plugin-documentation-service/dist/Models/constants';
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/room/{id}/reference_Objects_list:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return reference objects of a room
 *     summary: Gets a reference objects of a room
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

  app.get("/api/v1/room/:id/reference_Objects_list", async (req, res, next) => {

    try {
      var room: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(room)

      let referenceObjets = await room.getChildren("hasReferenceObject.ROOM");
      var _objects = []
      for (let index = 0; index < referenceObjets.length; index++) {
        var info = {
          dynamicId: referenceObjets[index]._server_id,
          staticId: referenceObjets[index].getId().get(),
          name: referenceObjets[index].getName().get(),
          type: referenceObjets[index].getType().get(),
          bimFileId: referenceObjets[index].info.bimFileId.get(),
          version: referenceObjets[index].info.version.get(),
          externalId: referenceObjets[index].info.externalId.get(),
          dbid: referenceObjets[index].info.dbid.get(),
        }
        _objects.push(info)
      }

    } catch (error) {
      console.error(error);
      res.status(400).send("list of reference_Objects is not loaded");
    }

    res.send(_objects);

  });
};
