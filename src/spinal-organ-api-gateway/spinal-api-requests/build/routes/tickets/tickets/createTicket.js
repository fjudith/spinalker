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
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinal_service_ticket_1 = require("spinal-service-ticket");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
    * @swagger
    * /api/v1/ticket/create_ticket:
    *   security:
    *     - OAuth2: [read]
    *   post:
    *     description: add a Ticket
    *     summary: add a Ticket
    *     tags:
    *       - Workflow & ticket
    *     parameters:
    *       - in: body
    *         name: Ticket
    *         description: The Ticket to add.
    *         schema:
    *           type: object
    *           required:
    *             - workflowDynamicId
    *             - processDynamicId
    *             - nodeDynamicId
    *             - name
    *             - priority
    *           properties:
    *             workflowDynamicId:
    *               type: number
    *             processDynamicId:
    *               type: number
    *             nodeDynamicId:
    *               type: number
    *             name:
    *               type: string
    *             priority:
    *               type: number
    *     responses:
    *       200:
    *         description: Success
    *         schema:
    *           $ref: '#/definitions/Ticket'
    *       400:
    *         description: Add not Successfully
    */
    app.post("/api/v1/ticket/create_ticket", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var workflow = yield spinalAPIMiddleware.load(parseInt(req.body.workflowDynamicId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(workflow);
            var node = yield spinalAPIMiddleware.load(parseInt(req.body.nodeDynamicId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            var process = yield spinalAPIMiddleware.load(parseInt(req.body.processDynamicId, 10));
            //@ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(process);
            var ticketInfo = {
                name: req.body.name,
                priority: req.body.priority
            };
            var ticketCreated = yield spinal_service_ticket_1.serviceTicketPersonalized.addTicket(ticketInfo, process.getId().get(), workflow.getId().get(), node.getId().get());
            var ticketList = yield spinal_service_ticket_1.serviceTicketPersonalized.getTicketsFromNode(node.getId().get());
            for (let index = 0; index < ticketList.length; index++) {
                if (ticketList[index].id === ticketCreated) {
                    var realNodeTicket = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(ticketList[index].id);
                    var info = {
                        dynamicId: realNodeTicket._server_id,
                        staticId: ticketList[index].id,
                        name: ticketList[index].name,
                        type: ticketList[index].type,
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json(info);
    }));
};
//# sourceMappingURL=createTicket.js.map