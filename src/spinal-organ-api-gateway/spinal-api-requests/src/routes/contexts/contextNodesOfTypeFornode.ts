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
import { ContextNodeofTypes } from './interfacesContexts'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/context/{contextId}/node/{nodeId}/nodesOfType/{type}:
*   security:
*     - OAuth2: [read]
*   get:
*     description: return the nodes of type from a node in a context
*     summary: Get nodes of type from a node in a context with given IDcontext IDnode and type
*     tags:
  *       - Contexts/ontologies
*     parameters:
*      - in: path
*        name: contextId
*        description: use the dynamic ID
*      - in: path
*        name: nodeId
*        description: use the dynamic ID
*      - in: path
*        name: type
*     responses:
*       200:
*         description: Success
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/ContextNodeofTypes'
*       400:
*         description: Bad request
*/
  app.get("/api/v1/context/:contextId/node/:nodeId/nodesOfType/:type", async (req, res, next) => {

    let nodes = [];

    try {
      var contextNode = await spinalAPIMiddleware.load(parseInt(req.params.contextId, 10));
      var node = await spinalAPIMiddleware.load(parseInt(req.params.nodeId, 10));

      var SpinalContextNodeId = contextNode.getId().get();
      // @ts-ignore
      SpinalGraphService._addNode(contextNode);
      var SpinalNodeId = node.getId().get();
      // @ts-ignore
      SpinalGraphService._addNode(node);
      var type_list = await SpinalGraphService.browseAndClassifyByTypeInContext(SpinalNodeId, SpinalContextNodeId);

      if (req.params.type in type_list.data) {
        let model_list = type_list.data[req.params.type];
        if (contextNode instanceof SpinalContext && node.belongsToContext(contextNode)) {
          for (let index = 0; index < model_list.length; index++) {
            // hacky way use realnode when fiexd
            const realNode = model_list[index]._parents[0];
            // dynamicId: SpinalGraphService.getRealNode(model_list[index].id.get())._server_id,
            let info: ContextNodeofTypes = {
              dynamicId: realNode._server_id,
              staticId: model_list[index].id.get(),
              name: model_list[index].name.get(),
              type: model_list[index].type.get()

            };
            nodes.push(info);
          }
        } else {
          res.status(400).send("node not found in context");
        }
      } else {
        res.status(400).send("Type not found in node");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(nodes);
  });

};
