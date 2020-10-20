export declare class ExternalSchedualLoader {
    private _getSchedualURL;
    private _pingSchedualURL;
    private _manager;
    constructor(getSchedualURL: string, pingSchedualURL: string);
    private getTodayTommorow;
    get currentTimeLeft(): string | [number, number, number] | undefined;
    get currentName(): string | undefined;
    get nextName(): string | undefined;
    get currentTag(): string;
}
