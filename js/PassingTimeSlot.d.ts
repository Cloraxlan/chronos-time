/// <reference types="node" />
import { TimeSlotSettings, TimeSlot } from "./TimeSlot";
import { EventEmitter } from "events";
export declare class PassingTimeSlot extends TimeSlot {
    private _timeSlot;
    private _timeSlotAfter;
    private _active;
    constructor(timeSlot: TimeSlotSettings, timeSlotAfter: TimeSlotSettings, after: EventEmitter);
    startTimeSlot(shift?: number): void;
    private getNameOfTimeSlotAfter;
    activateTimer(length: number): void;
}
