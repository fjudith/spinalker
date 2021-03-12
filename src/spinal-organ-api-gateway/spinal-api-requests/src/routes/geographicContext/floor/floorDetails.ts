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
import { Floor } from '../interfacesGeoContext'
import { SpinalNode } from 'spinal-model-graph';
import { NODE_TO_CATEGORY_RELATION } from 'spinal-env-viewer-plugin-documentation-service/dist/Models/constants';
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/floor/{id}/floor_details:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return details of a floor
 *     summary: Gets a details of a floor
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
 *             $ref: '#/definitions/FloorDetails'
 *       400:
 *         description: Bad request
  */

  app.get("/api/v1/floor/:id/floor_details", async (req, res, next) => {

    let sommes = 0
    let dbIds = [];
    try {
      var floor: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      var rooms = await floor.getChildren("hasGeographicRoom")
      for (const room of rooms) {
        var bimObjects = await room.getChildren("hasBimObject");
        for (const bimObject of bimObjects) {
          dbIds.push(bimObject.info.dbid.get())
        }

        let categories = await room.getChildren(NODE_TO_CATEGORY_RELATION);
        for (const child of categories) {
          if (child.getName().get() === "Spatial") {
            let attributs = await child.element.load();
            for (const attribut of attributs.get()) {
              if (attribut.label === "area") {
                sommes = sommes + attribut.value
              }
            }
          }
        }
      }
      var info = {
        area: sommes,
        bimObject_DbIds: dbIds
      }

    } catch (error) {
      console.error(error);
      res.status(400).send("list of floor is not loaded");
    }

    res.send(info);

  });
};
