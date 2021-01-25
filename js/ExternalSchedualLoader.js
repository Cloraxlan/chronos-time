"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSchedualLoader = void 0;
const SchedualManager_1 = require("./SchedualManager");
const refetch_1 = __importDefault(require("@hazelee/refetch"));
class ExternalSchedualLoader {
    constructor(getSchedualURL, pingSchedualURL, testing = false) {
        this._manager = null;
        this.testing = testing;
        this._getSchedualURL = getSchedualURL;
        this._pingSchedualURL = pingSchedualURL;
        if (!testing) {
            refetch_1.default(this._getSchedualURL)
                .json()
                .then((data) => {
                this._manager = new SchedualManager_1.SchedualManager(data.scheduals, () => {
                    this.getTodayTommorow().then((todayTommorow) => {
                        if (this._manager) {
                            this._manager.goToSchedual(todayTommorow[0]);
                            this._manager.setNextTag = todayTommorow[1];
                        }
                    });
                });
                this.getTodayTommorow().then((todayTommorow) => {
                    if (this._manager) {
                        this._manager.goToSchedual(todayTommorow[0]);
                        this._manager.setNextTag = todayTommorow[1];
                    }
                });
            });
        }
        else {
            this._manager = new SchedualManager_1.SchedualManager(getSchedualURL, () => {
                this.getTodayTommorow().then((todayTommorow) => {
                    if (this._manager) {
                        this._manager.goToSchedual(todayTommorow[0]);
                        this._manager.setNextTag = todayTommorow[1];
                    }
                });
            });
            this.getTodayTommorow().then((todayTommorow) => {
                console.log("1!!" + todayTommorow);
                if (this._manager) {
                    this._manager.goToSchedual(todayTommorow[0]);
                    this._manager.setNextTag = todayTommorow[1];
                }
            });
            console.log(this.getTodayTommorow());
        }
    }
    getTodayTommorow() {
        if (!this.testing) {
            return refetch_1.default(this._pingSchedualURL)
                .json()
                .then((data) => {
                return [data.today, data.tommorow];
            });
        }
        else {
            return new Promise((resolve) => {
                resolve([
                    this._pingSchedualURL.today,
                    this._pingSchedualURL.tommorow,
                ]);
            });
        }
    }
    get currentTimeLeft() {
        if (this._manager) {
            return this._manager.currentTimeLeft;
        }
        return "N/A";
    }
    get currentName() {
        if (this._manager) {
            return this._manager.currentName;
        }
        return "N/A";
    }
    get nextName() {
        if (this._manager) {
            return this._manager.nextName;
        }
        return "N/A";
    }
    get currentTag() {
        if (this._manager) {
            return this._manager.currentTag;
        }
        return "N/A";
    }
    getMetadata() {
        return this._manager.schedualMetadata;
    }
    getTimeSlotMetaData() {
        return this._manager.timeSlotMetadata;
    }
    getSchedualStatus() {
        return this._manager.getSchedualStatus();
    }
}
exports.ExternalSchedualLoader = ExternalSchedualLoader;
