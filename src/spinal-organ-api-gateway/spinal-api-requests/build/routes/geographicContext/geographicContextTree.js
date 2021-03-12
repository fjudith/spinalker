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
   * /api/v1/geographicContext/tree:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return the geographic context
   *     summary: Get the geographic context
   *     tags:
   *       - Geographic Context
   *     responses:
   *       200:
   *         description: Success
   *         schema:
   *           $ref: "#/definitions/ContextTree"
   *       400:
   *         description: Bad request
   */
    app.get("/api/v1/geographicContext/tree", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var tree;
        try {
            let geographicContexts = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getContextWithType("geographicContext");
            let geographicContext = geographicContexts[0];
            if (geographicContext instanceof spinal_env_viewer_graph_service_1.SpinalContext) {
                tree = {
                    dynamicId: geographicContext._server_id,
                    staticId: geographicContext.getId().get(),
                    name: geographicContext.getName().get(),
                    type: geographicContext.getType().get(),
                    context: (geographicContext instanceof spinal_env_viewer_graph_service_1.SpinalContext ? "SpinalContext" : ""),
                    children: yield recTree_1.recTree(geographicContext, geographicContext)
                };
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("ko");
        }
        res.json({
            body: tree
        });
    }));
};
//# sourceMappingURL=geographicContextTree.js.map