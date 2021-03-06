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
function findOneInContext(node, context, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof predicate !== 'function') {
            throw new Error('The predicate function must be a function');
        }
        const seen = new Set([node]);
        let promises = [];
        let nextGen = [node];
        let currentGen = [];
        while (nextGen.length) {
            currentGen = nextGen;
            promises = [];
            nextGen = [];
            for (const object of currentGen) {
                if (predicate(object)) {
                    return object;
                }
            }
            promises = currentGen.map((object) => object.getChildrenInContext(context));
            const childrenArrays = yield Promise.all(promises);
            for (const children of childrenArrays) {
                for (const child of children) {
                    if (!seen.has(child)) {
                        nextGen.push(child);
                        seen.add(child);
                    }
                }
            }
        }
        return undefined;
    });
}
exports.findOneInContext = findOneInContext;
//# sourceMappingURL=findOneInContext.js.map