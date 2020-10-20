import { SchedualManager } from "./SchedualManager";

export * from "./EmptySchedual";
export * from "./ExternalSchedualLoader";
export * from "./PassingTimeSlot";
export * from "./Schedual";
export * from "./SchedualManager";
export * from "./TimeSlot";
let s = new SchedualManager(
  [
    {
      tags: ["a"],
      defaultNextSchedualTag: "a",
      outOfBoundsName: "a",
      timeSlots: [{ begin: [12 + 5, 0], end: [12 + 6, 0], name: "test" }],
    },
  ],
  () => {}
);
s.goToSchedual("a");
setInterval(() => {
  console.log(s.currentName, s.currentTimeLeft, s.nextName);
}, 1000);
