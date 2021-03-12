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
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const spinalTimeSeries_1 = require("../spinalTimeSeries");
const asyncToArray_1 = require("../../../utilities/asyncToArray");
const dateFunctions_1 = require("../../../utilities/dateFunctions");
const moment = require("moment");
module.exports = function (logger, app, spinalAPIMiddleware) {
    app.get("/api/v1/endpoint/:id/timeSeries/read/:begin/:end", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var node = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService._addNode(node);
            const timeseries = yield spinalTimeSeries_1.default().getOrCreateTimeSeries(node.getId().get());
            if (!dateFunctions_1.default(req.params.begin) || !dateFunctions_1.default(req.params.end)) {
                throw "invalid date";
            }
            else {
                // @ts-ignore
                var iteratorData = yield spinalTimeSeries_1.default().getFromIntervalTimeGen(timeseries, dateFunctions_1.default(req.params.begin), dateFunctions_1.default(req.params.begin));
                // @ts-ignore
                var data = yield asyncToArray_1.default(iteratorData);
                for (let i = 0; i < data.length; i++) {
                    data[i].date = moment(data[i].date);
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.status(400).send("ko");
        }
        res.json(data);
    }));
};
//# sourceMappingURL=readTimeSeries.js.map