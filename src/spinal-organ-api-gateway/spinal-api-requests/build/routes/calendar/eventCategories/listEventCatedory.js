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
    app.get("/api/v1/eventContext/:id/category_list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let nodes = [];
        try {
            var context = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(context);
            var listCategoryEvents = yield spinal_env_viewer_task_service_1.SpinalEventService.getEventsCategories(context.getId().get());
            for (const child of listCategoryEvents) {
                // @ts-ignore
                const _child = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(child.id.get());
                if (_child.getType().get() === "groupingCategory") {
                    let info = {
                        dynamicId: _child._server_id,
                        staticId: _child.getId().get(),
                        name: _child.getName().get(),
                        type: _child.getType().get()
                    };
                    nodes.push(info);
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("list of category event is not loaded");
        }
        res.send(nodes);
    }));
};
//# sourceMappingURL=listEventCatedory.js.map