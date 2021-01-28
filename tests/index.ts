import { ExternalSchedualLoader } from "../ExternalSchedualLoader";
import { Schedual } from "../Schedual";

let s = new ExternalSchedualLoader("https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs");
setInterval(() => {
  console.log(s.currentTimeLeft);
}, 1000);
