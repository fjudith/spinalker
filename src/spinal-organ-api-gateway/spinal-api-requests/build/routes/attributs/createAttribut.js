"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const spinal_env_viewer_plugin_documentation_service_1 = require("spinal-env-viewer-plugin-documentation-service");
const constants_1 = require("spinal-env-viewer-plugin-documentation-service/dist/Models/constants");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/node/{idNode}/category/{idCategory}/attribut/create:
  *   security:
  *     - OAuth2: [read]
  *   post:
  *     description: Create attribute
  *     summary: create an attribute
  *     tags:
  *       - Node Attributs
  *     parameters:
  *       - in: path
  *         name: idNode
  *       - in: path
  *         name: idCategory
  *       - in: body
  *         name: Attribute
  *         description: The Attribute to create.
  *         schema:
  *           type: object
  *           required:
  *             - attributeLabel
  *             - attributeValue
  *             - attributeType
  *             - attributeUnit
  *           properties:
  *             attributeLabel:
  *               type: string
  *             attributeValue:
  *               type: string
  *             attributeType:
  *               type: string
  *             attributeUnit:
  *               type: string
  *     responses:
  *       200:
  *         description: Create Successfully
  *       400:
  *         description: Bad request
  */
    app.post("/api/v1/node/:IdNode/category/:IdCategory/attribut/create", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let node = yield spinalAPIMiddleware.load(parseInt(req.params.IdNode, 10));
            let category = yield spinalAPIMiddleware.load(parseInt(req.params.IdCategory, 10));
            let attributeLabel = req.body.attributeLabel;
            let attributeValue = req.body.attributeValue;
            let attributeType = req.body.attributeType;
            let attributeUnit = req.body.attributeUnit;
            let childrens = yield node.getChildren(constants_1.NODE_TO_CATEGORY_RELATION);
            for (let index = 0; index < childrens.length; index++) {
                if (childrens[index]._server_id === category._server_id) {
                    spinal_env_viewer_plugin_documentation_service_1.serviceDocumentation.addAttributeByCategoryName(node, category.getName().get(), attributeLabel, attributeValue, attributeType, attributeUnit);
                }
                else {
                    return res.status(400).send("ko");
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=createAttribut.js.map