/// <reference types="node" />
import { Schedual } from "./Schedual";
import { EventEmitter } from "events";
export declare class EmptySchedual extends Schedual {
    constructor(tags: string[], defaultNextSchedualTag: string, schedualEndEvent: EventEmitter);
    get currentName(): string | undefined;
    get currentTimeLeft(): [number, number, number] | undefined | string;
}
