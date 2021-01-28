import { SchedualManager } from "./SchedualManager";
import { SchedualSettings } from ".";
export declare class ExternalSchedualLoader extends SchedualManager {
    private _getSchedualURL;
    private _pingSchedualURL;
    private _manager;
    private testing;
    constructor(getSchedualURL: string, pingSchedualURL: string);
    private asyncSetup;
    private readData;
    private getTodayTommorow;
    get currentTimeLeft(): string | [number, number, number] | undefined;
    get currentName(): string | undefined;
    get nextName(): string | undefined;
    get currentTag(): string;
    getMetadata(): any;
    getTimeSlotMetaData(): any;
    getSchedualStatus(): [SchedualSettings, number];
}
