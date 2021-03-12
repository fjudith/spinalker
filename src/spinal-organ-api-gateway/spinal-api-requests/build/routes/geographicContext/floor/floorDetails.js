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
   * /api/v1/floor/{id}/floor_details:
   *   security:
   *     - OAuth2: [read]
   *   get:
   *     description: Return details of a floor
   *     summary: Gets a details of a floor
   *     tags:
   *      - Geographic Context
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
   *             $ref: '#/definitions/FloorDetails'
   *       400:
   *         description: Bad request
    */
    app.get("/api/v1/floor/:id/floor_details", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let sommes = 0;
        let dbIds = [];
        try {
            var floor = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            var rooms = yield floor.getChildren("hasGeographicRoom");
            for (const room of rooms) {
                var bimObjects = yield room.getChildren("hasBimObject");
                for (const bimObject of bimObjects) {
                    dbIds.push(bimObject.info.dbid.get());
                }
                let categories = yield room.getChildren(constants_1.NODE_TO_CATEGORY_RELATION);
                for (const child of categories) {
                    if (child.getName().get() === "Spatial") {
                        let attributs = yield child.element.load();
                        for (const attribut of attributs.get()) {
                            if (attribut.label === "area") {
                                sommes = sommes + attribut.value;
                            }
                        }
                    }
                }
            }
            var info = {
                area: sommes,
                bimObject_DbIds: dbIds
            };
        }
        catch (error) {
            console.error(error);
            res.status(400).send("list of floor is not loaded");
        }
        res.send(info);
    }));
};
//# sourceMappingURL=floorDetails.js.map