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
const spinal_env_viewer_plugin_documentation_service_1 = require("spinal-env-viewer-plugin-documentation-service");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/room/{id}/notes:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: Returns notes of room
  *     summary: Get list notes of room
  *     tags:
  *       - Geographic Context
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
  *             $ref: '#/definitions/Note'
  *       400:
  *         description: Bad request
  */
    app.get("/api/v1/room/:id/notes", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var room = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(room);
            if (room.getType().get() === "geographicRoom") {
                var _notes = [];
                var notes = yield spinal_env_viewer_plugin_documentation_service_1.serviceDocumentation.getNotes(room);
                for (const note of notes) {
                    let infoNote = {
                        date: note.element.date.get(),
                        type: note.element.type.get(),
                        message: note.element.message.get()
                    };
                    _notes.push(infoNote);
                }
            }
            else {
                res.status(400).send("node is not of type geographic room");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json(_notes);
    }));
};
//# sourceMappingURL=roomNotes.js.map