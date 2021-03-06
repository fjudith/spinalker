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
import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { Step } from '../interfacesWorkflowAndTickets'
import { serviceTicketPersonalized } from 'spinal-service-ticket'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
  * @swagger
  * /api/v1/workflow/{workflowId}/process/{processId}/stepList:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: Returns list of steps
  *     summary: Get list of steps
  *     tags:
  *       - Workflow & ticket
  *     parameters:
  *      - in: path
  *        name: workflowId 
  *        description: use the dynamic ID
  *      - in: path
  *        name: processId
  *        description: use the dynamic ID
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/Step'
  *       400:
  *         description: Bad request
  */

  app.get("/api/v1/workflow/:workflowId/process/:processId/stepList", async (req, res, next) => {
    let nodes = []
    try {

      var workflow = await spinalAPIMiddleware.load(parseInt(req.params.workflowId, 10));
      var process: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.processId, 10));
      // @ts-ignore
      SpinalGraphService._addNode(workflow);

      // @ts-ignore
      SpinalGraphService._addNode(process);


      if (workflow instanceof SpinalContext && process.belongsToContext(workflow)) {
        if (workflow.getType().get() === "SpinalSystemServiceTicket") {
          var allSteps = await SpinalGraphService.getChildren(process.getId().get(), ["SpinalSystemServiceTicketHasStep"])

          for (let index = 0; index < allSteps.length; index++) {
            const realNode = SpinalGraphService.getRealNode(allSteps[index].id.get())
            var info: Step = {
              dynamicId: realNode._server_id,
              staticId: realNode.getId().get(),
              name: realNode.getName().get(),
              type: realNode.getType().get(),
              color: realNode.info.color.get(),
              order: realNode.info.order.get(),
              processId: realNode.info.processId.get()
            }
            nodes.push(info);
          }
        }
        else {
          return res.status(400).send("this context is not a SpinalSystemServiceTicket");
        }
      } else {
        res.status(400).send("node not found in context");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(nodes);
  })
}
