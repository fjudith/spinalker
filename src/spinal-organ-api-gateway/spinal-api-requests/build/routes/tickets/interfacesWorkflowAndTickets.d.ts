/**
 * @swagger
 * definitions:
 *   Workflow:
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
export interface Workflow {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
}
/**
 * @swagger
 * definitions:
 *   WorkflowTree:
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
 *       Workflow:
 *         type: "string"
 *       children:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/WorkflowTree"
 *     exemple:
 *       dynamicId: 377295296
 *       staticId: SpinalContext-b61aca38-c262-56bd-9b3b-72fba07999a4-173a52a9bd8
 *       name: Scenes
 *       type: SpinalService
 *       context: SpinalContext
 *       children:
 *       - dynamicId: 377301280
 *         staticId: SpinalNode-c04c8302-ef21-7fa1-3435-8bf1ecd717b8-173a52a9bde
 *         name: bim
 *         type: scene
 *         children: []
 */
export interface WorkflowTree {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
    children: WorkflowTree[];
}
/**
 * @swagger
 * definitions:
 *   Step:
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
 *       color:
 *         type: "string"
 *       order:
 *         type: "integer"
 *       processId:
 *         type: "string"
 */
export interface Step {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
    color: string;
    order: number;
    processId: string;
}
/**
 * @swagger
 * definitions:
 *   TicketDetails:
 *     type: "object"
 *     properties:
 *       dynamicId:
 *         type: "number"
 *       staticId:
 *         type: "string"
 *       name:
 *         type: "string"
 *       type:
 *         type: "string"
 *       priority:
 *         type: "integer"
 *       creationDate:
 *         type: "integer"
 *       elementSelectedId:
 *         type: "integer"
 *       userName:
 *         type: "string"
 *       StepId:
 *         type: "string"
 *       workflowDynamicId:
 *         type: "integer"
 *       workflowName:
 *         type: "string"
 *       Annotation_list:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Note"
 *       file_list:
 *         type: array
 *         items:
 *           $ref: "#/definitions/File"
 *       log_list:
 *         type: array
 *         items:
 *           $ref: "#/definitions/LogTicket"

 */
export interface TicketDetails {
    dynamicId: number;
    staticId: string;
    name: string;
    type: string;
    priority: number;
    creationDate: number;
    elementSelectedId: number;
    userName: string;
    stepId: string;
    workflowId: number;
    workflowName: string;
    annotation_list: [];
    file_list: [];
    log_list: [];
}
