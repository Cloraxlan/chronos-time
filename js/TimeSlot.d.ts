/// <reference types="node" />
import { DateTime } from "luxon";
import { EventEmitter } from "events";
export default class TimeSlot {
    private _length;
    private _duration;
    private _name;
    private _after;
    constructor(setting: TimeSlotSettings, after: EventEmitter);
    private getLength;
    startTimeSlot(shift?: number): void;
    activateTimer(length: number): void;
    endingAt(): DateTime | null;
    timeLeft(): [number, number, number];
    get length(): number;
    get name(): string;
    set name(name: string);
    get after(): EventEmitter;
}
export interface TimeSlotSettings {
    name: string;
    begin: [number, number];
    end: [number, number];
    type?: "normal" | "passing";
}
export declare const SLOT_TYPES: {
    NORMAL: string;
    PASSING: string;
};
