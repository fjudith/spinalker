/**
* @swagger
* definitions:
*   NodeAttribut:
*     type: "object"
*     properties:
*       dynamicId:
*         type: "integer"
*       staticId:
*         type: "string"
*       name:
*         type: "string"
*       type:
*         type: "string"
*       attributs:
*         type: "array"
*         items:
*           anyOf:
*             - $ref: "#/definitions/Attributs"
*/
export interface NodeAttribut {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
    attributs: Attributs[];
}
/**
 * @swagger
 * definitions:
 *   Attributs:
 *     type: "object"
 *     properties:
 *       label:
 *         type: "string"
 *       value:
 *         type: "string"
 *       date:
 *         type: "integer"
 */
export interface Attributs {
    label: string;
    value: string;
    date: number;
}
