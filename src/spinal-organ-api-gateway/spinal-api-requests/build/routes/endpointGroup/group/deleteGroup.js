"use strict";
/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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
  * /api/v1/endPointsGroup/{contextId}/category/{categoryId}/group/{groupId}/delete:
  *   security:
  *     - OAuth2: [read]
  *   delete:
  *     description: delete group endPoints Group
  *     summary: delete group endPoints Group
  *     tags:
  *       - EndPoints Group
  *     parameters:
  *      - in: path
  *        name: contextId
  *        description: Use The Dynamic ID
  *      - in: path
  *        name: categoryId
  *        description: Use The Dynamic ID
  *      - in: path
  *        name: groupId
  *        description: Use The Dynamic ID
  *     responses:
  *       200:
  *         description: Delete Successfully
  *       400:
  *         description: Bad request
  */
    app.delete("/api/v1/endPointsGroup/:contextId/category/:categoryId/group/:groupId/delete", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.params.contextId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
            var category = yield spinalAPIMiddleware.load(parseInt(req.params.categoryId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(category);
            var group = yield spinalAPIMiddleware.load(parseInt(req.params.groupId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(group);
            if (context instanceof spinal_env_viewer_graph_service_1.SpinalContext && category.belongsToContext(context) && group.belongsToContext(context)) {
                if (context.getType().get() === "BmsEndpointGroupContext") {
                    yield spinal_env_viewer_graph_service_1.SpinalGraphService.removeFromGraph(group.getId().get());
                }
                else {
                    res.status(400).send("node is not type of BmsEndpointGroupContext ");
                }
            }
            else {
                res.status(400).send("group not found in context");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=deleteGroup.js.map