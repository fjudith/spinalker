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
const spinal_service_ticket_1 = require("spinal-service-ticket");
const getFiles_1 = require("../../../utilities/getFiles");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/ticket/{ticketId}/read_details:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: Return ticket
  *     summary: Get ticket
  *     tags:
  *       - Workflow & ticket
  *     parameters:
  *      - in: path
  *        name: ticketId
  *        description: use the Dynamic ID
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           $ref: '#/definitions/TicketDetails'
  *       400:
  *         description: Bad request
  */
    app.get("/api/v1/ticket/:ticketId/read_details", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var _ticket = yield spinalAPIMiddleware.load(parseInt(req.params.ticketId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(_ticket);
            //Context
            console.log();
            var contextRealNode = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode((_ticket.getContextIds())[0]);
            // Notes
            var notes = yield spinal_env_viewer_plugin_documentation_service_1.serviceDocumentation.getNotes(_ticket);
            var _notes = [];
            for (const note of notes) {
                let infoNote = {
                    userName: note.element.username.get(),
                    date: note.element.date.get(),
                    type: note.element.type.get(),
                    message: note.element.message.get()
                };
                _notes.push(infoNote);
            }
            // Files
            var files = yield getFiles_1.default(_ticket);
            var _files = [];
            for (const file of files) {
                let infoFiles = {
                    Name: file.fileName,
                    fileId: file.targetServerId
                };
                _files.push(infoFiles);
            }
            // Logs
            var logs = yield spinal_service_ticket_1.serviceTicketPersonalized.getLogs(_ticket.getId().get());
            var _logs = [];
            for (const log of logs) {
                let infoLogs = {
                    userName: log.user.name,
                    date: log.creationDate,
                    event: log.event,
                    ticketStaticId: log.ticketId
                };
                _logs.push(infoLogs);
            }
            var elementSelected;
            try {
                elementSelected = yield spinalAPIMiddleware.loadPtr(_ticket.info.elementSelected);
            }
            catch (error) {
            }
            var info = {
                dynamicId: _ticket._server_id,
                staticId: _ticket.getId().get(),
                name: _ticket.getName().get(),
                type: _ticket.getType().get(),
                priority: _ticket.info.priority.get(),
                creationDate: _ticket.info.creationDate.get(),
                elementSelectedId: elementSelected == undefined ? 0 : elementSelected._server_id,
                userName: _ticket.info.user == undefined ? "" : _ticket.info.user.name.get(),
                stepId: _ticket.info.stepId.get(),
                workflowId: contextRealNode._server_id,
                workflowName: contextRealNode.getName().get(),
                annotation_list: _notes,
                file_list: _files,
                log_list: _logs
            };
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json(info);
    }));
};
//# sourceMappingURL=readTicket.js.map