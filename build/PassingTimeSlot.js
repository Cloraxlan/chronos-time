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
var TimeSlot_1 = __importDefault(require("./TimeSlot"));
var PassingTimeSlot = /** @class */ (function (_super) {
    __extends(PassingTimeSlot, _super);
    function PassingTimeSlot(timeSlot, timeSlotAfter, after) {
        var _this = _super.call(this, timeSlot, after) || this;
        _this._timeSlot = timeSlot;
        _this._timeSlotAfter = timeSlotAfter;
        _this.name = _this.getNameOfTimeSlotAfter();
        _this._active = false;
        return _this;
    }
    PassingTimeSlot.prototype.startTimeSlot = function (shift) {
        if (shift === void 0) { shift = 0; }
        _super.prototype.startTimeSlot.call(this, shift);
        this.name = this._timeSlot.name;
    };
    PassingTimeSlot.prototype.getNameOfTimeSlotAfter = function () {
        if (this._timeSlotAfter) {
            return this._timeSlotAfter.name;
        }
        return "N/A";
    };
    PassingTimeSlot.prototype.activateTimer = function (length) {
        var _this = this;
        setTimeout(function () {
            _this.after.emit("end");
            _this.name = _this.getNameOfTimeSlotAfter();
        }, length);
    };
    return PassingTimeSlot;
}(TimeSlot_1.default));
exports.default = PassingTimeSlot;
