"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Constants_1 = require("./Constants");
const __1 = require("..");
function Injectable(path) {
    return (target) => {
        const targetName = target.name;
        if (path) {
            Reflect.defineMetadata(Constants_1.CONTROL, path, target);
            __1.controlSet.add(target);
        }
    };
}
function Component() {
    return Injectable();
}
exports.Component = Component;
function Service() {
    return Injectable();
}
exports.Service = Service;
function Controller(path) {
    return Injectable(path);
}
exports.Controller = Controller;
//# sourceMappingURL=ClassInject.js.map