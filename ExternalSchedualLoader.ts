import { SchedualManager } from "./SchedualManager";
import refetch from "@hazelee/refetch";
import { SchedualSettings } from ".";
import { settings } from "cluster";

export class ExternalSchedualLoader extends SchedualManager{
  private _getSchedualURL: any;
  private _pingSchedualURL: any;
  private _manager: boolean
  private testing: boolean = false;
  constructor(
    getSchedualURL: string,
    pingSchedualURL: string,
  ) {
    super([],()=>{})
    this._getSchedualURL = getSchedualURL;
    this._pingSchedualURL = pingSchedualURL;
    this.asyncSetup(getSchedualURL, pingSchedualURL); 
      
  }
  private async asyncSetup(getSchedualURL, pingSchedualURL){
    let sSettings: SchedualSettings[] = await this.readData(getSchedualURL);
    super.asyncConstruct(sSettings, () => {
      this.getTodayTommorow().then((todayTommorow: [string, string]) => {
          if(this._manager){
            super.goToSchedual(todayTommorow[0]);
          super.setNextTag = todayTommorow[1];
          }
          
          
        
      })})
      console.log(super.currentName)

      this.getTodayTommorow().then((todayTommorow: [string, string]) => {
        super.goToSchedual(todayTommorow[0]);
          super.setNextTag = todayTommorow[1];
          this._manager = true;

      })

  }
  private async readData(getSchedualURL : string): Promise<SchedualSettings[]>{
    return await refetch(getSchedualURL)
        .json()
        .then((data) => {
          return data.scheduals;
          /*this._manager = new SchedualManager(data.scheduals, () => {
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
          });*/
        });
  }
  private getTodayTommorow(): Promise<[string, string]> {
    
      return refetch(this._pingSchedualURL)
        .json()
        .then((data) => {
          return [data.today, data.tommorow];
        });
    
  }
  public get currentTimeLeft(): string | [number, number, number] | undefined {
    if (this._manager) {
      return super.currentTimeLeft;
    }
    return "N/A";
  }
  public get currentName(): string | undefined {
    if (this._manager) {
      return super.currentName;
    }
    return "N/A";
  }
  public get nextName(): string | undefined {
    if (this._manager) {
      return super.nextName;
    }
    return "N/A";
  }
  public get currentTag(): string {
    if (this._manager) {
      return super.currentTag;
    }
    return "N/A";
  }
  public getMetadata() {
    return super.schedualMetadata;
  }
  public getTimeSlotMetaData() {
    return super.timeSlotMetadata;
  }
  public getSchedualStatus(): [SchedualSettings, number] {
    return super.getSchedualStatus();
  }
}
