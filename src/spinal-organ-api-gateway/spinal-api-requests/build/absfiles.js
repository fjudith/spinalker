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
const arrayOfRequests = [
    "../src/routes/routes.ts",
    // contexts
    "../src/routes/contexts/contextList.ts",
    "../src/routes/contexts/contextTree.ts",
    "../src/routes/contexts/contextTreeDepth.ts",
    "../src/routes/contexts/nodeTreeInContext.ts",
    "../src/routes/contexts/contextNodeTypeList.ts",
    "../src/routes/contexts/contextNodeTypeListOfNode.ts",
    "../src/routes/contexts/contextNodesOfType.ts",
    "../src/routes/contexts/contextNodesOfTypeFornode.ts",
    "../src/routes/contexts/interfacesContexts.ts",
    // Nodes
    "../src/routes/nodes/interfacesNodes.ts",
    "../src/routes/nodes/node.ts",
    "../src/routes/nodes/relationChildrenNode.ts",
    "../src/routes/nodes/relationParentNode.ts",
    "../src/routes/nodes/nodeControlEndPointList.ts",
    "../src/routes/nodes/nodeEndPointList.ts",
    "../src/routes/nodes/nodeNoteList.ts",
    "../src/routes/nodes/nodeTicketList.ts",
    "../src/routes/nodes/nodeFileList.ts",
    "../src/routes/nodes/nodeDownloadFile.ts",
    "../src/routes/nodes/nodeUploadFile.ts",
    //Categories Attributs Nodes
    "../src/routes/categoriesAttributs/categoriesList.ts",
    "../src/routes/categoriesAttributs/createCategory.ts",
    "../src/routes/categoriesAttributs/readCategoryById.ts",
    "../src/routes/categoriesAttributs/readCategoryByName.ts",
    "../src/routes/categoriesAttributs/updateCategoryById.ts",
    "../src/routes/categoriesAttributs/updateCategoryByName.ts",
    "../src/routes/categoriesAttributs/deleteCategoryById.ts",
    "../src/routes/categoriesAttributs/deleteCategoryByName.ts",
    "../src/routes/categoriesAttributs/interfacesCategoriesAtrtribut.ts",
    // Attributs Nodes
    "../src/routes/attributs/attributList.ts",
    "../src/routes/attributs/createAttribut.ts",
    "../src/routes/attributs/updateAttribute.ts",
    "../src/routes/attributs/deleteAttribute.ts",
    "../src/routes/attributs/interfacesAttributs.ts",
    // Geographic Context
    "../src/routes/geographicContext/building/readBuilding.ts",
    "../src/routes/geographicContext/geographicContextTree.ts",
    "../src/routes/geographicContext/floor/floorList.ts",
    "../src/routes/geographicContext/floor/floorDetails.ts",
    "../src/routes/geographicContext/room/roomList.ts",
    "../src/routes/geographicContext/room/readRoom.ts",
    "../src/routes/geographicContext/room/readRoomDetails.ts",
    "../src/routes/geographicContext/room/roomEndPointControlList.ts",
    "../src/routes/geographicContext/room/roomEndPointList.ts",
    "../src/routes/geographicContext/room/roomEquipementList.ts",
    "../src/routes/geographicContext/room/roomNotes.ts",
    "../src/routes/geographicContext/room/roomTicketList.ts",
    "../src/routes/geographicContext/equipement/readEquipement.ts",
    "../src/routes/geographicContext/interfacesGeoContext.ts",
    // IoTNetwork and TimeSeries
    "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkList.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkTree.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/createIotNetwork.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/updateIoTNetwork.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/deleteIoTNetwork.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/findNodeInIoTNetwork.ts", "../src/routes/IoTNetwork/IoTNetworkContext/readNodeInIoTNetwork.ts",
    "../src/routes/IoTNetwork/IoTNetworkContext/IoTNetworkTypeList.ts",
    "../src/routes/IoTNetwork/BmsNetwork/bmsNetworkList.ts",
    "../src/routes/IoTNetwork/BmsNetwork/createBmsNetwork.ts",
    "../src/routes/IoTNetwork/BmsNetwork/updateBmsNetwork.ts",
    "../src/routes/IoTNetwork/BmsNetwork/deleteBmsNetwork.ts",
    "../src/routes/IoTNetwork/device/deviceList.ts",
    "../src/routes/IoTNetwork/device/createDevice.ts",
    "../src/routes/IoTNetwork/device/updateDevice.ts",
    "../src/routes/IoTNetwork/device/deleteDevice.ts",
    "../src/routes/IoTNetwork/endPoint/endointList.ts",
    "../src/routes/IoTNetwork/endPoint/createEndPoint.ts",
    "../src/routes/IoTNetwork/endPoint/readEndPointCurrentValue.ts",
    "../src/routes/IoTNetwork/endPoint/updateEndPointCurrentValue.ts",
    "../src/routes/IoTNetwork/endPoint/deleteEndPoint.ts",
    "../src/routes/IoTNetwork/endPoint/endpointAttributs.ts",
    "../src/routes/IoTNetwork/endPointGroup/endpointGroupList.ts",
    "../src/routes/IoTNetwork/endPointGroup/endpointGroupCreate.ts",
    "../src/routes/IoTNetwork/endPointGroup/endpointGroupUpdate.ts",
    "../src/routes/IoTNetwork/endPointGroup/endpointGroupDelete.ts",
    "../src/routes/IoTNetwork/interfacesEndpointAndTimeSeries.ts",
    "../src/routes/IoTNetwork/networkService.ts",
    "../src/routes/IoTNetwork/spinalTimeSeries.ts",
    "../src/routes/IoTNetwork/timeSeries/insertTimeSeries.ts",
    "../src/routes/IoTNetwork/timeSeries/pushTimeSeries.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeries.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentDay.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentMonth.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentWeek.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeriesCurrentYear.ts",
    "../src/routes/IoTNetwork/timeSeries/readTimeSeriesFrom Last24H.ts",
    // Workflow and Ticket
    "../src/routes/tickets/workflows/workflowList.ts",
    "../src/routes/tickets/workflows/workflowTree.ts",
    "../src/routes/tickets/workflows/workflowTypeList.ts",
    "../src/routes/tickets/workflows/createWorkflow.ts",
    "../src/routes/tickets/workflows/readWorkflow.ts",
    "../src/routes/tickets/workflows/updateWorkflow.ts",
    "../src/routes/tickets/workflows/deleteWorkflow.ts",
    "../src/routes/tickets/workflows/findNodeInWorkflow.ts",
    "../src/routes/tickets/workflows/readNodeInWorkflow.ts",
    "../src/routes/tickets/interfacesWorkflowAndTickets.ts",
    "../src/routes/tickets/process/processList.ts",
    "../src/routes/tickets/process/createProcess.ts",
    "../src/routes/tickets/process/updateProcess.ts",
    "../src/routes/tickets/process/deleteProcess.ts",
    "../src/routes/tickets/steps/stepsListFromProcess.ts",
    "../src/routes/tickets/steps/createStep.ts",
    "../src/routes/tickets/steps/updateStep.ts",
    "../src/routes/tickets/steps/deleteStep.ts",
    "../src/routes/tickets/tickets/createTicket.ts",
    "../src/routes/tickets/tickets/readTicket.ts",
    "../src/routes/tickets/tickets/ticketChangeProcess.ts",
    "../src/routes/tickets/tickets/ticketChangeWorkflow.ts",
    "../src/routes/tickets/tickets/ticketChangeNode.ts",
    "../src/routes/tickets/tickets/ticketNextStep.ts",
    "../src/routes/tickets/tickets/ticketPreviousStep.ts",
    "../src/routes/tickets/tickets/ticketAddDoc.ts",
    "../src/routes/tickets/tickets/ticketAddNote.ts",
    "../src/routes/tickets/tickets/ticketArchive.ts",
    "../src/routes/tickets/tickets/ticketUnarchive.ts",
    "../src/routes/tickets/tickets/ticketFindEntity.ts",
    // Notes
    "../src/routes/notes/addNotes.ts",
    "../src/routes/notes/getNotes.ts",
    "../src/routes/notes/interfacesNotes.ts",
    "../src/routes/notes/updateNotes.ts",
    // BIM
    "../src/routes/BIM/BimObjectUtils.ts",
    "../src/routes/BIM/getBimObjectsInfo.ts",
    "../src/routes/BIM/scenes/default.ts",
    "../src/routes/BIM/scenes/interfaces.ts",
    "../src/routes/BIM/scenes/item.ts",
    "../src/routes/BIM/scenes/list.ts",
    "../src/routes/BIM/scenes/sceneUtils.ts",
    "../src/routes/BIM/viewer/viewer.ts"
];
exports.default = arrayOfRequests;
//# sourceMappingURL=absfiles.js.map