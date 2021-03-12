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
import { ContextTree } from './interfacesContexts'
import { recTreeDepth } from '../../utilities/recTree'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
 * @swagger
 * /api/v1/context/{id}/tree/{numberOfLevel}/depth:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Return tree of context
 *     summary: Get a tree context by ID
 *     tags:
 *       - Contexts/ontologies
 *     parameters:
 *      - in: path
 *        name: id
 *        description: use the dynamic ID
 *      - in: path
 *        name: numberOfLevel
 *        description: the number of levels to go
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: "#/definitions/ContextTree"
 *       400:
 *         description: Bad request
 */

  app.get("/api/v1/context/:id/tree/:numberOfLevel/depth", async (req, res, next) => {
    var contexts: ContextTree;
    try {
      var context = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      if (context instanceof SpinalContext) {
        contexts = {
          dynamicId: context._server_id,
          staticId: context.getId().get(),
          name: context.getName().get(),
          type: context.getType().get(),
          context: (context instanceof SpinalContext ? "SpinalContext" : ""),
          children: await recTreeDepth(context, context, parseInt(req.params.numberOfLevel, 10))
        };
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("ko");
    }
    res.json(contexts);
  });
};

/**
 * @swagger
 * definitions:
 *   ContextTree:
 *     type: "object"
 *     properties:
 *       dynamicId:
 *         type: "integer"
 *       staticId:
 *         type: "string"
 *       name:
 *         type: "string"
 *       type:
 *         type: "string"
 *       context:
 *         type: "string"
 *       children:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/ContextTree"
 *     exemple:
 *       dynamicId: 377295296
 *       staticId: SpinalContext-b61aca38-c262-56bd-9b3b-72fba07999a4-173a52a9bd8
 *       name: Scenes
 *       type: SpinalService
 *       context: SpinalContext
 *       children:
 *       - dynamicId: 377301280
 *         staticId: SpinalNode-c04c8302-ef21-7fa1-3435-8bf1ecd717b8-173a52a9bde
 *         name: sqdsq
 *         type: scene
 *         children: []
 */
