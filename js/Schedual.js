"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedual = void 0;
const TimeSlot_1 = require("./TimeSlot");
const luxon_1 = require("luxon");
const events_1 = require("events");
const PassingTimeSlot_1 = require("./PassingTimeSlot");
let now = () => {
    return luxon_1.DateTime.local();
};
class Schedual {
    //Out of bounds is the timeslot after the schedual is over
    constructor(settings, schedualEndEvent) {
        this.timeSlots = Array();
        this.settings = Array();
        this.currentSlot = null;
        this.outOfBoundsSlot = null;
        this.outOfBoundsSettings = null;
        this.beforeOutOfBoundsSettings = null;
        this._sSettings = settings;
        this.schedualEndEvent = schedualEndEvent;
        this.settings = settings.timeSlots;
        this._tags = settings.tags;
        this.nextSlot = new events_1.EventEmitter();
        //Ran when Timeslot ends
        this.nextSlot.on("end", () => {
            this.initiateNextTimeSlot();
        });
        this.settings.map((setting, i) => {
            switch (setting.type) {
                case TimeSlot_1.SLOT_TYPES.PASSING:
                    this.timeSlots.push(new PassingTimeSlot_1.PassingTimeSlot(setting, this.settings[i + 1], this.nextSlot));
                    break;
                default:
                    this.timeSlots.push(new TimeSlot_1.TimeSlot(setting, this.nextSlot));
                    break;
            }
        });
    }
    //Finds the current Timeslot Index based on the time, if it is out of schedual bounds it returns -1
    getCurrentTimeSlotIndex() {
        let r = -1;
        this.settings.map((setting, i) => {
            if ((setting.begin[0] < now().hour ||
                (setting.begin[1] <= now().minute &&
                    setting.begin[0] == now().hour)) &&
                (setting.end[0] > now().hour ||
                    (setting.end[1] > now().minute && setting.end[0] == now().hour))) {
                r = i;
            }
        });
        if (r == -1) {
            if (this.settings[0].begin[0] > now().hour ||
                (this.settings[0].begin[1] > now().minute &&
                    this.settings[0].begin[0] == now().hour)) {
                r = -2;
            }
        }
        return r;
    }
    //Returns time since the beginning of the i index
    getShift(i) {
        let slot;
        if (i == -1) {
            slot = this.outOfBoundsSettings;
        }
        else if (i == -2) {
            slot = this.beforeOutOfBoundsSettings;
        }
        else {
            slot = this.settings[i];
        }
        let shift = luxon_1.DateTime.local().diff(luxon_1.DateTime.fromObject({
            hour: slot.begin[0],
            minute: slot.begin[1],
            second: 0,
        }));
        return shift.as("millisecond");
    }
    initiateCurrentTimeSlot(outOfBounds) {
        this.outOfBoundsSettings = outOfBounds;
        this.outOfBoundsSlot = new TimeSlot_1.TimeSlot(outOfBounds, this.schedualEndEvent);
        this.initiateNextTimeSlot();
        //Add other inital conditions if needed here
    }
    initiateNextTimeSlot() {
        let timeSlotIndex = this.getCurrentTimeSlotIndex();
        //Out of bound case
        if (timeSlotIndex == -1) {
            this.currentSlot = this.outOfBoundsSlot;
        }
        else if (timeSlotIndex == -2) {
            this.beforeOutOfBoundsSettings = {
                begin: [0, 0],
                end: this.settings[0].begin,
                name: "N/A",
            };
            this.currentSlot = new TimeSlot_1.TimeSlot(this.beforeOutOfBoundsSettings, this.schedualEndEvent);
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
    getCurrentIndex() {
        return this.getCurrentTimeSlotIndex();
    }
    nextName(nextOutOfBounds) {
        //Out of bounds case
        if (this.getCurrentTimeSlotIndex() == -1) {
            return nextOutOfBounds;
        }
        if (this.getCurrentTimeSlotIndex() == -2) {
            return this.timeSlots[0].name;
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
        this.outOfBoundsSlot = new TimeSlot_1.TimeSlot(outOfBoundsSettings, this.schedualEndEvent);
    }
}
exports.Schedual = Schedual;
