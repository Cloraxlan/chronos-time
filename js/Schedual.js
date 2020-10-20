"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedual = void 0;
var TimeSlot_1 = require("./TimeSlot");
var luxon_1 = require("luxon");
var events_1 = require("events");
var PassingTimeSlot_1 = require("./PassingTimeSlot");
var Schedual = /** @class */ (function () {
    //Out of bounds is the timeslot after the schedual is over
    function Schedual(settings, schedualEndEvent) {
        var _this = this;
        this.timeSlots = Array();
        this.settings = Array();
        this.currentSlot = null;
        this.outOfBoundsSlot = null;
        this.outOfBoundsSettings = null;
        this._sSettings = settings;
        this.schedualEndEvent = schedualEndEvent;
        this.settings = settings.timeSlots;
        this._tags = settings.tags;
        this.nextSlot = new events_1.EventEmitter();
        //Ran when Timeslot ends
        this.nextSlot.on("end", function () {
            _this.initiateNextTimeSlot();
        });
        this.settings.map(function (setting, i) {
            switch (setting.type) {
                case TimeSlot_1.SLOT_TYPES.PASSING:
                    _this.timeSlots.push(new PassingTimeSlot_1.PassingTimeSlot(setting, _this.settings[i + 1], _this.nextSlot));
                    break;
                default:
                    _this.timeSlots.push(new TimeSlot_1.TimeSlot(setting, _this.nextSlot));
                    break;
            }
        });
    }
    //Finds the current Timeslot Index based on the time, if it is out of schedual bounds it returns -1
    Schedual.prototype.getCurrentTimeSlotIndex = function () {
        var r = -1;
        this.settings.map(function (setting, i) {
            if ((setting.begin[0] < luxon_1.DateTime.local().hour ||
                (setting.begin[1] <= luxon_1.DateTime.local().minute &&
                    setting.begin[0] == luxon_1.DateTime.local().hour)) &&
                (setting.end[0] > luxon_1.DateTime.local().hour ||
                    (setting.end[1] > luxon_1.DateTime.local().minute &&
                        setting.end[0] == luxon_1.DateTime.local().hour))) {
                r = i;
            }
        });
        return r;
    };
    //Returns time since the beginning of the i index
    Schedual.prototype.getShift = function (i) {
        var slot;
        if (i == -1) {
            slot = this.outOfBoundsSettings;
        }
        else {
            slot = this.settings[i];
        }
        var shift = luxon_1.DateTime.local().diff(luxon_1.DateTime.fromObject({
            hour: slot.begin[0],
            minute: slot.begin[1],
            second: 0,
        }));
        return shift.as("millisecond");
    };
    Schedual.prototype.initiateCurrentTimeSlot = function (outOfBounds) {
        this.outOfBoundsSettings = outOfBounds;
        this.outOfBoundsSlot = new TimeSlot_1.TimeSlot(outOfBounds, this.schedualEndEvent);
        this.initiateNextTimeSlot();
        //Add other inital conditions if needed here
    };
    Schedual.prototype.initiateNextTimeSlot = function () {
        var timeSlotIndex = this.getCurrentTimeSlotIndex();
        //Out of bound case
        if (timeSlotIndex == -1) {
            this.currentSlot = this.outOfBoundsSlot;
        }
        else {
            this.currentSlot = this.timeSlots[timeSlotIndex];
        }
        this.currentSlot.startTimeSlot(this.getShift(timeSlotIndex));
    };
    Object.defineProperty(Schedual.prototype, "currentTimeLeft", {
        get: function () {
            var _a;
            return (_a = this.currentSlot) === null || _a === void 0 ? void 0 : _a.timeLeft();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schedual.prototype, "currentName", {
        get: function () {
            var _a;
            return (_a = this.currentSlot) === null || _a === void 0 ? void 0 : _a.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schedual.prototype, "currentTimeSlot", {
        get: function () {
            return this.currentSlot;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schedual.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schedual.prototype, "sSettings", {
        get: function () {
            return this._sSettings;
        },
        enumerable: false,
        configurable: true
    });
    Schedual.prototype.nextName = function (nextOutOfBounds) {
        //Out of bounds case
        if (this.getCurrentTimeSlotIndex() == -1) {
            return nextOutOfBounds;
        }
        var nextTimeSlot = this.timeSlots[this.getCurrentTimeSlotIndex() + 1];
        if (nextTimeSlot) {
            return nextTimeSlot.name;
        }
        return "N/A";
    };
    //Cleans up when next schedual starts
    Schedual.prototype.purify = function () {
        this.currentSlot = null;
    };
    Object.defineProperty(Schedual.prototype, "outOfBounds", {
        set: function (outOfBoundsSettings) {
            this.outOfBoundsSettings = outOfBoundsSettings;
            this.outOfBoundsSlot = new TimeSlot_1.TimeSlot(outOfBoundsSettings, this.schedualEndEvent);
        },
        enumerable: false,
        configurable: true
    });
    return Schedual;
}());
exports.Schedual = Schedual;
