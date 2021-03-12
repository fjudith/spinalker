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
const spinal_env_viewer_task_service_1 = require("spinal-env-viewer-task-service");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
   * @swagger
   * /api/v1/eventContext/{ContextId}/node/{nodeId}/event_list:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return list of event
   *     summary: Gets a list of event
   *     tags:
   *      - Calendar & Event
   *     parameters:
   *      - in: path
   *        name: ContextId
   *        description: use the dynamic ID
   *      - in: path
   *        name: nodeId
   *        description: use the dynamic ID
   *     responses:
   *       200:
   *         description: Success
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/GroupEvent'
   *       400:
   *         description: Bad request
    */
    app.get("/api/v1/eventContext/:ContextId/node/:nodeId/event_list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let nodes = [];
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.params.ContextId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
            var node = yield spinalAPIMiddleware.load(parseInt(req.params.nodeId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            if (context instanceof spinal_env_viewer_graph_service_1.SpinalContext && node.belongsToContext(context)) {
                if (context.getType().get() === "SpinalEventGroupContext") {
                    var listEvents = yield spinal_env_viewer_task_service_1.SpinalEventService.getEvents(node.getId().get());
                    for (const child of listEvents) {
                        // @ts-ignore
                        const _child = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(child.id.get());
                        if (_child.getType().get() === "SpinalEvent") {
                            let info = {
                                dynamicId: _child._server_id,
                                staticId: _child.getId().get(),
                                name: _child.getName().get(),
                                type: _child.getType().get(),
                                groupeID: _child.info.groupId.get(),
                                categoryID: child.categoryId.get(),
                                nodeId: _child.info.nodeId.get(),
                                repeat: _child.info.repeat.get(),
                                description: _child.info.description.get(),
                                startDate: _child.info.startDate.get(),
                                endDate: _child.info.endDate.get(),
                            };
                            nodes.push(info);
                        }
                    }
                }
                else {
                    return res.status(400).send("this context is not a SpinalEventGroupContext");
                }
            }
            else {
                res.status(400).send("node not found in context");
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("list of event is not loaded");
        }
        res.send(nodes);
    }));
};
//# sourceMappingURL=enventList.js.map