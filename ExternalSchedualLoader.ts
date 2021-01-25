import { SchedualManager } from "./SchedualManager";
import refetch from "@hazelee/refetch";
import { SchedualSettings } from ".";

export class ExternalSchedualLoader {
  private _getSchedualURL: any;
  private _pingSchedualURL: any;
  private _manager: SchedualManager | null = null;
  private testing: boolean;
  constructor(
    getSchedualURL: any,
    pingSchedualURL: any,
    testing: boolean = false
  ) {
    this.testing = testing;
    this._getSchedualURL = getSchedualURL;
    this._pingSchedualURL = pingSchedualURL;
    if (!testing) {
      refetch(this._getSchedualURL)
        .json()
        .then((data) => {
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
    } else {
      this._manager = new SchedualManager(getSchedualURL, () => {
        this.getTodayTommorow().then((todayTommorow: [string, string]) => {
          if (this._manager) {
            this._manager.goToSchedual(todayTommorow[0]);
            this._manager.setNextTag = todayTommorow[1];
          }
        });
      });
      this.getTodayTommorow().then((todayTommorow: [string, string]) => {
        console.log("1!!" + todayTommorow);
        if (this._manager) {
          this._manager.goToSchedual(todayTommorow[0]);
          this._manager.setNextTag = todayTommorow[1];
        }
      });
      console.log(this.getTodayTommorow());
    }
  }
  private getTodayTommorow(): Promise<[string, string]> {
    if (!this.testing) {
      return refetch(this._pingSchedualURL)
        .json()
        .then((data) => {
          return [data.today, data.tommorow];
        });
    } else {
      return new Promise((resolve) => {
        resolve([
          this._pingSchedualURL.today as string,
          this._pingSchedualURL.tommorow as string,
        ]);
      });
    }
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
  public getMetadata() {
    return this._manager.schedualMetadata;
  }
  public getTimeSlotMetaData() {
    return this._manager.timeSlotMetadata;
  }
  public getSchedualStatus(): [SchedualSettings, number] {
    return this._manager.getSchedualStatus();
  }
}
