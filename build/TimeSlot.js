"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLOT_TYPES = void 0;
var luxon_1 = require("luxon");
var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var TimeSlot = /** @class */ (function () {
    //Shift is the time in miliseconds after period starts
    function TimeSlot(setting, after) {
        this._duration = null;
        this._length = this.getLength(setting.begin, setting.end);
        this._name = setting.name;
        this._after = after;
    }
    TimeSlot.prototype.getLength = function (begin, end) {
        var addDays = 0;
        if (end[0] < begin[0] || (end[1] <= begin[1] && end[0] == begin[0])) {
            addDays += hour * 24;
        }
        return (end[0] * hour +
            end[1] * minute -
            (begin[0] * hour + begin[1] * minute) +
            addDays);
    };
    //Starts the period at the moment ran
    TimeSlot.prototype.startTimeSlot = function (shift) {
        if (shift === void 0) { shift = 0; }
        var trueLength = this._length - shift;
        this._duration = luxon_1.Interval.after(new Date(), trueLength);
        this.activateTimer(trueLength);
    };
    //Ends the period
    TimeSlot.prototype.activateTimer = function (length) {
        var _this = this;
        setTimeout(function () {
            _this._after.emit("end");
        }, length);
    };
    //Returns the time the TimeSlot ends
    //If it was not started or already ended returns null
    TimeSlot.prototype.endingAt = function () {
        if (this._duration) {
            return this._duration.end;
        }
        return null;
    };
    //Returns the time left to end of Timeslot in hour minute second tuple
    //If it was not started or already ended returns 0
    TimeSlot.prototype.timeLeft = function () {
        var _a;
        var endingDiff = (_a = this._duration) === null || _a === void 0 ? void 0 : _a.end.diffNow();
        var r = [0, 0, 0];
        if (endingDiff) {
            r[0] = Math.floor(endingDiff.as("hours"));
            endingDiff = endingDiff.minus(r[0] * hour);
            r[1] = Math.floor(endingDiff.as("minutes"));
            endingDiff = endingDiff.minus(r[1] * minute);
            r[2] = Math.floor(endingDiff.as("seconds"));
            endingDiff = endingDiff.minus(r[2] * second);
            /*return [
              this._duration.end.diffNow("hour").minutes,
              this._duration.end.minute,
              this._duration.end.second,
            ];*/
        }
        return r;
    };
    Object.defineProperty(TimeSlot.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeSlot.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeSlot.prototype, "after", {
        get: function () {
            return this._after;
        },
        enumerable: false,
        configurable: true
    });
    return TimeSlot;
}());
exports.default = TimeSlot;
exports.SLOT_TYPES = {
    NORMAL: "normal",
    PASSING: "passing",
};
