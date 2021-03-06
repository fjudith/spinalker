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

import SpinalAPIMiddleware from '../../../spinalAPIMiddleware';
import * as express from 'express';
import groupManagerService from "spinal-env-viewer-plugin-group-manager-service"
import { SpinalContext, SpinalNode, SpinalGraphService } from 'spinal-env-viewer-graph-service'
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: SpinalAPIMiddleware) {
  /**
* @swagger
* /api/v1/groupContext/{contextId}/category/{categoryId}/group/{groupId}/update:
*   security:
*     - OAuth2: [read]
*   put:
*     description: update group
*     summary: update group
*     tags:
*       - Group Context
*     parameters:
*      - in: path
*        name: contextId
*        description: Use The Dynamic Id.
*      - in: path
*        name: categoryId
*        description: Use The Dynamic Id.
*      - in: path
*        name: groupId
*        description: Use The Dynamic Id.
*      - in: body
*        name: configGroup
*        description: configuration of group.
*        schema:
*          type: object
*          required:
*            - configGroup
*          properties:
*             newNameGroup:
*              type: string
*             newNameColor:
*              type: string
*     responses:
*       200:
*         description: Update Successfully
*       400:
*         description: Bad request
*/



  app.put("/api/v1/groupContext/:contextId/category/:categoryId/group/:groupId/update", async (req, res, next) => {

    try {
      var context: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.contextId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(context)
      var category: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.categoryId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(category)
      var group: SpinalNode<any> = await spinalAPIMiddleware.load(parseInt(req.params.groupId, 10));
      //@ts-ignore
      SpinalGraphService._addNode(group)

      if (context instanceof SpinalContext && category.belongsToContext(context) && group.belongsToContext(context)) {
        var dataObject = {
          name: req.body.newNameGroup,
          color: req.body.newNameColor
        }
        groupManagerService.updateGroup(group.getId().get(), dataObject)
      } else {
        res.status(400).send("category or group not found in context");
      }
    } catch (error) {
      console.error(error)
      res.status(400).send("ko")
    }
    res.json();
  })

}
