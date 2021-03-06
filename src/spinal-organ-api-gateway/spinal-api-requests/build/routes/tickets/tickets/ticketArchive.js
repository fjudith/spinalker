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
const spinal_service_ticket_1 = require("spinal-service-ticket");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
    * @swagger
    * /api/v1/ticket/{ticketId}/archive:
    *   security:
    *     - OAuth2: [read]
    *   post:
    *     description: archive a Ticket
    *     summary: archive a Ticket
    *     tags:
    *       - Workflow & ticket
    *     parameters:
    *       - in: path
    *         name: ticketId
    *         description: Use The Dynamic Id
    *       - in: body
    *         name: Ticket
    *         description: The Ticket to archive.
    *         schema:
    *           type: object
    *           required:
    *             - workflowDynamicId
    *             - processDynamicId
    *           properties:
    *             workflowDynamicId:
    *               type: number
    *             processDynamicId:
    *               type: number
    *     responses:
    *       200:
    *         description: Archive Successfully
    *       400:
    *         description: Archive not Successfully
    */
    app.post("/api/v1/ticket/:ticketId/archive", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var workflow = yield spinalAPIMiddleware.load(parseInt(req.body.workflowDynamicId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(workflow);
            var process = yield spinalAPIMiddleware.load(parseInt(req.body.processDynamicId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(process);
            var ticket = yield spinalAPIMiddleware.load(parseInt(req.params.ticketId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(ticket);
            yield spinal_service_ticket_1.serviceTicketPersonalized.ArchiveTickets(workflow.getId().get(), process.getId().get(), ticket.getId().get());
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=ticketArchive.js.map