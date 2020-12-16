/// <reference types="node" />
import { DateTime } from "luxon";
import { EventEmitter } from "events";
export declare class TimeSlot {
    private _length;
    private _duration;
    private _name;
    private _after;
    private metadata;
    constructor(setting: TimeSlotSettings, after: EventEmitter);
    private getLength;
    startTimeSlot(shift?: number): void;
    activateTimer(length: number): void;
    endingAt(): DateTime | null;
    private timeLeftCalc;
    timeLeft(): [number, number, number];
    get length(): number;
    get name(): string;
    set name(name: string);
    get after(): EventEmitter;
    getMetadata(): any;
}
export interface TimeSlotSettings {
    name: string;
    begin: [number, number];
    end: [number, number];
    type?: "normal" | "passing";
    metadata?: any;
}
export declare const SLOT_TYPES: {
    NORMAL: string;
    PASSING: string;
};
