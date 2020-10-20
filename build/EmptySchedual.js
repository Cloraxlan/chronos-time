"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Schedual_1 = __importDefault(require("./Schedual"));
var emptySettings = {
    timeSlots: [{ name: "", begin: [0 + 0, 0], end: [12 + 12, 0] }],
    outOfBoundsName: "",
    tags: [],
    defaultNextSchedualTag: "",
};
var generateEmptySetting = function (tags, defaultNextSchedualTag) {
    var newEmpty = emptySettings;
    newEmpty.defaultNextSchedualTag = defaultNextSchedualTag;
    newEmpty.tags = tags;
    return newEmpty;
};
var EmptySchedual = /** @class */ (function (_super) {
    __extends(EmptySchedual, _super);
    function EmptySchedual(tags, defaultNextSchedualTag, schedualEndEvent) {
        return _super.call(this, generateEmptySetting(tags, defaultNextSchedualTag), schedualEndEvent) || this;
    }
    Object.defineProperty(EmptySchedual.prototype, "currentName", {
        get: function () {
            return "N/A";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptySchedual.prototype, "currentTimeLeft", {
        get: function () {
            return "No schedule for today";
        },
        enumerable: false,
        configurable: true
    });
    return EmptySchedual;
}(Schedual_1.default));
exports.default = EmptySchedual;
