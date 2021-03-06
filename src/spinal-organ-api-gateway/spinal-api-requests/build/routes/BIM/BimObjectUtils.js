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
const spinalAPIMiddleware_1 = require("../../spinalAPIMiddleware");
const BIM_FILE_CONTEXT_NAME = "BimFileContext";
const BIM_FILE_CONTEXT_RELATION = "hasBimFile";
const BIM_FILE_RELATION = "hasBimContext";
const BIM_CONTEXT_RELATION = "hasBimObject";
module.exports = (_a = class BimObjectUtils {
        constructor() {
            this.context = null;
        }
        static getInstance() {
            return typeof BimObjectUtils.instance !== "undefined" ? BimObjectUtils.instance : (BimObjectUtils.instance = new BimObjectUtils);
        }
        getContext() {
            if (this.context)
                return this.context;
            this.context = new Promise((resolve) => {
                const spinalAPIMiddleware = spinalAPIMiddleware_1.default.getInstance();
                const graph = spinalAPIMiddleware.getGraph();
                resolve(graph.getContext(BIM_FILE_CONTEXT_NAME));
            });
            return this.context;
        }
        getBimFile(bimFileId) {
            return __awaiter(this, void 0, void 0, function* () {
                const context = yield this.getContext();
                const bimFiles = yield context.getChildren([BIM_FILE_CONTEXT_RELATION]);
                for (const bimFile of bimFiles) {
                    if (bimFile._server_id === bimFileId || bimFile.getId().get() === bimFileId) {
                        return bimFile;
                    }
                }
                return undefined;
            });
        }
        getBimObjects(bimFileNode, dbIds) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = [];
                const bimContexts = yield bimFileNode.getChildren([BIM_FILE_RELATION]);
                for (const bimContext of bimContexts) {
                    // eslint-disable-next-line no-await-in-loop
                    const bimObjects = yield bimContext.getChildren([BIM_CONTEXT_RELATION]);
                    bimObjects.reduce((acc, bimObject) => {
                        if (dbIds.includes(bimObject.info.dbid.get()))
                            acc.push(bimObject);
                        return acc;
                    }, res);
                }
                return res;
            });
        }
        getBimObjectsNodeInfo(bimObjects) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                for (const node of bimObjects) {
                    var childrens_list = this.childrensNode(node);
                    // eslint-disable-next-line no-await-in-loop
                    var parents_list = yield this.parentsNode(node);
                    const data = {
                        dynamicId: node._server_id,
                        staticId: node.getId().get(),
                        name: node.getName().get(),
                        type: node.getType().get(),
                        children_relation_list: childrens_list,
                        parent_relation_list: parents_list
                    };
                    this.copyAttrInObj(data, node, 'externalId');
                    this.copyAttrInObj(data, node, 'dbid');
                    this.copyAttrInObj(data, node, 'bimFileId');
                    this.copyAttrInObj(data, node, 'version');
                    result.push(data);
                }
                return result;
            });
        }
        getBimObjectsInfo(bimFileId, dbids) {
            return __awaiter(this, void 0, void 0, function* () {
                const bimFileNode = yield this.getBimFile(bimFileId);
                if (!bimFileNode)
                    throw "BimFileId not found";
                try {
                    const bimObjects = yield this.getBimObjects(bimFileNode, dbids);
                    const bimObjectsInfo = yield this.getBimObjectsNodeInfo(bimObjects);
                    const model = {
                        dynamicId: bimFileNode._server_id,
                        staticId: bimFileNode.getId().get(),
                        name: bimFileNode.getName().get(),
                        type: bimFileNode.getType().get()
                    };
                    const notFound = dbids.reduce((acc, dbid) => {
                        for (const bimObject of bimObjects) {
                            if (typeof bimObject.info.dbid !== 'undefined' &&
                                bimObject.info.dbid.get() === dbid) {
                                return acc;
                            }
                        }
                        acc.push(dbid);
                        return acc;
                    }, []);
                    return {
                        model,
                        bimObjects: bimObjectsInfo,
                        notFound
                    };
                }
                catch (e) {
                    console.error(e);
                    throw "Internal server error";
                }
            });
        }
        copyAttrInObj(target, node, string) {
            if (typeof node.info[string] !== "undefined") {
                Object.assign(target, { [string]: node.info[string].get() });
            }
        }
        childrensNode(node) {
            let childs = node.children;
            let res = [];
            // childrens relation course
            for (const [, relationTypeMap] of childs) {
                for (const [, relation] of relationTypeMap) {
                    let child = {
                        dynamicId: relation._server_id,
                        staticId: relation.getId().get(),
                        name: relation.getName().get(),
                        children_number: relation.getNbChildren()
                    };
                    res.push(child);
                }
            }
            return res;
        }
        parentsNode(node) {
            return __awaiter(this, void 0, void 0, function* () {
                let parents = node.parents;
                let auxtab = [];
                let res = [];
                for (const [, ptrList] of parents) {
                    for (let i = 0; i < ptrList.length; i++) {
                        auxtab.push(ptrList[i].load());
                    }
                }
                res = yield Promise.all(auxtab).then((values) => {
                    return values.map((node) => {
                        return { dynamicId: node._server_id, staticId: node.getId().get(), name: node.getName().get(), children_number: node.getNbChildren() };
                    });
                });
                return res;
            });
        }
    },
    _a.instance = null,
    _a);
var _a;
/**
 * @swagger
 * definitions:
 *   GetBimObjectsInfo:
 *     type: object
 *     properties:
 *       bimFileId:
 *         description: serverId or staticId of the BimFile
 *         type:
 *           - integer
 *           - string
 *       bimObjects:
 *         description: dbIds in the viewer
 *         type: array
 *         items:
 *           type: integer
 *     required:
 *       - bimFileId
 *       - bimObjects
 */
/**
 * @swagger
 * definitions:
 *   BimObjectsInfo:
 *     type: object
 *     properties:
 *       bimFile:
 *         description: mini definition of bimFile
 *         $ref: '#/definitions/BimObjectsInfo/BimFile'
 *       bimObjects:
 *         description: nodes found in the graph
 *         type: array
 *         items:
 *           $ref: '#/definitions/BimObjectsInfo/BimObjectsItem'
 *       notFound:
 *         description: if the dbId is not found in the graph
 *         type: array
 *         items:
 *           type: integer
 *     required:
 *       - code
 *       - bimObjects
 *       - notFound
 */
// interface BimObjectsInfo {
//   model: Model;
//   bimObjects: BimObjectsItem[];
//   notFound: number[];
// }
/**
 * @swagger
 * definitions:
 *   BimObjectsInfo:
 *     BimFile:
 *       type: object
 *       properties:
 *         dynamicId:
 *           type: number
 *         staticId:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: string
 *       required:
 *         - dynamicId
 *         - staticId
 *         - name
 *         - type
 */
// interface BimFile {
//   dynamicId: number;
//   staticId: string;
//   name: string;
//   type: string;
// }
// bimoject
/**
 * @swagger
 * definitions:
 *   BimObjectsInfo:
 *     BimObjectsItem:
 *       allOf:
 *         - $ref: '#/definitions/Node'
 *         - type: object
 *           properties:
 *             externalId:
 *               type: number
 *             dbid:
 *               type: number
 *             bimFileId:
 *               type: string
 *             version:
 *               type: string
 *           required:
 *             - externalId
 *             - dbid
 *             - bimFileId
 *             - version
 */
// interface BimObjectsItem {
//   dynamicId: number;
//   staticId: string;
//   name: string;
//   type: string;
//   children_relation_list: any[];
//   parent_relation_list: any[];
//   externalId: string;
//   dbid: number;
//   bimFileId: string;
//   version: number;
// }
//# sourceMappingURL=BimObjectUtils.js.map