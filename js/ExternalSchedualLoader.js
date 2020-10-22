"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSchedualLoader = void 0;
const SchedualManager_1 = require("./SchedualManager");
const refetch_1 = __importDefault(require("@hazelee/refetch"));
class ExternalSchedualLoader {
    constructor(getSchedualURL, pingSchedualURL) {
        this._manager = null;
        this._getSchedualURL = getSchedualURL;
        this._pingSchedualURL = pingSchedualURL;
        refetch_1.default(this._getSchedualURL).json().then((data) => {
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
    getTodayTommorow() {
        return refetch_1.default(this._pingSchedualURL).json().then((data) => {
            return [data.today, data.tommorow];
        });
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
}
exports.ExternalSchedualLoader = ExternalSchedualLoader;
