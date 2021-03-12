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
import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import { FileSystem } from 'spinal-core-connectorjs_type';
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { Step } from '../interfacesWorkflowAndTickets'
import { serviceTicketPersonalized } from 'spinal-service-ticket'
import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";
import { ServiceUser } from "spinal-service-user";

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

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
  app.post("/api/v1/ticket/create_ticket", async (req, res, next) => {
    try {
      var workflow = await spinalAPIMiddleware.load(parseInt(req.body.workflowDynamicId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(workflow)
      var node = await spinalAPIMiddleware.load(parseInt(req.body.nodeDynamicId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(node)
      var process = await spinalAPIMiddleware.load(parseInt(req.body.processDynamicId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(process)

      var ticketInfo = {
        name: req.body.name,
        priority: req.body.priority
      }
      var ticketCreated = await serviceTicketPersonalized.addTicket(ticketInfo, process.getId().get(), workflow.getId().get(), node.getId().get())
      var ticketList = await serviceTicketPersonalized.getTicketsFromNode(node.getId().get());
      for (let index = 0; index < ticketList.length; index++) {
        if (ticketList[index].id === ticketCreated) {
          var realNodeTicket = SpinalGraphService.getRealNode(ticketList[index].id)
          var info = {
            dynamicId: realNodeTicket._server_id,
            staticId: ticketList[index].id,
            name: ticketList[index].name,
            type: ticketList[index].type,
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(info);
  })

}
