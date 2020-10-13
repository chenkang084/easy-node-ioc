"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Service = void 0;
require("reflect-metadata");
const Constants_1 = require("./Constants");
const __1 = require("..");
const Bootstrap_1 = require("./Bootstrap");
exports.Service = (target) => {
    if (!__1.serviceSet.has(target)) {
        Bootstrap_1.recurInject(target);
        __1.serviceSet.add(target);
    }
};
function Controller(path) {
    return (target) => {
        if (path) {
            Reflect.defineMetadata(Constants_1.CONTROL, path, target);
            if (!__1.controlSet.has(target)) {
                Bootstrap_1.recurInject(target);
                __1.controlSet.add(target);
            }
        }
        else {
            throw new Error(`Controller can't omit the path field.`);
        }
    };
}
exports.Controller = Controller;
//# sourceMappingURL=ClassInject.js.map