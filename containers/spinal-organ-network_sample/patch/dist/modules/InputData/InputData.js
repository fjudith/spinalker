"use strict";
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
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
const InputDataModel_1 = require("./InputDataModel/InputDataModel");
/**
 * Simulation Class to generate data from an extrenal source
 *
 * @class InputData
 */
class InputData {
    /**
     *Creates an instance of InputData.
     * @memberof InputData
     */
    constructor() {
        const intervalTest = 1000 * 10;
        this.devices = [];
        this.onData = null;
        this.generateData();
        setInterval(this.onDataInterval.bind(this), intervalTest);
    }
    /**
     * @private
     * @memberof InputData
     */
    onDataInterval() {
        if (this.onData !== null) {
            this.onData(this.getAndUpdateOneRandomDevice());
        }
    }
    /**
     * @param {onDataFunctionType} onData
     * @memberof InputData
     */
    setOnDataCBFunc(onData) {
        this.onData = onData;
    }
    /**
     * @private
     * @memberof InputData
     */
    generateData() {
        for (let i = 0; i < 113; i++) {
            let device = this.generateDataDevice(i);
            this.devices.push(device);
            this.updateDevice(device);
        }
    }
    /**
     * @private
     * @returns {InputDataDevice}
     * @memberof InputData
     */
    generateDataDevice(id) {
        function createFunc(str, type, constructor) {
            return new constructor(str, type, str, "");
        }
        const res = createFunc(`Automate ${id}`, "device", InputDataModel_1.InputDataDevice);
        const CHILD_9 = new InputDataModel_1.InputDataEndpoint(`alarme_temp`, 0, "Celsius", InputDataModel_1.InputDataEndpointDataType.Boolean, InputDataModel_1.InputDataEndpointType.Occupation, `DEVICE-${id} alarme_CO2`, "");
        const CHILD_8 = new InputDataModel_1.InputDataEndpoint(`alarme_CO2`, 0, "Celsius", InputDataModel_1.InputDataEndpointDataType.Boolean, InputDataModel_1.InputDataEndpointType.Occupation, `DEVICE-${id} alarme_CO2`, "");
        const CHILD_7 = new InputDataModel_1.InputDataEndpoint(`consigne_temp`, 0, "Celsius", InputDataModel_1.InputDataEndpointDataType.Double, InputDataModel_1.InputDataEndpointType.Temperature, `DEVICE-${id} consigne_temp`, "");
        const CHILD_6 = new InputDataModel_1.InputDataEndpoint(`consigne_lum`, 0, "Celsius", InputDataModel_1.InputDataEndpointDataType.Double, InputDataModel_1.InputDataEndpointType.Temperature, `DEVICE-${id} consigne_lum`, "");
        const CHILD_3 = new InputDataModel_1.InputDataEndpoint(`Température`, 0, "Celsius", InputDataModel_1.InputDataEndpointDataType.Double, InputDataModel_1.InputDataEndpointType.Temperature, `DEVICE-${id} Temperature`, "");
        const CHILD_4 = new InputDataModel_1.InputDataEndpoint(`Hydrometrie`, 0, "%", InputDataModel_1.InputDataEndpointDataType.Integer, InputDataModel_1.InputDataEndpointType.Hygrometry, `DEVICE-${id} Hydrometrie`, "");
        const CHILD_5 = new InputDataModel_1.InputDataEndpoint(`Présence`, false, "", InputDataModel_1.InputDataEndpointDataType.Boolean, InputDataModel_1.InputDataEndpointType.Occupation, `DEVICE-${id} Présence`, "");
        res.children.push(CHILD_3, CHILD_4, CHILD_5, CHILD_6, CHILD_7, CHILD_8, CHILD_9);
        return res;
    }
    /**
     * @private
     * @param {(InputDataDevice|InputDataEndpointGroup)} deviceOrEnpointGroup
     * @memberof InputData
     */
    updateDevice(deviceOrEnpointGroup) {
        let maxTemp = 30;
        let minTemp = 16;
        let maxHydro = 100;
        let minHydro = 0;
        let randBool = 0;
        for (const child of deviceOrEnpointGroup.children) {
            if (child instanceof InputDataModel_1.InputDataEndpoint) {
                child.idx += 1;
                // const nbr = Math.sin(child.idx * (Math.PI / 30));
                // console.log(child);
                if (child.type == 0) {
                    child.currentValue = Math.random() * (maxTemp - minTemp) + minTemp;
                }
                else if (child.type == 1) {
                    child.currentValue = Math.random() * (maxHydro - minHydro) + minHydro;
                }
                else if (child.type == 3) {
                    randBool = Math.random() * (2 - 0) + 0;
                    if (randBool >= 1) {
                        child.currentValue = true;
                    }
                    else {
                        child.currentValue = false;
                    }
                }
                //console.log(child);
                console.log(child.currentValue);
            }
            else if (child instanceof InputDataModel_1.InputDataDevice ||
                child instanceof InputDataModel_1.InputDataEndpointGroup) {
                this.updateDevice(child);
            }
        }
    }
    /**
     * @private
     * @returns {InputDataDevice}
     * @memberof InputData
     */
    getAndUpdateOneRandomDevice() {
        if (this.devices.length > 0) {
            const idx = Math.floor(Math.random() * this.devices.length);
            this.updateDevice(this.devices[idx]);
            return this.devices[idx];
        }
        this.generateData();
        return this.getAndUpdateOneRandomDevice();
    }
}
exports.InputData = InputData;
//# sourceMappingURL=InputData.js.map