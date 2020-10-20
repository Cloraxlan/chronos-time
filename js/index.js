"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ExternalSchedualLoader_1 = __importDefault(require("./ExternalSchedualLoader"));
let nextS = new events_1.EventEmitter();
let monday = {
    timeSlots: [
        { name: "Teacher PLC Meetings", begin: [7 + 0, 10], end: [8 + 0, 10] },
        {
            name: "Passing Period",
            begin: [8 + 0, 10],
            end: [8 + 0, 20],
            type: "passing",
        },
        { name: "0 Hour Intervention", begin: [8 + 0, 20], end: [9 + 0, 0] },
        { name: "Break", begin: [9 + 0, 0], end: [9 + 0, 30] },
        { name: "1st Period", begin: [9 + 0, 30], end: [10 + 0, 3] },
        {
            name: "Passing Period",
            begin: [10 + 0, 3],
            end: [10 + 0, 8],
            type: "passing",
        },
        { name: "2nd Period", begin: [10 + 0, 8], end: [10 + 0, 41] },
        {
            name: "Passing Period",
            begin: [10 + 0, 41],
            end: [10 + 0, 46],
            type: "passing",
        },
        { name: "3rd Period", begin: [10 + 0, 46], end: [11 + 0, 19] },
        {
            name: "Passing Period",
            begin: [11 + 0, 19],
            end: [11 + 0, 24],
            type: "passing",
        },
        { name: "4th Period", begin: [11 + 0, 24], end: [11 + 0, 57] },
        {
            name: "Passing Period",
            begin: [11 + 0, 57],
            end: [0 + 12, 2],
            type: "passing",
        },
        { name: "5th Period", begin: [0 + 12, 2], end: [0 + 12, 35] },
        {
            name: "Passing Period",
            begin: [0 + 12, 35],
            end: [0 + 12, 40],
            type: "passing",
        },
        { name: "6th Period", begin: [0 + 12, 40], end: [1 + 12, 13] },
        {
            name: "Passing Period",
            begin: [1 + 12, 13],
            end: [1 + 12, 18],
            type: "passing",
        },
        { name: "7th Period", begin: [1 + 12, 18], end: [1 + 12, 51] },
        {
            name: "Passing Period",
            begin: [1 + 12, 51],
            end: [1 + 12, 56],
            type: "passing",
        },
        { name: "8th Period", begin: [1 + 12, 56], end: [2 + 12, 26] },
    ],
    outOfBoundsName: "Out of school",
    tags: ["monday"],
    defaultNextSchedualTag: "tuesday",
};
let tuesday = {
    timeSlots: [
        { name: "1st Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
        {
            name: "Passing Period",
            begin: [9 + 0, 0],
            end: [9 + 0, 10],
            type: "passing",
        },
        { name: "2nd Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
        { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
        { name: "3rd Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
        {
            name: "Passing Period",
            begin: [12 + 0, 45],
            end: [12 + 0, 55],
            type: "passing",
        },
        { name: "4th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
    ],
    outOfBoundsName: "Out of school",
    tags: ["tuesday"],
    defaultNextSchedualTag: "wendsday",
};
let wendsday = {
    timeSlots: [
        { name: "5th Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
        {
            name: "Passing Period",
            begin: [9 + 0, 0],
            end: [9 + 0, 10],
            type: "passing",
        },
        { name: "6th Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
        { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
        { name: "7th Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
        {
            name: "Passing Period",
            begin: [12 + 0, 45],
            end: [12 + 0, 55],
            type: "passing",
        },
        { name: "8th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
    ],
    outOfBoundsName: "Out of school",
    tags: ["wendsday"],
    defaultNextSchedualTag: "thursday",
};
let thursday = {
    timeSlots: [
        { name: "1st Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
        {
            name: "Passing Period",
            begin: [9 + 0, 0],
            end: [9 + 0, 10],
            type: "passing",
        },
        { name: "2nd Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
        { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
        { name: "3rd Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
        {
            name: "Passing Period",
            begin: [12 + 0, 45],
            end: [12 + 0, 55],
            type: "passing",
        },
        { name: "4th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
    ],
    outOfBoundsName: "Out of school",
    tags: ["thursday"],
    defaultNextSchedualTag: "friday",
};
let friday = {
    timeSlots: [
        { name: "5th Period", begin: [7 + 0, 30], end: [9 + 0, 0] },
        {
            name: "Passing Period",
            begin: [9 + 0, 0],
            end: [9 + 0, 10],
            type: "passing",
        },
        { name: "6th Period", begin: [9 + 0, 10], end: [10 + 0, 40] },
        { name: "Lunch", begin: [10 + 0, 40], end: [11 + 0, 15] },
        { name: "7th Period", begin: [11 + 0, 15], end: [12 + 0, 45] },
        {
            name: "Passing Period",
            begin: [12 + 0, 45],
            end: [12 + 0, 55],
            type: "passing",
        },
        { name: "8th Period", begin: [12 + 0, 55], end: [2 + 12, 25] },
    ],
    outOfBoundsName: "Out of school",
    tags: ["friday"],
    defaultNextSchedualTag: "saturday",
};
let saturday = {
    timeSlots: [],
    outOfBoundsName: "",
    tags: ["saturday"],
    defaultNextSchedualTag: "sunday",
};
let sunday = {
    timeSlots: [],
    outOfBoundsName: "",
    tags: ["sunday"],
    defaultNextSchedualTag: "monday",
};
let s = new ExternalSchedualLoader_1.default("https://chronoshhs.herokuapp.com/hhs", "https://chronoshhs.herokuapp.com/HHSTodayIs");
setInterval(() => {
    console.log(s.currentTimeLeft, s.currentName, s.nextName, s.currentTag);
}, 1000);
