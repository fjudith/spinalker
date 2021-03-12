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

import spinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service';
import { WorkflowTree } from '../interfacesWorkflowAndTickets'
import { recTree } from '../../../utilities/recTree'
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
  * @swagger
  * /api/v1/workflow/{id}/tree:
  *   security:
  *     - OAuth2: [read]
  *   get:
  *     description: Return tree of workflow
  *     summary: Get a tree workflow by ID
  *     tags:
  *       - Workflow & ticket
  *     parameters:
  *      - in: path
  *        name: id
  *        description: use the dynamic ID
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           $ref: "#/definitions/WorkflowTree"
  *       400:
  *         description: Bad request
  */

  app.get("/api/v1/workflow/:id/tree", async (req, res, next) => {
    var workflows: WorkflowTree;

    try {
      var workflow = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      if (workflow instanceof SpinalContext) {
        workflows = {
          dynamicId: workflow._server_id,
          staticId: workflow.getId().get(),
          name: workflow.getName().get(),
          type: workflow.getType().get(),
          children: await recTree(workflow, workflow)
        };
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("ko");
    }
    res.json(workflows);
  });

}
