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
import { SpinalEventService } from "spinal-env-viewer-task-service";
import { CategoryEvent } from '../interfacesContextsEvents'


module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/eventContext/{id}/category_list:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return list of event category
 *     summary: Gets a list of event category
 *     tags:
 *      - Calendar & Event
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
 *             $ref: '#/definitions/CategoryEvent'
 *       400:
 *         description: Bad request
  */

  app.get("/api/v1/eventContext/:id/category_list", async (req, res, next) => {

    let nodes = [];
    try {
      var context: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(context)

      var listCategoryEvents = await SpinalEventService.getEventsCategories(context.getId().get())

      for (const child of listCategoryEvents) {
        // @ts-ignore
        const _child = SpinalGraphService.getRealNode(child.id.get())
        if (_child.getType().get() === "groupingCategory") {
          let info: CategoryEvent = {
            dynamicId: _child._server_id,
            staticId: _child.getId().get(),
            name: _child.getName().get(),
            type: _child.getType().get()
          };
          nodes.push(info);
        }
      }

    } catch (error) {
      console.error(error);
      res.status(400).send("list of category event is not loaded");
    }
    res.send(nodes);
  });
};
