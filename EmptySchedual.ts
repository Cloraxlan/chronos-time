import { SchedualSettings, Schedual } from "./Schedual";
import { EventEmitter } from "events";
import { TimeSlot } from "./TimeSlot";
const emptySettings: SchedualSettings = {
  timeSlots: [{ name: "", begin: [0 + 0, 0], end: [12 + 12, 0] }],
  outOfBoundsName: "",
  tags: [],
  defaultNextSchedualTag: "",
};
let generateEmptySetting = (
  tags: string[],
  defaultNextSchedualTag: string
): SchedualSettings => {
  let newEmpty = emptySettings;
  newEmpty.defaultNextSchedualTag = defaultNextSchedualTag;
  newEmpty.tags = tags;
  return newEmpty;
};
export class EmptySchedual extends Schedual {
  constructor(
    tags: string[],
    defaultNextSchedualTag: string,
    schedualEndEvent: EventEmitter
  ) {
    super(generateEmptySetting(tags, defaultNextSchedualTag), schedualEndEvent);
  }
  public get currentName(): string | undefined {
    return "N/A";
  }
  public get currentTimeLeft(): [number, number, number] | undefined | string {
    return "No schedule for today";
  }
}
