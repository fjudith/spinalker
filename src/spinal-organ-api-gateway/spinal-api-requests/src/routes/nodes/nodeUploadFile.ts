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
import spinalAPIMiddleware from '../../spinalAPIMiddleware';
import * as express from 'express';
import { serviceTicketPersonalized } from 'spinal-service-ticket'
import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";
import { ServiceUser } from "spinal-service-user";

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
  * @swagger
  * /api/v1/node/{id}/upload_file:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: Upload a Doc
  *     summary: Upload a Doc
  *     consumes:
  *       - multipart/from-data
  *     tags:
  *       - Nodes
  *     parameters:
  *       - in: path
  *         name: id
  *         description: Use The Dynamic Id
  *       - in: fromData
  *         name: avatar
  *         type: File
  *         description: the file to upload
  *         required: true
  *         allowMultiple: true
  *       - in: body
  *         name: Ticket
  *         description: The Ticket to add.
  *         schema:
  *           type: object
  *           required:
  *             - workflowId
  *           properties:
  *             workflowId:
  *               type: number
  *     responses:
  *       200:
  *         description: Upload Successfully
  *       400:
  *         description: Upload not Successfully
  */
  app.post("/api/v1/node/:id/upload_file", async (req, res, next) => {
    try {
      var workflow = await spinalAPIMiddleware.load(parseInt(req.body.workflowId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(workflow)

      var ticket = await spinalAPIMiddleware.load(parseInt(req.body.ticketId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(ticket)

      // @ts-ignore
      if (!req.files) {
        res.send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        // @ts-ignore
        let avatar = req.files.avatar;

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv('./uploads/' + avatar.name);
        var user = { username: "string", userId: 0 }
        var data = {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
        await serviceDocumentation.addFileAsNote(ticket.getId().get(), data, user)

        //send response
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: avatar.name,
            mimetype: avatar.mimetype,
            size: avatar.size
          }
        });
      }

    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    // res.json();
  })

}
