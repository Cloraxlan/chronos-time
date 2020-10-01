import TimeSlot from "./TimeSlot";
import Schedual, { SchedualSettings } from "./Schedual";
import { DateTime } from "luxon";
import { EventEmitter } from "events";
import SchedualManager from "./SchedualManager";
let nextS = new EventEmitter();
let settings: SchedualSettings = {
  timeSlots: [
    { name: "class 1", begin: [4 + 12, 45], end: [4 + 12, 46] },
    { name: "class 2", begin: [4 + 12, 46], end: [4 + 12, 47] },
  ],
  outOfBounds: {
    name: "out of bounds",
    begin: [4 + 12, 47],
    end: [4 + 12, 48],
  },
  tags: ["monday"],
};
let settings2: SchedualSettings = {
  timeSlots: [{ name: "class 1", begin: [4 + 12, 48], end: [4 + 12, 49] }],
  outOfBounds: {
    name: "out of bounds",
    begin: [4 + 12, 49],
    end: [4 + 12, 59],
  },
  tags: ["tuesday"],
};
let s = new SchedualManager([settings, settings2]);
s.setNextTag = "tuesday";
s.goToSchedual("monday");
setInterval(() => {
  console.log(
    s.currentTimeSlot?.timeLeft(),
    s.currentTimeSlot?.name,
    s.currentTag
  );
}, 1000);
