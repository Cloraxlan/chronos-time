import { TimeSlotSettings, SLOT_TYPES, TimeSlot } from "./TimeSlot";
import { DateTime, Duration } from "luxon";
import { EventEmitter } from "events";
import { PassingTimeSlot } from "./PassingTimeSlot";
let now: () => DateTime = () => {
  return DateTime.local();
};
export class Schedual {
  private timeSlots = Array<TimeSlot>();
  private settings = Array<TimeSlotSettings>();
  private currentSlot: TimeSlot | null = null;
  private nextSlot: EventEmitter;
  private outOfBoundsSlot: TimeSlot | null = null;
  private outOfBoundsSettings: TimeSlotSettings | null = null;
  private _tags: string[];
  private schedualEndEvent: EventEmitter;
  private _sSettings: SchedualSettings;
  //Out of bounds is the timeslot after the schedual is over
  constructor(settings: SchedualSettings, schedualEndEvent: EventEmitter) {
    this._sSettings = settings;
    this.schedualEndEvent = schedualEndEvent;
    this.settings = settings.timeSlots;
    this._tags = settings.tags;
    this.nextSlot = new EventEmitter();
    //Ran when Timeslot ends
    this.nextSlot.on("end", () => {
      this.initiateNextTimeSlot();
    });
    this.settings.map((setting, i) => {
      switch (setting.type) {
        case SLOT_TYPES.PASSING:
          this.timeSlots.push(
            new PassingTimeSlot(setting, this.settings[i + 1], this.nextSlot)
          );
          break;

        default:
          this.timeSlots.push(new TimeSlot(setting, this.nextSlot));
          break;
      }
    });
  }
  //Finds the current Timeslot Index based on the time, if it is out of schedual bounds it returns -1
  private getCurrentTimeSlotIndex(): number {
    let r = -1;
    this.settings.map((setting, i) => {
      if (
        (setting.begin[0] < now().hour ||
          (setting.begin[1] <= now().minute &&
            setting.begin[0] == now().hour)) &&
        (setting.end[0] > now().hour ||
          (setting.end[1] > now().minute && setting.end[0] == now().hour))
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
      slot = this.outOfBoundsSettings as TimeSlotSettings;
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
  public initiateCurrentTimeSlot(outOfBounds: TimeSlotSettings) {
    this.outOfBoundsSettings = outOfBounds;
    this.outOfBoundsSlot = new TimeSlot(outOfBounds, this.schedualEndEvent);
    this.initiateNextTimeSlot();
    //Add other inital conditions if needed here
  }
  private initiateNextTimeSlot() {
    let timeSlotIndex: number = this.getCurrentTimeSlotIndex();
    //Out of bound case
    if (timeSlotIndex == -1) {
      this.currentSlot = this.outOfBoundsSlot as TimeSlot;
    } else {
      this.currentSlot = this.timeSlots[timeSlotIndex];
    }
    this.currentSlot.startTimeSlot(this.getShift(timeSlotIndex));
  }
  public get currentTimeLeft(): [number, number, number] | undefined | string {
    return this.currentSlot?.timeLeft();
  }
  public get currentName(): string | undefined {
    return this.currentSlot?.name;
  }
  public get currentTimeSlot(): TimeSlot | null {
    return this.currentSlot;
  }
  public get tags(): String[] {
    return this._tags;
  }
  public get sSettings(): SchedualSettings {
    return this._sSettings;
  }
  public nextName(nextOutOfBounds: string): string {
    //Out of bounds case
    if (this.getCurrentTimeSlotIndex() == -1) {
      return nextOutOfBounds;
    }
    let nextTimeSlot: TimeSlot | undefined = this.timeSlots[
      this.getCurrentTimeSlotIndex() + 1
    ];
    if (nextTimeSlot) {
      return nextTimeSlot.name;
    }
    return "N/A";
  }
  //Cleans up when next schedual starts
  public purify() {
    this.currentSlot = null;
  }
  public set outOfBounds(outOfBoundsSettings: TimeSlotSettings) {
    this.outOfBoundsSettings = outOfBoundsSettings;
    this.outOfBoundsSlot = new TimeSlot(
      outOfBoundsSettings,
      this.schedualEndEvent
    );
  }
}
//Tags are the possible weekdays or special events that trigger that schedual to happen
//Time slots are each class
//Out of bounds is what is the active TimeSlot in between scheduals
export interface SchedualSettings {
  tags: string[];
  timeSlots: TimeSlotSettings[];
  outOfBoundsName: string;
  defaultNextSchedualTag: string;
}
