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

import spinalAPIMiddleware from '../../spinalAPIMiddleware';
import * as express from 'express';
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/context/{id}/nodeTypeList:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return node type list of context
 *     summary: Get type list in context with given ID context
 *     tags:
 *       - Contexts/ontologies
 *     parameters:
 *      - in: path
 *        name: id
 *        description: use the dynamic ID
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: "#/definitions/ContextNodeTypeList"
 *       400:
 *         description: Bad request
 */

  app.get("/api/v1/context/:id/nodeTypeList", async (req, res, next) => {

    try {
      var context = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      var SpinalContextId = context.getId().get();
      var type_list = await SpinalGraphService.browseAndClassifyByTypeInContext(SpinalContextId, SpinalContextId);
    } catch (error) {
      console.log(error);
      res.status(400).send("context not found");
    }
    res.json(type_list.types);
  });

};

