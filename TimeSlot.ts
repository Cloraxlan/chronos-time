import { Interval, DateTime, Duration } from "luxon";
import { EventEmitter } from "events";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export default class TimeSlot {
  private _length: number;
  private _duration: Interval | null = null;
  private _name: string;
  private _after: EventEmitter;
  //Shift is the time in miliseconds after period starts
  constructor(setting: TimeSlotSettings, after: EventEmitter) {
    this._length = this.getLength(setting.begin, setting.end);
    this._name = setting.name;
    this._after = after;
  }
  private getLength(begin: [number, number], end: [number, number]) {
    let addDays = 0;
    if (end[0] < begin[0] || (end[1] <= begin[1] && end[0] == begin[0])) {
      addDays += hour * 24;
    }
    return (
      end[0] * hour +
      end[1] * minute -
      (begin[0] * hour + begin[1] * minute) +
      addDays
    );
  }
  //Starts the period at the moment ran
  public startTimeSlot(shift: number = 0) {
    let trueLength: number = this._length - shift;
    this._duration = Interval.after(new Date(), trueLength);
    this.activateTimer(trueLength);
  }
  //Ends the period
  public activateTimer(length: number) {
    setTimeout(() => {
      this._after.emit("end");
    }, length);
  }
  //Returns the time the TimeSlot ends
  //If it was not started or already ended returns null
  public endingAt(): DateTime | null {
    if (this._duration) {
      return this._duration.end;
    }
    return null;
  }
  //Returns the time left to end of Timeslot in hour minute second tuple
  //If it was not started or already ended returns 0
  public timeLeft(): [number, number, number] {
    let endingDiff: Duration | undefined = this._duration?.end.diffNow();
    let r: [number, number, number] = [0, 0, 0];
    if (endingDiff) {
      r[0] = Math.floor(endingDiff.as("hours"));
      endingDiff = endingDiff.minus(r[0] * hour);
      r[1] = Math.floor(endingDiff.as("minutes"));
      endingDiff = endingDiff.minus(r[1] * minute);
      r[2] = Math.floor(endingDiff.as("seconds"));
      endingDiff = endingDiff.minus(r[2] * second);

      /*return [
        this._duration.end.diffNow("hour").minutes,
        this._duration.end.minute,
        this._duration.end.second,
      ];*/
    }
    return r;
  }
  get length(): number {
    return this._length;
  }
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
  get after(): EventEmitter {
    return this._after;
  }
}
//Used to construct TimeSlot
//Begin and end use military time
export interface TimeSlotSettings {
  name: string;
  begin: [number, number];
  end: [number, number];
  type?: "normal" | "passing";
}
export const SLOT_TYPES = {
  NORMAL: "normal",
  PASSING: "passing",
};
