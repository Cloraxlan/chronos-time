"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedual_1 = __importDefault(require("./Schedual"));
const emptySettings = {
    timeSlots: [{ name: "", begin: [0 + 0, 0], end: [12 + 12, 0] }],
    outOfBoundsName: "",
    tags: [],
    defaultNextSchedualTag: "",
};
let generateEmptySetting = (tags, defaultNextSchedualTag) => {
    let newEmpty = emptySettings;
    newEmpty.defaultNextSchedualTag = defaultNextSchedualTag;
    newEmpty.tags = tags;
    return newEmpty;
};
class EmptySchedual extends Schedual_1.default {
    constructor(tags, defaultNextSchedualTag, schedualEndEvent) {
        super(generateEmptySetting(tags, defaultNextSchedualTag), schedualEndEvent);
    }
    get currentName() {
        return "N/A";
    }
    get currentTimeLeft() {
        return "No schedule for today";
    }
}
exports.default = EmptySchedual;
