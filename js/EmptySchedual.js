"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptySchedual = void 0;
const Schedual_1 = require("./Schedual");
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
class EmptySchedual extends Schedual_1.Schedual {
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
exports.EmptySchedual = EmptySchedual;
