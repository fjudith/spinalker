/**
 * @swagger
 * definitions:
 *   ContextEvent:
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
 */
export interface ContextEvent {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
}
/**
 * @swagger
 * definitions:
 *   CategoryEvent:
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
 */
export interface CategoryEvent {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
}
/**
 * @swagger
 * definitions:
 *   GroupEvent:
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
 */
export interface GroupEvent {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
}
/**
 * @swagger
 * definitions:
 *   Event:
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
 *       groupeId:
 *         type: "string"
 *       categoryId:
 *         type: "string"
 *       nodeId:
 *         type: "string"
 *       repeat:
 *         type: "boolean"
 *       description:
 *         type: "string"
 *       startDate:
 *         type: "string"
 *       endDate:
 *         type: "string"
 */
export interface Event {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
    groupeId: string;
    categoryId: string;
    nodeId: string;
    repeat: boolean;
    description: string;
    startDate: string;
    endDate: string;
}
