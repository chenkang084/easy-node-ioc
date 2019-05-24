"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Injectable_1 = tslib_1.__importDefault(require("./Injectable"));
const Types_1 = require("./Types");
function Controller(path) {
    return Injectable_1.default(Types_1.DecoratorType.Controller);
}
exports.Controller = Controller;
function Get() { }
exports.Get = Get;
//# sourceMappingURL=Controller.js.map