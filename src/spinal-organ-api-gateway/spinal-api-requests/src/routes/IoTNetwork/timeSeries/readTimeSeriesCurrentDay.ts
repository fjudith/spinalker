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
import { SpinalContext, SpinalGraphService } from 'spinal-env-viewer-graph-service'
import spinalServiceTimeSeries from '../spinalTimeSeries'
import SpinalAPIMiddleware from '../../../spinalAPIMiddleware';
import { CurrentValue } from '../interfacesEndpointAndTimeSeries'
import asyncIteratorToArray from '../../../utilities/asyncToArray'
import verifDate from "../../../utilities/dateFunctions";

import * as express from 'express';
import * as moment from 'moment'

module.exports = function (logger, app: express.Express, spinalAPIMiddleware: SpinalAPIMiddleware) {  /**

  /**
* @swagger
* /api/v1/endpoint/{id}/timeSeries/readCurrentDay:
*   security:
*     - OAuth2: [read]
*   get:
*     description: get time series of current day 
*     summary: get time series of current day
*     tags:
*       - IoTNetwork & Time Series
*     parameters:
*      - in: path
*        name: id
*        description: use the dynamic ID
*     responses:
*       200:
*         description: Success
*         schema:
*           $ref: "#/definitions/Timeserie"
*       400:
*         description: Bad request
  */

  const { SpinalGraphService } = require('spinal-env-viewer-graph-service')
  const { asyncIteratorToArray } = require('../../utilities/asyncToArray')
  var moment = require('moment'); // require


  app.get("/api/v1/endpoint/:id/timeSeries/readCurrentDay", async (req, res, next) => {

    try {
      var node = await spinalAPIMiddleware.load(parseInt(req.params.id, 10))
      SpinalGraphService._addNode(node);

      const timeseries = await spinalServiceTimeSeries().getOrCreateTimeSeries(node.getId().get())
      var iteratorData = await timeseries.getDataFromLastDays(1);
      var data = await asyncIteratorToArray(iteratorData)
      for (let i = 0; i < data.length; i++) {
        data[i].date = moment(data[i].date);
      }
    } catch (error) {
      console.error(error)
      return res.status(400).send("ko")
    }


    res.json(data);
  })

}
