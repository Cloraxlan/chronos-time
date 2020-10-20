"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SchedualManager_1 = __importDefault(require("./SchedualManager"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var ExternalSchedualLoader = /** @class */ (function () {
    function ExternalSchedualLoader(getSchedualURL, pingSchedualURL) {
        var _this = this;
        this._manager = null;
        this._getSchedualURL = getSchedualURL;
        this._pingSchedualURL = pingSchedualURL;
        node_fetch_1.default(this._getSchedualURL).then(function (res) {
            res.json().then(function (data) {
                console.log(data);
                _this._manager = new SchedualManager_1.default(data.scheduals, function () {
                    _this.getTodayTommorow().then(function (todayTommorow) {
                        if (_this._manager) {
                            _this._manager.goToSchedual(todayTommorow[0]);
                            _this._manager.setNextTag = todayTommorow[1];
                        }
                    });
                });
                _this.getTodayTommorow().then(function (todayTommorow) {
                    if (_this._manager) {
                        _this._manager.goToSchedual(todayTommorow[0]);
                        _this._manager.setNextTag = todayTommorow[1];
                    }
                });
            });
        });
    }
    ExternalSchedualLoader.prototype.getTodayTommorow = function () {
        return node_fetch_1.default(this._pingSchedualURL).then(function (res) {
            return res.json().then(function (data) {
                return [data.today, data.tommorow];
            });
        });
    };
    Object.defineProperty(ExternalSchedualLoader.prototype, "currentTimeLeft", {
        get: function () {
            if (this._manager) {
                return this._manager.currentTimeLeft;
            }
            return "N/A";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExternalSchedualLoader.prototype, "currentName", {
        get: function () {
            if (this._manager) {
                return this._manager.currentName;
            }
            return "N/A";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExternalSchedualLoader.prototype, "nextName", {
        get: function () {
            if (this._manager) {
                return this._manager.nextName;
            }
            return "N/A";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExternalSchedualLoader.prototype, "currentTag", {
        get: function () {
            if (this._manager) {
                return this._manager.currentTag;
            }
            return "N/A";
        },
        enumerable: false,
        configurable: true
    });
    return ExternalSchedualLoader;
}());
exports.default = ExternalSchedualLoader;
