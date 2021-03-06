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
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
// get the config
const config = require("../config");
const { SpinalServiceUser } = require('spinal-service-user');
class SpinalAPIMiddleware {
    constructor() {
        this.loadedPtr = new Map();
        // connection string to connect to spinalhub
        const connect_opt = `http://${config.spinalConnector.user}:${config.spinalConnector.password}@${config.spinalConnector.host}:${config.spinalConnector.port}/`;
        // FileSystem._disp = true
        // initialize the connection
        this.conn = spinal_core_connectorjs_type_1.spinalCore.connect(connect_opt);
        // get the Model from the spinalhub, "onLoadSuccess" and "onLoadError" are 2
        // callback function.
        spinal_core_connectorjs_type_1.spinalCore.load(this.conn, config.file.path, this.onLoadSuccess, this.onLoadError);
    }
    static getInstance() {
        if (SpinalAPIMiddleware.instance === null) {
            SpinalAPIMiddleware.instance = new SpinalAPIMiddleware();
        }
        return SpinalAPIMiddleware.instance;
    }
    onLoadError() {
        console.error(`File does not exist in location ${config.file.path}`);
    }
    // called if connected to the server and if the spinalhub sent us the Model
    onLoadSuccess(forgeFile) {
        spinal_env_viewer_graph_service_1.SpinalGraphService.setGraphFromForgeFile(forgeFile)
            .then((id) => {
            if (typeof id !== 'undefined') {
                SpinalServiceUser.init();
            }
        })
            .catch(e => console.error(e));
    }
    getGraph() {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getGraph();
    }
    load(server_id) {
        if (!server_id) {
            return Promise.reject("Invalid serverId");
        }
        if (typeof spinal_core_connectorjs_type_1.FileSystem._objects[server_id] !== "undefined") {
            // @ts-ignore
            return Promise.resolve(spinal_core_connectorjs_type_1.FileSystem._objects[server_id]);
        }
        return new Promise((resolve, reject) => {
            this.conn.load_ptr(server_id, (model) => {
                if (!model) {
                    // on error
                    reject("loadptr failed...!");
                }
                else {
                    // on success
                    resolve(model);
                }
            });
        });
    }
    loadPtr(ptr) {
        if (ptr instanceof spinal_core_connectorjs_type_1.spinalCore._def['File'])
            return this.loadPtr(ptr._ptr);
        const server_id = ptr.data.value;
        if (this.loadedPtr.has(server_id)) {
            return this.loadedPtr.get(server_id);
        }
        const prom = new Promise((resolve, reject) => {
            try {
                this.conn.load_ptr(server_id, (model) => {
                    if (!model) {
                        reject(new Error(`LoadedPtr Error server_id: '${server_id}'`));
                    }
                    else {
                        resolve(model);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
        this.loadedPtr.set(server_id, prom);
        return prom;
    }
}
SpinalAPIMiddleware.instance = null;
exports.default = SpinalAPIMiddleware;
//# sourceMappingURL=spinalAPIMiddleware.js.map