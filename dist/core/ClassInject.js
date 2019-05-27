"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Bootstrap_1 = require("./Bootstrap");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
function Injectable() {
    return (target) => {
        const targetName = target.name;
        if (!Bootstrap_1.classMap.has(targetName)) {
            logger_1.default.info(`=====inject ${targetName}=====`);
            Bootstrap_1.classMap.set(targetName, target);
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
    return Injectable();
}
exports.Controller = Controller;
//# sourceMappingURL=ClassInject.js.map