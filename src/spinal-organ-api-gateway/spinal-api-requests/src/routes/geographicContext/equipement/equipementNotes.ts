/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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
import { serviceDocumentation } from "spinal-env-viewer-plugin-documentation-service";
import { Note } from '../interfacesGeoContext'
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/equipement/{id}/notes:
*   security:
*     - OAuth2: [read]
*   get:
*     description: Returns notes of equipement
*     summary: Get list notes of equipement
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
  app.get("/api/v1/equipement/:id/notes", async (req, res, next) => {
    try {
      var equipement = await spinalAPIMiddleware.load(parseInt(req.params.id, 10));
      //@ts-ignore
      SpinalGraphService._addNode(equipement)
      if (equipement.getType().get() === "BIMObject") {
        var _notes = []
        var notes = await serviceDocumentation.getNotes(equipement)
        for (const note of notes) {
          let infoNote: Note = {
            date: note.element.date.get(),
            type: note.element.type.get(),
            message: note.element.message.get()
          }
          _notes.push(infoNote)
        }
      } else {
        res.status(400).send("node is not of type  BIMObject");
      }

    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json(_notes);
  })
}
