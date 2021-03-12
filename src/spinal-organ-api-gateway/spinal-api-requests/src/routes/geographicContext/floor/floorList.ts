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
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/floor/list:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return list of floor
 *     summary: Gets a list of floor
 *     tags:
 *      - Geographic Context
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Floor'
 *       400:
 *         description: Bad request
  */

  app.get("/api/v1/floor/list", async (req, res, next) => {

    let nodes = [];
    try {
      let geographicContexts = await SpinalGraphService.getContextWithType("geographicContext");
      var buildings = await geographicContexts[0].getChildren("hasGeographicBuilding");
      var floors = await buildings[0].getChildren("hasGeographicFloor")

      for (const child of floors) {
        let info: Floor = {
          dynamicId: child._server_id,
          staticId: child.getId().get(),
          name: child.getName().get(),
          type: child.getType().get()
        };
        nodes.push(info);
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("list of floor is not loaded");
    }

    res.send(nodes);

  });
};
