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
  * /api/v1/ticket/{ticketId}/add_note:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: add a note
  *     summary: add a note
  *     tags:
  *       - Workflow & ticket
  *     parameters:
  *       - in: path
  *         name: ticketId
  *         description: Use The Dynamic Id
  *       - in: body
  *         name: Ticket Note
  *         description: The Ticket Note to add.
  *         schema:
  *           type: object
  *           required:
  *             - note
  *           properties:
  *             note:
  *               type: string
  *     responses:
  *       200:
  *         description: Add Successfully
  *       400:
  *         description: Add not Successfully
  */
  app.post("/api/v1/ticket/:ticketId/add_note", async (req, res, next) => {
    try {
      var ticket = await spinalAPIMiddleware.load(parseInt(req.params.ticketId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(ticket)
      var user = { username: "string", userId: 0 }
      await serviceDocumentation.addNote(ticket, user, req.body.note)

    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json();
  })

}
