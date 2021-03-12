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
   * /api/v1/room/{id}/reference_Objects_list:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return reference objects of a room
   *     summary: Gets a reference objects of a room
   *     tags:
   *      - Geographic Context
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
   *             $ref: '#/definitions/Equipement'
   *       400:
   *         description: Bad request
    */
    app.get("/api/v1/room/:id/reference_Objects_list", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var room = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(room);
            let referenceObjets = yield room.getChildren("hasReferenceObject.ROOM");
            var _objects = [];
            for (let index = 0; index < referenceObjets.length; index++) {
                var info = {
                    dynamicId: referenceObjets[index]._server_id,
                    staticId: referenceObjets[index].getId().get(),
                    name: referenceObjets[index].getName().get(),
                    type: referenceObjets[index].getType().get(),
                    bimFileId: referenceObjets[index].info.bimFileId.get(),
                    version: referenceObjets[index].info.version.get(),
                    externalId: referenceObjets[index].info.externalId.get(),
                    dbid: referenceObjets[index].info.dbid.get(),
                };
                _objects.push(info);
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("list of reference_Objects is not loaded");
        }
        res.send(_objects);
    }));
};
//# sourceMappingURL=roomReferenceObjectsList.js.map