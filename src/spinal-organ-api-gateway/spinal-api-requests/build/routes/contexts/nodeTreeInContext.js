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
const recTree_1 = require("../../utilities/recTree");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
   * @swagger
   * /api/v1/context/{idContext}/node/{idNode}/tree:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return tree of node in context
   *     summary: Get a tree of node context with given IDcontext and IDnode
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
   *           $ref: "#/definitions/ContextTree"
   *       400:
   *         description: Bad request
   */
    app.get("/api/v1/context/:idContext/node/:idNode/tree", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let tree;
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.params.idContext, 10));
            var node = yield spinalAPIMiddleware.load(parseInt(req.params.idNode, 10));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            if (context instanceof spinal_env_viewer_graph_service_1.SpinalContext && node instanceof spinal_env_viewer_graph_service_1.SpinalNode && node.belongsToContext(context)) {
                tree = {
                    dynamicId: node._server_id,
                    staticId: node.getId().get(),
                    name: node.getName().get(),
                    type: node.getType().get(),
                    children: yield recTree_1.recTree(node, context)
                };
                status = "ok";
            }
            else {
                res.status(400).send("node not found in context");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json({
            status: status,
            body: tree
        });
    }));
};
//# sourceMappingURL=nodeTreeInContext.js.map