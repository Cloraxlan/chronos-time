import { SchedualManager } from "./SchedualManager";
import refetch from '@hazelee/refetch'

export class ExternalSchedualLoader {
  private _getSchedualURL: string;
  private _pingSchedualURL: string;
  private _manager: SchedualManager | null = null;
  constructor(getSchedualURL: string, pingSchedualURL: string) {
    this._getSchedualURL = getSchedualURL;
    this._pingSchedualURL = pingSchedualURL;
    refetch(this._getSchedualURL).json().then((data) => {
        this._manager = new SchedualManager(data.scheduals, () => {
          this.getTodayTommorow().then((todayTommorow: [string, string]) => {
            if (this._manager) {
              this._manager.goToSchedual(todayTommorow[0]);
              this._manager.setNextTag = todayTommorow[1];
            }
          });
        });
        this.getTodayTommorow().then((todayTommorow: [string, string]) => {
          if (this._manager) {
            this._manager.goToSchedual(todayTommorow[0]);
            this._manager.setNextTag = todayTommorow[1];
          }
        });
      
    });
  }
  private getTodayTommorow(): Promise<[string, string]> {
    return refetch(this._pingSchedualURL).json().then((data) => {
      
        return [data.today, data.tommorow];
      
    });
  }
  public get currentTimeLeft(): string | [number, number, number] | undefined {
    if (this._manager) {
      return this._manager.currentTimeLeft;
    }
    return "N/A";
  }
  public get currentName(): string | undefined {
    if (this._manager) {
      return this._manager.currentName;
    }
    return "N/A";
  }
  public get nextName(): string | undefined {
    if (this._manager) {
      return this._manager.nextName;
    }
    return "N/A";
  }
  public get currentTag(): string {
    if (this._manager) {
      return this._manager.currentTag;
    }
    return "N/A";
  }
}
