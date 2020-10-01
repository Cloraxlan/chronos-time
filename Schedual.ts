import TimeSlot, { TimeSlotSettings } from "./TimeSlot";
import { DateTime, Duration } from "luxon";
import { EventEmitter } from "events";
export default class Schedual {
  private timeSlots = Array<TimeSlot>();
  private settings = Array<TimeSlotSettings>();
  private currentSlot: TimeSlot | null = null;
  private nextSlot: EventEmitter;
  private outOfBoundsSlot: TimeSlot;
  private outOfBoundsSettings: TimeSlotSettings;
  private _tags: string[];
  //Out of bounds is the timeslot after the schedual is over
  constructor(settings: SchedualSettings, schedualEndEvent: EventEmitter) {
    this.settings = settings.timeSlots;
    this._tags = settings.tags;
    this.nextSlot = new EventEmitter();
    //Ran when Timeslot ends
    this.nextSlot.on("end", () => {
      this.initiateNextTimeSlot();
    });
    this.settings.map((setting) => {
      this.timeSlots.push(new TimeSlot(setting, this.nextSlot));
    });
    this.outOfBoundsSettings = settings.outOfBounds;
    this.outOfBoundsSlot = new TimeSlot(settings.outOfBounds, schedualEndEvent);
  }
  //Finds the current Timeslot Index based on the time, if it is out of schedual bounds it returns -1
  private getCurrentTimeSlotIndex(): number {
    let r = -1;
    this.settings.map((setting, i) => {
      if (
        (setting.begin[0] < DateTime.local().hour ||
          (setting.begin[1] <= DateTime.local().minute &&
            setting.begin[0] == DateTime.local().hour)) &&
        (setting.end[0] > DateTime.local().hour ||
          (setting.end[1] > DateTime.local().minute &&
            setting.end[0] == DateTime.local().hour))
      ) {
        r = i;
      }
    });
    return r;
  }
  //Returns time since the beginning of the i index
  private getShift(i: number): number {
    let slot: TimeSlotSettings;
    if (i == -1) {
      slot = this.outOfBoundsSettings;
    } else {
      slot = this.settings[i];
    }
    let shift: Duration = DateTime.local().diff(
      DateTime.fromObject({
        hour: slot.begin[0],
        minute: slot.begin[1],
        second: 0,
      })
    );
    return shift.as("millisecond");
  }
  public initiateCurrentTimeSlot() {
    this.initiateNextTimeSlot();
    //Add other inital conditions if needed here
  }
  private initiateNextTimeSlot() {
    let timeSlotIndex: number = this.getCurrentTimeSlotIndex();
    //Out of bound case
    if (timeSlotIndex == -1) {
      this.currentSlot = this.outOfBoundsSlot;
    } else {
      this.currentSlot = this.timeSlots[timeSlotIndex];
    }
    this.currentSlot.startTimeSlot(this.getShift(timeSlotIndex));
  }
  public get currentTimeSlot(): TimeSlot | null {
    return this.currentSlot;
  }
  public get tags(): String[] {
    return this._tags;
  }
  //Cleans up when next schedual starts
  public purify() {
    this.currentSlot = null;
  }
}
//Tags are the possible weekdays or special events that trigger that schedual to happen
//Time slots are each class
//Out of bounds is what is the active TimeSlot in between scheduals
export interface SchedualSettings {
  tags: string[];
  timeSlots: TimeSlotSettings[];
  outOfBounds: TimeSlotSettings;
}
