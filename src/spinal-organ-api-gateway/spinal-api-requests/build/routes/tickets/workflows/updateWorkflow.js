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
module.exports = function (logger, app, spinalAPIMiddleware) {
    /**
  * @swagger
  * /api/v1/workflow/{id}/update:
  *   security:
  *     - OAuth2: [read]
  *   put:
  *     description: update the workflow
  *     summary: update the workflow
  *     tags:
  *       - Workflow & ticket
  *     parameters:
  *      - in: path
  *        name: id
  *        description: use the dynamic ID
  *      - in: body
  *        name: newNameWorkflow
  *        description: The name to update.
  *        schema:
  *          type: object
  *          required:
  *            - newNameWorkflow
  *          properties:
  *             newNameWorkflow:
  *              type: string
  *     responses:
  *       200:
  *         description: Success
  *       400:
  *         description: Bad request
  */
    app.put("/api/v1/workflow/:id/update", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var workflow = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            var childrens = yield spinalAPIMiddleware.getGraph().getChildren("hasContext");
            for (const child of childrens) {
                if (child.getName().get() === req.body.newNameWorkflow) {
                    return res.status(400).send("the name context already exists");
                }
            }
            if (workflow.getType().get() === "SpinalSystemServiceTicket" && req.body.nameWorkflow !== "string") {
                workflow.info.name.set(req.body.newNameWorkflow);
            }
            else {
                return res.status(400).send("this context is not a SpinalSystemServiceTicket Or string is invalid name");
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=updateWorkflow.js.map