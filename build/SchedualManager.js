"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Schedual_1 = __importDefault(require("./Schedual"));
var events_1 = require("events");
var EmptySchedual_1 = __importDefault(require("./EmptySchedual"));
var SchedualManager = /** @class */ (function () {
    function SchedualManager(scheduals, onSchedualEnd) {
        var _this = this;
        this._currentTag = "";
        this._nextTag = "";
        this._scheduals = [];
        this._currentSchedual = null;
        this._currentSettingIndex = 0;
        this._settings = scheduals;
        this.nextSchedual = new events_1.EventEmitter();
        this.nextSchedual.on("end", function () {
            _this.goToNextSchedual();
            onSchedualEnd();
        });
        scheduals.map(function (schedual, i) {
            if (schedual.timeSlots.length == 0) {
                var empty = new EmptySchedual_1.default(schedual.tags, schedual.defaultNextSchedualTag, _this.nextSchedual);
                _this._scheduals.push(empty);
                scheduals[i] = empty.sSettings;
            }
            else {
                _this._scheduals.push(new Schedual_1.default(schedual, _this.nextSchedual));
            }
        });
    }
    //Finds index of Schedual based on given tag or returns -1 if not found
    SchedualManager.prototype.getSchedualIndexBasedOnTag = function (tag) {
        var r = -1;
        this._scheduals.map(function (schedual, i) {
            schedual.tags.map(function (testTag) {
                if (testTag == tag) {
                    r = i;
                }
            });
        });
        return r;
    };
    Object.defineProperty(SchedualManager.prototype, "setNextTag", {
        set: function (tag) {
            this._nextTag = tag;
            if (this._currentSchedual) {
                this._currentSchedual.purify();
                this._currentSchedual.initiateCurrentTimeSlot(this.generateOutOfBounds(this._currentSettingIndex));
            }
        },
        enumerable: false,
        configurable: true
    });
    //Go to schedual based on _nextTag
    SchedualManager.prototype.goToNextSchedual = function () {
        this.goToSchedual(this._nextTag);
    };
    //i is the index of current schedual
    SchedualManager.prototype.generateOutOfBounds = function (i) {
        if (this._nextTag) {
        }
        return {
            begin: this._settings[i].timeSlots[this._settings[i].timeSlots.length - 1]
                .end,
            end: this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)]
                .timeSlots[0].begin,
            name: this._settings[i].outOfBoundsName,
        };
    };
    //Go to schedual based on tag
    SchedualManager.prototype.goToSchedual = function (tag) {
        //Gets rid of chance of nextSchedual emitter from being activated
        if (this._currentSchedual) {
            this._currentSchedual.purify();
        }
        var schedualIndex = this.getSchedualIndexBasedOnTag(tag);
        this._currentSchedual = this._scheduals[schedualIndex];
        this._currentSettingIndex = schedualIndex;
        this._currentTag = tag;
        this._nextTag = this._settings[schedualIndex].defaultNextSchedualTag;
        this._currentSchedual.initiateCurrentTimeSlot(this.generateOutOfBounds(schedualIndex));
    };
    Object.defineProperty(SchedualManager.prototype, "currentTimeSlot", {
        get: function () {
            if (this._currentSchedual) {
                var currentTimeSlot = this._currentSchedual
                    .currentTimeSlot;
                if (currentTimeSlot) {
                    return currentTimeSlot;
                }
                console.log("No valid time found based on tags");
                return null;
            }
            console.log("No valid schedual found based on tags");
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SchedualManager.prototype, "currentTag", {
        get: function () {
            return this._currentTag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SchedualManager.prototype, "currentName", {
        get: function () {
            var _a;
            return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.currentName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SchedualManager.prototype, "nextName", {
        get: function () {
            var _a;
            var nextOutOfBounds = this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)].timeSlots[0].name;
            return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.nextName(nextOutOfBounds);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SchedualManager.prototype, "currentTimeLeft", {
        get: function () {
            var _a;
            return (_a = this._currentSchedual) === null || _a === void 0 ? void 0 : _a.currentTimeLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SchedualManager.prototype, "nextTag", {
        get: function () {
            return this._nextTag;
        },
        enumerable: false,
        configurable: true
    });
    return SchedualManager;
}());
exports.default = SchedualManager;
