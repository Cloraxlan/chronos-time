import { Interval } from "luxon";
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
export class TimeSlot {
    //Shift is the time in miliseconds after period starts
    constructor(setting, after) {
        this._duration = null;
        this._length = this.getLength(setting.begin, setting.end);
        this._name = setting.name;
        this._after = after;
    }
    getLength(begin, end) {
        let addDays = 0;
        if (end[0] < begin[0] || (end[1] <= begin[1] && end[0] == begin[0])) {
            addDays += hour * 24;
        }
        return (end[0] * hour +
            end[1] * minute -
            (begin[0] * hour + begin[1] * minute) +
            addDays);
    }
    //Starts the period at the moment ran
    startTimeSlot(shift = 0) {
        let trueLength = this._length - shift;
        this._duration = Interval.after(new Date(), trueLength);
        this.activateTimer(trueLength);
    }
    //Ends the period
    activateTimer(length) {
        setTimeout(() => {
            this._after.emit("end");
        }, length);
    }
    //Returns the time the TimeSlot ends
    //If it was not started or already ended returns null
    endingAt() {
        if (this._duration) {
            return this._duration.end;
        }
        return null;
    }
    //Returns the time left to end of Timeslot in hour minute second tuple
    //If it was not started or already ended returns 0
    timeLeft() {
        var _a;
        let endingDiff = (_a = this._duration) === null || _a === void 0 ? void 0 : _a.end.diffNow();
        let r = [0, 0, 0];
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
    }
    get length() {
        return this._length;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get after() {
        return this._after;
    }
}
export const SLOT_TYPES = {
    NORMAL: "normal",
    PASSING: "passing",
};
