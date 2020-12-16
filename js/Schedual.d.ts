/// <reference types="node" />
import { TimeSlotSettings, TimeSlot } from "./TimeSlot";
import { EventEmitter } from "events";
export declare class Schedual {
    private timeSlots;
    private settings;
    private currentSlot;
    private nextSlot;
    private outOfBoundsSlot;
    private outOfBoundsSettings;
    private _tags;
    private beforeOutOfBoundsSettings;
    private schedualEndEvent;
    private _sSettings;
    constructor(settings: SchedualSettings, schedualEndEvent: EventEmitter);
    private getCurrentTimeSlotIndex;
    private getShift;
    initiateCurrentTimeSlot(outOfBounds: TimeSlotSettings): void;
    private initiateNextTimeSlot;
    get currentTimeLeft(): [number, number, number] | undefined | string;
    get currentName(): string | undefined;
    get currentTimeSlot(): TimeSlot | null;
    get tags(): String[];
    get sSettings(): SchedualSettings;
    nextName(nextOutOfBounds: string): string;
    purify(): void;
    set outOfBounds(outOfBoundsSettings: TimeSlotSettings);
}
export interface SchedualSettings {
    tags: string[];
    timeSlots: TimeSlotSettings[];
    outOfBoundsName: string;
    defaultNextSchedualTag: string;
    metadata?: any;
}
