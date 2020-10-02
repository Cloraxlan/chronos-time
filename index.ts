import TimeSlot from "./TimeSlot";
import Schedual, { SchedualSettings } from "./Schedual";
import { DateTime } from "luxon";
import { EventEmitter } from "events";
import SchedualManager from "./SchedualManager";
let nextS = new EventEmitter();
let monday: SchedualSettings = {
  timeSlots: [
    { name: "Teacher PLC Meetings", begin: [7 + 0, 10], end: [8 + 0, 10] },
    { name: "Passing Period", begin: [8 + 0, 10], end: [8 + 0, 20] },
    { name: "0 Hour Intervention", begin: [8 + 0, 20], end: [9 + 0, 0] },
    { name: "Break", begin: [9 + 0, 0], end: [9 + 0, 30] },
    { name: "1st Period", begin: [9 + 0, 30], end: [10 + 0, 3] },
    { name: "Passing Period", begin: [10 + 0, 3], end: [10 + 0, 8] },
    { name: "2nd Period", begin: [10 + 0, 8], end: [10 + 0, 41] },
    { name: "Passing Period", begin: [10 + 0, 41], end: [10 + 0, 46] },
    { name: "3rd Period", begin: [10 + 0, 46], end: [11 + 0, 19] },
    { name: "Passing Period", begin: [11 + 0, 19], end: [11 + 0, 24] },
    { name: "4th Period", begin: [11 + 0, 24], end: [11 + 0, 57] },
    { name: "Passing Period", begin: [11 + 0, 57], end: [0 + 12, 2] },
    { name: "5th Period", begin: [0 + 12, 2], end: [0 + 12, 35] },
    { name: "Passing Period", begin: [0 + 12, 35], end: [0 + 12, 40] },
    { name: "6th Period", begin: [0 + 12, 40], end: [1 + 12, 13] },
    { name: "Passing Period", begin: [1 + 12, 13], end: [1 + 12, 18] },
    { name: "7th Period", begin: [1 + 12, 18], end: [1 + 12, 51] },
    { name: "Passing Period", begin: [1 + 12, 51], end: [1 + 12, 56] },
    { name: "8th Period", begin: [1 + 12, 56], end: [2 + 12, 26] },
  ],
  outOfBoundsName: "Out of school",
  tags: ["monday"],
  defaultNextSchedualTag: "tuesday",
};
let tuesday: SchedualSettings = {
  timeSlots: [
    { name: "1st Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
    { name: "Passing Period", begin: [9 + 0, 0], end: [9 + 0, 10] },
    { name: "2nd Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
    { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
    { name: "3rd Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
    { name: "Passing Period", begin: [12 + 0, 45], end: [12 + 0, 55] },
    { name: "4th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
  ],
  outOfBoundsName: "Out of school",
  tags: ["tuesday"],
  defaultNextSchedualTag: "wendsday",
};
let wendsday: SchedualSettings = {
  timeSlots: [
    { name: "5th Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
    { name: "Passing Period", begin: [9 + 0, 0], end: [9 + 0, 10] },
    { name: "6th Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
    { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
    { name: "7th Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
    { name: "Passing Period", begin: [12 + 0, 45], end: [12 + 0, 55] },
    { name: "8th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
  ],
  outOfBoundsName: "Out of school",
  tags: ["wendsday"],
  defaultNextSchedualTag: "thursday",
};
let thursday: SchedualSettings = {
  timeSlots: [
    { name: "1st Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
    { name: "Passing Period", begin: [9 + 0, 0], end: [9 + 0, 10] },
    { name: "2nd Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
    { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
    { name: "3rd Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
    { name: "Passing Period", begin: [12 + 0, 45], end: [12 + 0, 55] },
    { name: "4th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
  ],
  outOfBoundsName: "Out of school",
  tags: ["thursday"],
  defaultNextSchedualTag: "friday",
};
let friday: SchedualSettings = {
  timeSlots: [
    { name: "5th Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
    { name: "Passing Period", begin: [9 + 0, 0], end: [9 + 0, 10] },
    { name: "6th Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
    { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
    { name: "7th Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
    { name: "Passing Period", begin: [12 + 0, 45], end: [12 + 0, 55] },
    { name: "8th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
  ],
  outOfBoundsName: "Out of school",
  tags: ["friday"],
  defaultNextSchedualTag: "saturday",
};
let saturday: SchedualSettings = {
  timeSlots: [{ name: "Weekend", begin: [0 + 0, 0], end: [12 + 12, 0] }],
  outOfBoundsName: "Out of school",
  tags: ["saturday"],
  defaultNextSchedualTag: "sunday",
};
let sunday: SchedualSettings = {
  timeSlots: [{ name: "Weekend", begin: [0 + 0, 0], end: [12 + 12, 0] }],
  outOfBoundsName: "Out of school",
  tags: ["sunday"],
  defaultNextSchedualTag: "monday",
};
let s = new SchedualManager([
  monday,
  tuesday,
  wendsday,
  thursday,
  friday,
  saturday,
  sunday,
]);
s.setNextTag = "sunday";
s.goToNextSchedual();
setInterval(() => {
  console.log(
    s.currentTimeSlot?.timeLeft(),
    s.currentTimeSlot?.name,
    s.currentTag
  );
}, 1000);
