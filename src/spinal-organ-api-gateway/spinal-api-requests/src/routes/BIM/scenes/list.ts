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

const sceneUtils = require("./sceneUtils");
import * as express from "express";
import { IScenesItem, IOptionsItem } from './interfaces'

module.exports = function (logger, app: express.Express,) {

  /**
 * @swagger
 * /api/v1/BIM/scene/list:
 *   security:
 *     - OAuth2: [read]
 *   get:
 *     description: Retrun the list of scenes
 *     summary: Get scenes of the list
 *     tags:
 *       - BIM
 *     responses:
 *       200:
 *         description: Array of scenes
 *         schema:
 *           $ref: '#/definitions/SceneListReturn'
 *       500:
 *         description: internal error
  */


  app.get("/api/v1/BIM/scene/list", async (req, res) => {
    try {
      const scenes = await sceneUtils.getScenes();
      const body = {
        scenes: scenes.map((scene) => {
          const sc: IScenesItem = {
            dynamicId: scene._server_id,
            staticId: scene.getId().get(),
            name: scene.info.name.get(),
            description: scene.info.description.get(),
            type: scene.info.type.get(),
            autoLoad: scene.info.autoLoad.get()
          };
          if (scene.info.useAllDT) sc.useAllDT = scene.info.useAllDT.get();
          if (typeof scene.info.options !== "undefined") {
            sc.options = [];
            for (let idx = 0; idx < scene.info.options.length; idx++) {
              const option = scene.info.options[idx];
              const opt: IOptionsItem = {
                urn: option.urn.get().replace(/http:\/\/.*viewerForgeFiles\//, "")
              };
              if (option.loadOption) opt.loadOption = option.loadOption.get();
              if (option.dbIds) opt.dbIds = option.dbIds.get();
              sc.options.push(opt);
            }
          }
          return sc;
        })
      };
      res.json({
        status: 'ok',
        body: body
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: "ko",
        body: {}
      });
    }
  });
};

/**
 * @swagger
 * definitions:
 *   SceneListReturn:
 *     type: "object"
 *     properties:
 *       status:
 *         type: "string"
 *       body:
 *         type: "object"
 *         properties:
 *           dynamicId:
 *             type: "integer"
 *           staticId:
 *             type: "string"
 *           name:
 *             type: "string"
 *           description:
 *             type: "string"
 *           type:
 *             type: "string"
 *           autoLoad:
 *             type: "boolean"
 *           scenesItems:
 *             type: "array"
 *             items:
 *               type: "object"
 *               properties:
 *                 name:
 *                   type: "string"
 *                 dynamicId:
 *                   type: "integer"
 *                 staticId:
 *                   type: "string"
 *                 item:
 *                   type: "string"
 *           useAllDT:
 *             type: "boolean"
 *           options:
 *             type: "array"
 *             items:
 *               type: "object"
 *               properties:
 *                 urn:
 *                   type: "string"
 *                 loadOption:
 *                   type: "object"
 *                   properties:
 *                     globalOffset:
 *                       type: "object"
 *                       properties:
 *                         x:
 *                           type: "number"
 *                         y:
 *                           type: "number"
 *                         z:
 *                           type: "number"
 *
 */

