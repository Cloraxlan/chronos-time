/// <reference types="node" />
import TimeSlot, { TimeSlotSettings } from "./TimeSlot";
import { EventEmitter } from "events";
export default class PassingTimeSlot extends TimeSlot {
    private _timeSlot;
    private _timeSlotAfter;
    private _active;
    constructor(timeSlot: TimeSlotSettings, timeSlotAfter: TimeSlotSettings, after: EventEmitter);
    startTimeSlot(shift?: number): void;
    private getNameOfTimeSlotAfter;
    activateTimer(length: number): void;
}
