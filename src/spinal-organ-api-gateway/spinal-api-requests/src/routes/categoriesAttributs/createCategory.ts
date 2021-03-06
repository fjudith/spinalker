
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

import { serviceDocumentation } from 'spinal-env-viewer-plugin-documentation-service'
import spinalAPIMiddleware from '../../spinalAPIMiddleware';
import * as express from 'express';
module.exports = function (logger, app: express.Express, spinalAPIMiddleware: spinalAPIMiddleware) {

  /**
  * @swagger
  * /api/v1/node/{id}/category/create:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: create category attribute in specific node
  *     summary: create category attribut
  *     tags:
  *       - Node Attribut Categories
  *     parameters:
  *       - in: path
  *         name: id
  *         description: use the dynamic ID
  *       - in: body
  *         name: Category
  *         description: The Category to create.
  *         schema:
  *           type: object
  *           required:
  *             - categoryName
  *           properties:
  *             categoryName:
  *               type: string
  *     responses:
  *       200:
  *         description: Created successfully
  *       400:
  *         description:  Bad request
    */

  app.post("/api/v1/node/:id/category/create", async (req, res, next) => {

    try {
      var node = await spinalAPIMiddleware.load(parseInt(req.params.id, 10))
      var categoryName = req.body.categoryName
      serviceDocumentation.addCategoryAttribute(node, categoryName);
    } catch (error) {
      console.log(error);
      res.status(400).send("ko");
    }
    res.json();
  })
}
