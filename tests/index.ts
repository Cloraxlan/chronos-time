import { ExternalSchedualLoader } from "../ExternalSchedualLoader";

let s = new ExternalSchedualLoader(
  "https://chronoshhs.herokuapp.com/hhs",
  "https://chronoshhs.herokuapp.com/HHSTodayIs"
);
setInterval(() => {
  console.log(s.currentName, s.getMetadata(), s.getTimeSlotMetaData());
}, 1000);
