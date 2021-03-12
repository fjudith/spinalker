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
const spinalTimeSeries_1 = require("../spinalTimeSeries");
module.exports = function (logger, app, spinalAPIMiddleware) {
    const { SpinalGraphService } = require('spinal-env-viewer-graph-service');
    const { asyncIteratorToArray } = require('../../utilities/asyncToArray');
    var moment = require('moment'); // require
    app.get("/api/v1/endpoint/:id/timeSeries/readCurrentMonth", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            var node = yield spinalAPIMiddleware.load(parseInt(req.params.id, 10));
            SpinalGraphService._addNode(node);
            const timeseries = yield spinalTimeSeries_1.default().getOrCreateTimeSeries(node.getId().get());
            var iteratorData = yield spinalTimeSeries_1.default().getFromIntervalTimeGen(timeseries, moment(req.params.begin, "DD MM YYYY"), moment(req.params.end, "DD MM YYYY"));
            var data = yield asyncIteratorToArray(iteratorData);
            for (let i = 0; i < data.length; i++) {
                data[i].date = moment(data[i].date);
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send("ko");
        }
        res.json(data);
    }));
};
//# sourceMappingURL=readTimeSeriesCurrentMonth.js.map