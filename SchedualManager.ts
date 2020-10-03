import TimeSlot, { TimeSlotSettings } from "./TimeSlot";
import Schedual, { SchedualSettings } from "./Schedual";
import { EventEmitter } from "events";
import { settings } from "cluster";
import EmptySchedual from "./EmptySchedual";
export default class SchedualManager {
  private _currentTag: string = "";
  private _nextTag: string = "";
  private _scheduals: Array<Schedual> = [];
  private _currentSchedual: Schedual | null = null;
  private nextSchedual: EventEmitter;
  private _settings: SchedualSettings[];
  private _currentSettingIndex: number = 0;
  constructor(scheduals: SchedualSettings[]) {
    this._settings = scheduals;
    this.nextSchedual = new EventEmitter();
    this.nextSchedual.on("end", () => {
      this.goToNextSchedual();
    });
    scheduals.map((schedual, i) => {
      if (schedual.timeSlots.length == 0) {
        let empty = new EmptySchedual(
          schedual.tags,
          schedual.defaultNextSchedualTag,
          this.nextSchedual
        );
        this._scheduals.push(empty);
        scheduals[i] = empty.sSettings;
      } else {
        this._scheduals.push(new Schedual(schedual, this.nextSchedual));
      }
    });
  }
  //Finds index of Schedual based on given tag or returns -1 if not found
  private getSchedualIndexBasedOnTag(tag: string): number {
    let r = -1;
    this._scheduals.map((schedual: Schedual, i) => {
      schedual.tags.map((testTag: String) => {
        if (testTag == tag) {
          r = i;
        }
      });
    });
    return r;
  }
  set setNextTag(tag: string) {
    this._nextTag = tag;
    if (this._currentSchedual) {
      this._currentSchedual.purify();
      this._currentSchedual.initiateCurrentTimeSlot(
        this.generateOutOfBounds(this._currentSettingIndex)
      );
    }
  }
  //Go to schedual based on _nextTag
  public goToNextSchedual() {
    this.goToSchedual(this._nextTag);
  }
  //i is the index of current schedual
  private generateOutOfBounds(i: number): TimeSlotSettings {
    if (this._nextTag) {
    }
    return {
      begin: this._settings[i].timeSlots[this._settings[i].timeSlots.length - 1]
        .end,
      end: this._settings[this.getSchedualIndexBasedOnTag(this._nextTag)]
        .timeSlots[0].begin,
      name: this._settings[i].outOfBoundsName,
    };
  }
  //Go to schedual based on tag
  public goToSchedual(tag: string) {
    //Gets rid of chance of nextSchedual emitter from being activated
    if (this._currentSchedual) {
      this._currentSchedual.purify();
    }
    let schedualIndex = this.getSchedualIndexBasedOnTag(tag);
    this._currentSchedual = this._scheduals[schedualIndex];
    this._currentSettingIndex = schedualIndex;
    this._currentTag = tag;
    this._nextTag = this._settings[schedualIndex].defaultNextSchedualTag;
    this._currentSchedual.initiateCurrentTimeSlot(
      this.generateOutOfBounds(schedualIndex)
    );
  }
  private get currentTimeSlot(): TimeSlot | null {
    if (this._currentSchedual) {
      let currentTimeSlot: TimeSlot | null = this._currentSchedual
        .currentTimeSlot;
      if (currentTimeSlot) {
        return currentTimeSlot;
      }
      console.log("No valid time found based on tags");
      return null;
    }
    console.log("No valid schedual found based on tags");
    return null;
  }
  public get currentTag(): string {
    return this._currentTag;
  }
  public get currentName(): string | undefined {
    return this._currentSchedual?.currentName;
  }
  public get nextName(): string | undefined {
    return this._currentSchedual?.nextName;
  }
  public get currentTimeLeft(): string | [number, number, number] | undefined {
    return this._currentSchedual?.currentTimeLeft;
  }
  public get nextTag(): string {
    return this._nextTag;
  }
}
