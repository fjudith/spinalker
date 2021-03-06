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
import spinalAPIMiddleware from '../../spinalAPIMiddleware';
import * as express from 'express';
import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
  * @swagger
  * /api/v1/node/{id}/add_note:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: add a note
  *     summary: add a note
  *     tags:
  *       - Nodes
  *     parameters:
  *       - in: path
  *         name: id
  *         description: Use The Dynamic ID
  *       - in: body
  *         name: Note
  *         description: The Note to add.
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
  app.post("/api/v1/node/:id/add_note", async (req, res, next) => {
    try {
      var node = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(node)

      var user = { username: "string", userId: 0 }
      await serviceDocumentation.addNote(node, user, req.body.note)

    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json();
  })
}
