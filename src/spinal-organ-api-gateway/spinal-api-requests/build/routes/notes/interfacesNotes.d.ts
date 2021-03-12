/**
* @swagger
* definitions:
*   Note:
*     type: "object"
*     properties:
*       userName:
*         type: "string"
*       date:
*         type: "integer"
*       type:
*         type: "string"
*       message:
*         type: "string"
 */
export interface Note {
    userName: string;
    date: number;
    type: string;
    message: string;
}
/**
* @swagger
* definitions:
*   File:
*     type: "object"
*     properties:
*       name:
*         type: "string"
*       fileId:
*         type: "integer"
 */
export interface File {
    name: string;
    fileId: number;
}
