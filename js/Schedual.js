import { SLOT_TYPES, TimeSlot } from "./TimeSlot";
import { DateTime } from "luxon";
import { EventEmitter } from "events";
import { PassingTimeSlot } from "./PassingTimeSlot";
export class Schedual {
    //Out of bounds is the timeslot after the schedual is over
    constructor(settings, schedualEndEvent) {
        this.timeSlots = Array();
        this.settings = Array();
        this.currentSlot = null;
        this.outOfBoundsSlot = null;
        this.outOfBoundsSettings = null;
        this._sSettings = settings;
        this.schedualEndEvent = schedualEndEvent;
        this.settings = settings.timeSlots;
        this._tags = settings.tags;
        this.nextSlot = new EventEmitter();
        //Ran when Timeslot ends
        this.nextSlot.on("end", () => {
            this.initiateNextTimeSlot();
        });
        this.settings.map((setting, i) => {
            switch (setting.type) {
                case SLOT_TYPES.PASSING:
                    this.timeSlots.push(new PassingTimeSlot(setting, this.settings[i + 1], this.nextSlot));
                    break;
                default:
                    this.timeSlots.push(new TimeSlot(setting, this.nextSlot));
                    break;
            }
        });
    }
    //Finds the current Timeslot Index based on the time, if it is out of schedual bounds it returns -1
    getCurrentTimeSlotIndex() {
        let r = -1;
        this.settings.map((setting, i) => {
            if ((setting.begin[0] < DateTime.local().hour ||
                (setting.begin[1] <= DateTime.local().minute &&
                    setting.begin[0] == DateTime.local().hour)) &&
                (setting.end[0] > DateTime.local().hour ||
                    (setting.end[1] > DateTime.local().minute &&
                        setting.end[0] == DateTime.local().hour))) {
                r = i;
            }
        });
        return r;
    }
    //Returns time since the beginning of the i index
    getShift(i) {
        let slot;
        if (i == -1) {
            slot = this.outOfBoundsSettings;
        }
        else {
            slot = this.settings[i];
        }
        let shift = DateTime.local().diff(DateTime.fromObject({
            hour: slot.begin[0],
            minute: slot.begin[1],
            second: 0,
        }));
        return shift.as("millisecond");
    }
    initiateCurrentTimeSlot(outOfBounds) {
        this.outOfBoundsSettings = outOfBounds;
        this.outOfBoundsSlot = new TimeSlot(outOfBounds, this.schedualEndEvent);
        this.initiateNextTimeSlot();
        //Add other inital conditions if needed here
    }
    initiateNextTimeSlot() {
        let timeSlotIndex = this.getCurrentTimeSlotIndex();
        //Out of bound case
        if (timeSlotIndex == -1) {
            this.currentSlot = this.outOfBoundsSlot;
        }
        else {
            this.currentSlot = this.timeSlots[timeSlotIndex];
        }
        this.currentSlot.startTimeSlot(this.getShift(timeSlotIndex));
    }
    get currentTimeLeft() {
        var _a;
        return (_a = this.currentSlot) === null || _a === void 0 ? void 0 : _a.timeLeft();
    }
    get currentName() {
        var _a;
        return (_a = this.currentSlot) === null || _a === void 0 ? void 0 : _a.name;
    }
    get currentTimeSlot() {
        return this.currentSlot;
    }
    get tags() {
        return this._tags;
    }
    get sSettings() {
        return this._sSettings;
    }
    nextName(nextOutOfBounds) {
        //Out of bounds case
        if (this.getCurrentTimeSlotIndex() == -1) {
            return nextOutOfBounds;
        }
        let nextTimeSlot = this.timeSlots[this.getCurrentTimeSlotIndex() + 1];
        if (nextTimeSlot) {
            return nextTimeSlot.name;
        }
        return "N/A";
    }
    //Cleans up when next schedual starts
    purify() {
        this.currentSlot = null;
    }
    set outOfBounds(outOfBoundsSettings) {
        this.outOfBoundsSettings = outOfBoundsSettings;
        this.outOfBoundsSlot = new TimeSlot(outOfBoundsSettings, this.schedualEndEvent);
    }
}
