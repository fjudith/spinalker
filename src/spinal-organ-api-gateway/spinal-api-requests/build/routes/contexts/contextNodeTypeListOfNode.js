"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
   * @swagger
   * /api/v1/context/{idContext}/node/{idNode}/nodeTypeList:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return node type list of context
   *     summary: Get type list from node in context with given IDcontext ans IDnode
   *     tags:
   *       - Contexts/ontologies
   *     parameters:
   *      - in: path
   *        name: idContext
   *        description: use the dynamic ID
   *      - in: path
   *        name: idNode
   *        description: use the dynamic ID
   *     responses:
   *       200:
   *         description: Success
   *         schema:
   *           $ref: "#/definitions/ContextNodeTypeList"
   *       400:
   *         description: Bad request
   */
    app.get("/api/v1/context/:contextId/node/:nodeId/nodeTypeList", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var type_list;
        try {
            var contextNode = yield spinalAPIMiddleware.load(parseInt(req.params.contextId, 10));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(contextNode);
            var SpinalContextNodeId = contextNode.getId().get();
            var node = yield spinalAPIMiddleware.load(parseInt(req.params.nodeId, 10));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            var SpinalNodeId = node.getId().get();
            if (contextNode instanceof spinal_env_viewer_graph_service_1.SpinalContext && node.belongsToContext(contextNode)) {
                type_list = yield spinal_env_viewer_graph_service_1.SpinalGraphService.browseAndClassifyByTypeInContext(SpinalNodeId, SpinalContextNodeId);
            }
            else {
                res.status(400).send("node not found in context");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json(type_list.types);
    }));
};
//# sourceMappingURL=contextNodeTypeListOfNode.js.map