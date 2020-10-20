import { TimeSlot } from "./TimeSlot";
export class PassingTimeSlot extends TimeSlot {
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
