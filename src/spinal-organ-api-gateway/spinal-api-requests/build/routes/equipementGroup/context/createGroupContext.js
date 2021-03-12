"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_env_viewer_plugin_group_manager_service_1 = require("spinal-env-viewer-plugin-group-manager-service");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/equipementsGroup/create:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: create equipements Group context
  *     summary: create equipements Group context
  *     tags:
  *       - Equipements Group
  *     parameters:
  *      - in: body
  *        name: configGroupContext
  *        description: configuration of Group Context.
  *        schema:
  *          type: object
  *          required:
  *            - configGroupContext
  *          properties:
  *             contextName:
  *              type: string
  *     responses:
  *       200:
  *         description: Create Successfully
  *       400:
  *         description: Bad request
  */
    app.post("/api/v1/equipementsGroup/create", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            spinal_env_viewer_plugin_group_manager_service_1.default.createGroupContext(req.body.contextName, "BIMObject");
        }
        catch (error) {
            console.error(error);
            res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=createGroupContext.js.map