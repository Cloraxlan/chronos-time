"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalSchedualLoader_1 = require("../ExternalSchedualLoader");
let s = new ExternalSchedualLoader_1.ExternalSchedualLoader("https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs");
setInterval(() => {
    console.log(s.currentName, s.getSchedualStatus());
}, 1000);
