import TimeSlot, { TimeSlotSettings } from "./TimeSlot";
import { EventEmitter } from "events";
export default class PassingTimeSlot extends TimeSlot {
  private _timeSlot: TimeSlotSettings;
  private _timeSlotAfter: TimeSlotSettings;
  private _active: boolean;
  constructor(
    timeSlot: TimeSlotSettings,
    timeSlotAfter: TimeSlotSettings,
    after: EventEmitter
  ) {
    super(timeSlot, after);
    this._timeSlot = timeSlot;
    this._timeSlotAfter = timeSlotAfter;
    this.name = this.getNameOfTimeSlotAfter();
    this._active = false;
  }
  public startTimeSlot(shift: number = 0) {
    super.startTimeSlot(shift);
    this.name = this._timeSlot.name;
  }
  private getNameOfTimeSlotAfter(): string {
    if (this._timeSlotAfter) {
      return this._timeSlotAfter.name;
    }
    return "N/A";
  }
  public activateTimer(length: number) {
    setTimeout(() => {
      this.after.emit("end");
      this.name = this.getNameOfTimeSlotAfter();
    }, length);
  }
}
