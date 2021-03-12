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
  * /api/v1/IoTNetworkContext/{id}/delete:
  *   security:
  *     - OAuth2: [read]
  *   delete:
  *     description: delete network context
  *     summary: delete network context
  *     tags:
  *       - IoTNetwork & Time Series
  *     parameters:
  *      - in: path
  *        name: id
  *     responses:
  *       200:
  *         description: Delete Successfully
  *       400:
  *         description: Bad request
  */
    app.delete("/api/v1/IoTNetworkContext/:id/delete", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let IoTNetwork = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            if (IoTNetwork.getType().get() === "Network") {
                IoTNetwork.removeFromGraph();
            }
            else {
                res.status(400).send("this context is not a Network");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send("ko");
        }
        res.json();
    }));
};
//# sourceMappingURL=deleteIoTNetwork.js.map