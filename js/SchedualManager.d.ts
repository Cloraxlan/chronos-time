import { SchedualSettings } from "./Schedual";
export declare class SchedualManager {
    private _currentTag;
    private _nextTag;
    private _scheduals;
    private _currentSchedual;
    private nextSchedual;
    private _settings;
    private _currentSettingIndex;
    constructor(scheduals: SchedualSettings[], onSchedualEnd: () => void);
    asyncConstruct(scheduals: SchedualSettings[], onSchedualEnd: () => void): void;
    private getSchedualIndexBasedOnTag;
    set setNextTag(tag: string);
    goToNextSchedual(): void;
    private generateOutOfBounds;
    goToSchedual(tag: string): void;
    private get currentTimeSlot();
    get currentTag(): string;
    get currentName(): string | undefined;
    get nextName(): string | undefined;
    get currentTimeLeft(): string | [number, number, number] | undefined;
    get nextTag(): string;
    get schedualMetadata(): any;
    get timeSlotMetadata(): any;
    getSchedualStatus(): [SchedualSettings, number];
}
