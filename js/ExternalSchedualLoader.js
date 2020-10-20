import { SchedualManager } from "./SchedualManager";
import fetch from "node-fetch";
export class ExternalSchedualLoader {
    constructor(getSchedualURL, pingSchedualURL) {
        this._manager = null;
        this._getSchedualURL = getSchedualURL;
        this._pingSchedualURL = pingSchedualURL;
        fetch(this._getSchedualURL).then((res) => {
            res.json().then((data) => {
                console.log(data);
                this._manager = new SchedualManager(data.scheduals, () => {
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
        });
    }
    getTodayTommorow() {
        return fetch(this._pingSchedualURL).then((res) => {
            return res.json().then((data) => {
                return [data.today, data.tommorow];
            });
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
