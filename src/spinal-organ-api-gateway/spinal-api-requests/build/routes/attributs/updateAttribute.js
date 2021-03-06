"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("spinal-env-viewer-plugin-documentation-service/dist/Models/constants");
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/node/{idNode}/category/{idCategory}/attribut/{attributName}/update:
  *   security:
  *     - OAuth2: [read]
  *   put:
  *     description: update attribute
  *     summary: update an attribut
  *     tags:
  *       - Node Attributs
  *     parameters:
  *      - in: path
  *        name: idNode
  *      - in: path
  *        name: idCategory
  *      - in: path
  *        name: attributName
  *      - in: body
  *        name: Attribute
  *        description: The Attribute to create.
  *        schema:
  *          type: object
  *          required:
  *            - attributeLabel
  *            - attributeValue
  *            - attributeType
  *            - attributeUnit
  *          properties:
  *            attributeLabel:
  *              type: string
  *            attributeValue:
  *              type: string
  *     responses:
  *       200:
  *         description: update Successfully
  *         schema:
  *           $ref: "#/definitions/NodeAttribut"
  *       400:
  *         description: Bad request
      */
    app.put("/api/v1/node/:idNode/category/:idCategory/attribute/:attributName/update", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let node = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
        let childrens = yield node.getChildren(constants_1.NODE_TO_CATEGORY_RELATION);
        let nodes = [];
        let category = childrens.find(el => (el.getId().get() === req.params.idCategory));
        if (typeof category != "undefined") {
            let attributes = yield category.getElement();
            for (let index = 0; index < attributes.length; index++) {
                const element = attributes[index];
                if (element.label.get() === req.params.name) {
                    element.label.set(req.body.attributeLabel);
                    element.value.set(req.body.attributeValue);
                    break;
                }
            }
        }
        for (const child of childrens) {
            let attributs = yield child.element.load();
            let info = {
                dynamicId: child._server_id,
                staticId: child.getId().get(),
                name: child.getName().get(),
                type: child.getType().get(),
                attributs: attributs.get()
            };
            nodes.push(info);
        }
        res.json(nodes);
    }));
};
//# sourceMappingURL=updateAttribute.js.map