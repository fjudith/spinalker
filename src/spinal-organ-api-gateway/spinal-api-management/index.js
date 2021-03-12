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

const fetch = require('node-fetch')

function Management(swaggerDocs, adminAPI = {}) {

  adminAPI = {
    host: adminAPI.host || 'http://localhost',
    port: adminAPI.port || '9889'
  }

  let scopes = []

  const reservedReqs = ['apiDocs', 'admin']

  const getAPIRequests = async function () {
    return fetch(adminAPI.host + ':' + adminAPI.port + '/api-endpoints')
  }

  const putAPIRequest = function (requestName, requestData) {
    return fetch(adminAPI.host + ':' + adminAPI.port + '/api-endpoints/' + requestName, {
      method: 'PUT',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const deleteAPIRequest = function (requestName, requestData) {
    return fetch(adminAPI.host + ':' + adminAPI.port + '/api-endpoints/' + requestName, {
      method: 'DELETE'
    })
  }

  const postScopes = function (scopes) {
    return fetch(adminAPI.host + ':' + adminAPI.port + '/scopes', {
      method: 'POST',
      body: JSON.stringify(scopes),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // synchronizes stored requests in gateway and documented ones
  const syncRequests = function () {

    // TODO show logs about sync

    getAPIRequests()
      .then(res => res.json())
      .then(async json => {
        // requests already stored in Express Gateway
        let storedReqs = {}

        // new requests to be configured in Express Gateway
        let newReqs = {}
        // old requests to be removed from Express Gateway
        let obsoleteReqs = {}

        if (json != null)
          storedReqs = json

        // add new request
        Object.keys(swaggerDocs.paths).forEach((r) => {
          let _r = r.slice(1)

          if (!storedReqs.hasOwnProperty(_r)) {
            newReqs[_r] = { paths: [r], host: '*' }
            // TODO improve condition to verify that is OAuth2
            if (swaggerDocs.paths[r].security)
              newReqs[_r].scopes = swaggerDocs.paths[r].security[0].OAuth2
          }

          if (swaggerDocs.paths[r].security)
            scopes = scopes.concat(swaggerDocs.paths[r].security[0].OAuth2)
        })

        // remove duplicate scopes
        scopes = Array.from(new Set(scopes))

        // remove old request
        Object.keys(storedReqs)
          .filter((r) => reservedReqs.indexOf(r) == -1)
          .forEach((r) => {
            if (!swaggerDocs.paths.hasOwnProperty('/' + r))
              obsoleteReqs[r] = true
          })

        const newReqsNames = Object.keys(newReqs);
        const obsoleteReqsNames = Object.keys(obsoleteReqs);

        (async function () {

          // store scopes
          for (let i = 0; i < scopes.length; i++) {
            await postScopes(scopes)
          }

          // store new requests
          for (let i = 0; i < newReqsNames.length; i++) {
            await putAPIRequest(newReqsNames[i], newReqs[newReqsNames[i]])
          }

          // remove old requests
          for (let i = 0; i < obsoleteReqsNames.length; i++) {
            await deleteAPIRequest(obsoleteReqsNames[i])
          }

        })()

      })
      .catch(console.error)

  }

  return {

    run: function () {

      syncRequests()

    }

  }

}

module.exports = Management
