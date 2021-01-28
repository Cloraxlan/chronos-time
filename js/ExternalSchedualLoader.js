"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSchedualLoader = void 0;
const SchedualManager_1 = require("./SchedualManager");
const refetch_1 = __importDefault(require("@hazelee/refetch"));
class ExternalSchedualLoader extends SchedualManager_1.SchedualManager {
    constructor(getSchedualURL, pingSchedualURL) {
        super([], () => { });
        this.testing = false;
        this._getSchedualURL = getSchedualURL;
        this._pingSchedualURL = pingSchedualURL;
        this.asyncSetup(getSchedualURL, pingSchedualURL);
    }
    async asyncSetup(getSchedualURL, pingSchedualURL) {
        let sSettings = await this.readData(getSchedualURL);
        super.asyncConstruct(sSettings, () => {
            this.getTodayTommorow().then((todayTommorow) => {
                if (this._manager) {
                    super.goToSchedual(todayTommorow[0]);
                    super.setNextTag = todayTommorow[1];
                }
            });
        });
        console.log(super.currentName);
        this.getTodayTommorow().then((todayTommorow) => {
            super.goToSchedual(todayTommorow[0]);
            super.setNextTag = todayTommorow[1];
            this._manager = true;
        });
    }
    async readData(getSchedualURL) {
        return await refetch_1.default(getSchedualURL)
            .json()
            .then((data) => {
            return data.scheduals;
            /*this._manager = new SchedualManager(data.scheduals, () => {
              this.getTodayTommorow().then((todayTommorow: [string, string]) => {
                if (this._manager) {
                  this._manager.goToSchedual(todayTommorow[0]);
                  this._manager.setNextTag = todayTommorow[1];
                  
                }
              });
            });
            this.getTodayTommorow().then((todayTommorow: [string, string]) => {
              if (this._manager) {
                this._manager.goToSchedual(todayTommorow[0]);
                this._manager.setNextTag = todayTommorow[1];
              }
            });*/
        });
    }
    getTodayTommorow() {
        return refetch_1.default(this._pingSchedualURL)
            .json()
            .then((data) => {
            return [data.today, data.tommorow];
        });
    }
    get currentTimeLeft() {
        if (this._manager) {
            return super.currentTimeLeft;
        }
        return "N/A";
    }
    get currentName() {
        if (this._manager) {
            return super.currentName;
        }
        return "N/A";
    }
    get nextName() {
        if (this._manager) {
            return super.nextName;
        }
        return "N/A";
    }
    get currentTag() {
        if (this._manager) {
            return super.currentTag;
        }
        return "N/A";
    }
    getMetadata() {
        return super.schedualMetadata;
    }
    getTimeSlotMetaData() {
        return super.timeSlotMetadata;
    }
    getSchedualStatus() {
        return super.getSchedualStatus();
    }
}
exports.ExternalSchedualLoader = ExternalSchedualLoader;
