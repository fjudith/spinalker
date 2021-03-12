"use strict";
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
    app.get("/api/v1/context/:id/tree/:numberOfLevel/depth", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var contexts;
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            if (context instanceof spinal_env_viewer_graph_service_1.SpinalContext) {
                contexts = {
                    dynamicId: context._server_id,
                    staticId: context.getId().get(),
                    name: context.getName().get(),
                    type: context.getType().get(),
                    context: (context instanceof spinal_env_viewer_graph_service_1.SpinalContext ? "SpinalContext" : ""),
                    children: yield recTree_1.recTreeDepth(context, context, parseInt(req.params.numberOfLevel, 10))
                };
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("ko");
        }
        res.json(contexts);
    }));
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
//# sourceMappingURL=contextTreeDepth.js.map