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

const path = require('path')
const gateway = require('express-gateway')
const logger = require('./logger')
const requests = require('./spinal-api-requests/index.js')
const management = require('./spinal-api-management/index.js')

if (process.env.NODE_ENV == "development")
  require('dotenv').config()

if (!process.env.REQUESTS_PORT) {
  process.env.REQUESTS_PORT = 3000
}
// TODO
// check that both management and requests are present

//levantar los puertos de ENV
// usar .dot env para npm run dev
// agregar un buen sistema de logs por consola

// Express Gateway
const g = gateway()
// request server
const r = requests(logger.requests)
// management connector
const m = management(r.getSwaggerDocs())

g.load(path.join(__dirname, 'config'))
g.run()

r.run(process.env.REQUESTS_PORT)

m.run()
