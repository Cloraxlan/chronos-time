"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedualManager = void 0;
const Schedual_1 = require("./Schedual");
const events_1 = require("events");
const EmptySchedual_1 = require("./EmptySchedual");
class SchedualManager {
    constructor(scheduals, onSchedualEnd) {
        this._currentTag = "";
        this._nextTag = "";
        this._scheduals = [];
        this._currentSchedual = null;
        this._currentSettingIndex = 0;
        if (scheduals.length > 0) {
            this._settings = scheduals;
            this.nextSchedual = new events_1.EventEmitter();
            this.nextSchedual.on("end", () => {
                this.goToNextSchedual();
                onSchedualEnd();
            });
            scheduals.map((schedual, i) => {
                if (schedual.timeSlots.length == 0) {
                    let empty = new EmptySchedual_1.EmptySchedual(schedual.tags, schedual.defaultNextSchedualTag, this.nextSchedual);
                    this._scheduals.push(empty);
                    scheduals[i] = empty.sSettings;
                }
                else {
                    this._scheduals.push(new Schedual_1.Schedual(schedual, this.nextSchedual));
                }
            });
        }
    }
    asyncConstruct(scheduals, onSchedualEnd) {
        this._settings = scheduals;
        this.nextSchedual = new events_1.EventEmitter();
        this.nextSchedual.on("end", () => {
            this.goToNextSchedual();
            onSchedualEnd();
        });
        scheduals.map((schedual, i) => {
            if (schedual.timeSlots.length == 0) {
                let empty = new EmptySchedual_1.EmptySchedual(schedual.tags, schedual.defaultNextSchedualTag, this.nextSchedual);
                this._scheduals.push(empty);
                scheduals[i] = empty.sSettings;
            }
            else {
                this._scheduals.push(new Schedual_1.Schedual(schedual, this.nextSchedual));
            }
        });
    }
    //Finds index of Schedual based on given tag or returns -1 if not found
    getSchedualIndexBasedOnTag(tag) {
        let r = -1;
        this._scheduals.map((schedual, i) => {
            schedual.tags.map((testTag) => {
                if (testTag == tag) {
                    r = i;
                }
            });
        });
        return r;
    }
    set setNextTag(tag) {
        this._nextTag = tag;
        if (this._currentSchedual) {
            this._currentSchedual.purify();
            this._currentSchedual.initiateCurrentTimeSlot(this.generateOutOfBounds(this._currentSettingIndex));
        }
    }
    //Go to schedual based on _nextTag
    goToNextSchedual() {
        if (this._nextTag && this._nextTag != "") {
            console.log(this._nextTag);
            //this.goToSchedual(this._nextTag);
        }
        else {
            console.log("No next tag provided");
        }
    }
    //i is the index of current schedual
    generateOutOfBounds(i) {
        if (this._nextTag) {
        }
        return {
            begin: this._settings[i].timeSlots[this._settings[i].timeSlots.length - 1]
                .end,
            end: this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)]
                .timeSlots[0].begin,
            name: this._settings[i].outOfBoundsName,
        };
    }
    //Go to schedual based on tag
    goToSchedual(tag) {
        //Gets rid of chance of nextSchedual emitter from being activated
        if (this._currentSchedual) {
            this._currentSchedual.purify();
        }
        try {
            let schedualIndex = this.getSchedualIndexBasedOnTag(tag);
            this._currentSchedual = this._scheduals[schedualIndex];
            this._currentSettingIndex = schedualIndex;
            this._currentTag = tag;
            this._nextTag = this._settings[schedualIndex].defaultNextSchedualTag;
            this._currentSchedual.initiateCurrentTimeSlot(this.generateOutOfBounds(schedualIndex));
        }
        catch (error) {
            console.log(error);
        }
    }
    get currentTimeSlot() {
        if (this._currentSchedual) {
            let currentTimeSlot = this._currentSchedual
                .currentTimeSlot;
            if (currentTimeSlot) {
                return currentTimeSlot;
            }
            console.log("No valid time found based on tags");
            return null;
        }
        console.log("No valid schedual found based on tags");
        return null;
    }
    get currentTag() {
        return this._currentTag;
    }
    get currentName() {
        var _a;
        return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.currentName;
    }
    get nextName() {
        var _a;
        let nextOutOfBounds = this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)].timeSlots[0].name;
        return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.nextName(nextOutOfBounds);
    }
    get currentTimeLeft() {
        var _a;
        return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.currentTimeLeft;
    }
    get nextTag() {
        return this._nextTag;
    }
    get schedualMetadata() {
        return this._settings[this._currentSettingIndex].metadata;
    }
    get timeSlotMetadata() {
        return this.currentTimeSlot.getMetadata();
    }
    //Gets a whole bunch of data for frontend
    getSchedualStatus() {
        return [
            this._settings[this._currentSettingIndex],
            this._currentSchedual.getCurrentIndex(),
        ];
    }
}
exports.SchedualManager = SchedualManager;
