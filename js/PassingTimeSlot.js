"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassingTimeSlot = void 0;
const TimeSlot_1 = require("./TimeSlot");
class PassingTimeSlot extends TimeSlot_1.TimeSlot {
    constructor(timeSlot, timeSlotAfter, after) {
        super(timeSlot, after);
        this._timeSlot = timeSlot;
        this._timeSlotAfter = timeSlotAfter;
        this.name = this.getNameOfTimeSlotAfter();
        this._active = false;
    }
    startTimeSlot(shift = 0) {
        super.startTimeSlot(shift);
        this.name = this._timeSlot.name;
    }
    getNameOfTimeSlotAfter() {
        if (this._timeSlotAfter) {
            return this._timeSlotAfter.name;
        }
        return "N/A";
    }
    activateTimer(length) {
        setTimeout(() => {
            this.after.emit("end");
            this.name = this.getNameOfTimeSlotAfter();
        }, length);
    }
}
exports.PassingTimeSlot = PassingTimeSlot;
